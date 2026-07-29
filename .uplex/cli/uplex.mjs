#!/usr/bin/env node
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { ROOT, PROJECTS, advance, exists, initProject, loadProject, migrateProject, readJson, validateState, validateTasks, workflow } from '../runtime/core.mjs';
import { decideApproval, requestApproval } from '../runtime/governance.mjs';
import { loadCapabilities, planExecution, validateCapabilityRegistry } from '../orchestrator/index.mjs';
import { claimStage, continueExecution, dispatchStage, executionSummary, loadExecution, recordStageResult, startExecution } from '../orchestrator/workflow.mjs';
import { detectHarnesses, loadAdapterRegistry, validateAdapter } from '../adapters/index.mjs';
import { runtimeLogs, runtimeStatus, startStaticRuntime, stopRuntime } from '../runtime-manager/index.mjs';

const color = !process.env.NO_COLOR;
const c = (code, text) => color ? `\x1b[${code}m${text}\x1b[0m` : text;
const ok = (text) => console.log(c('32', `✓ ${text}`));
const fail = (text) => console.error(c('31', `✗ ${text}`));
const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i >= 0 ? process.argv[i + 1] : fallback; };

async function projectIds() {
  if (!await exists(PROJECTS)) return [];
  return (await readdir(PROJECTS, { withFileTypes: true })).filter((e) => e.isDirectory() && e.name !== '_template').map((e) => e.name);
}

async function status(id) {
  const { state, tasks } = await loadProject(id);
  const flow = await workflow();
  console.log(c('1;36', `\nUPLEXOS · ${id}`));
  console.log(`Fase: ${flow.phases[state.phase]?.label ?? state.phase}`);
  console.log(`Responsável: ${state.active_skill ?? 'nenhum'}`);
  console.log(`Status: ${state.status} · Tier: ${state.tier}`);
  console.log(`Gates: QA=${state.quality_gate} · Security=${state.security_gate}`);
  console.log(`Tasks: ${tasks.tasks.filter((t) => t.status === 'validated').length}/${tasks.tasks.length} validadas\n`);
}

async function friendlyStatus(id){
  const {state,tasks,dir}=await loadProject(id);let active=null;
  try{const entries=await readdir(resolve(dir,'contexto/executions'));const files=entries.filter(x=>x.endsWith('.json')).sort();if(files.length)active=await readJson(resolve(dir,'contexto/executions',files.at(-1)))}catch{}
  const labels={'architecture.plan':'Arquitetura','design.system':'Design','database.model':'Modelo de dados','backend.supabase':'Backend Supabase','auth.implement':'Autenticação','frontend.implement':'Frontend','quality.verify':'Qualidade','security.review':'Segurança','runtime.start':'Execução local'};
  const output={projeto:id,status:state.status,tier:state.tier,tarefas_validadas:tasks.tasks.filter(x=>x.status==='validated').length,total_tarefas:tasks.tasks.length,qualidade:state.quality_gate,seguranca:state.security_gate};
  if(active)output.execucao={id:active.execution_id,pedido:active.request,status:active.status,prontas:active.plan.stages.filter(x=>x.status==='ready').map(x=>labels[x.id]??x.id),em_andamento:active.plan.stages.filter(x=>x.status==='running').map(x=>labels[x.id]??x.id),concluidas:active.plan.stages.filter(x=>x.status==='completed').map(x=>labels[x.id]??x.id),bloqueadas:active.plan.stages.filter(x=>x.status==='blocked').map(x=>({etapa:labels[x.id]??x.id,motivo:x.blocked_reason??x.summary}))};
  console.log(JSON.stringify(output,null,2));
}

async function validate(id) {
  const flow = await workflow();
  const ids = id ? [id] : await projectIds();
  const errors = [];
  for (const projectId of ids) {
    try {
      const project = await loadProject(projectId);
      errors.push(...validateState(project.state, flow).map((e) => `${projectId}: ${e}`));
      errors.push(...validateTasks(project.tasks).map((e) => `${projectId}: ${e}`));
    } catch (error) { errors.push(`${projectId}: ${error.message}`); }
  }
  if (!id && await exists(resolve(ROOT, 'contexto/estado.json'))) {
    const rootState = await readJson(resolve(ROOT, 'contexto/estado.json'));
    const rootTasks = await readJson(resolve(ROOT, 'contexto/tasks.json'));
    errors.push(...validateState(rootState, flow).map((e) => `uplexos-core: ${e}`));
    errors.push(...validateTasks(rootTasks).map((e) => `uplexos-core: ${e}`));
  }
  const registry = await readJson(resolve(ROOT, '.claude/skills/registry.json'));
  for (const skill of registry.skills) if (!await exists(resolve(ROOT, skill.path))) errors.push(`registry: caminho ausente: ${skill.path}`);
  const capabilityRegistry = await loadCapabilities();
  const agentRegistry = await readJson(resolve(ROOT, '.uplex/agents/registry.json'));
  errors.push(...validateCapabilityRegistry(capabilityRegistry, agentRegistry).map((e) => `capabilities: ${e}`));
  const adapterRegistry = await loadAdapterRegistry();
  for (const adapter of adapterRegistry.adapters) errors.push(...validateAdapter(adapter).map((e) => `adapter ${adapter.id}: ${e}`));
  if (errors.length) { errors.forEach(fail); throw new Error(`${errors.length} erro(s) de validação`); }
  ok(`${ids.length} instância(s), contexto do core, ${registry.skills.length} skills e ${capabilityRegistry.capabilities.length} capacidades validados`);
}

async function doctor() {
  console.log(c('1;36', '\nUPLEXOS DOCTOR'));
  const checks = [
    ['Node >= 20', Number(process.versions.node.split('.')[0]) >= 20, process.version],
    ['Registry de skills', await exists(resolve(ROOT, '.claude/skills/registry.json')), '.claude/skills/registry.json'],
    ['Workflow', await exists(resolve(ROOT, '.uplex/runtime/workflow.json')), '.uplex/runtime/workflow.json'],
    ['Schemas', await exists(resolve(ROOT, '.claude/schemas/project-state.schema.json')), '.claude/schemas'],
    ['Registry de capacidades', await exists(resolve(ROOT, '.uplex/capabilities/registry.json')), '.uplex/capabilities/registry.json'],
    ['Registry de adaptadores', await exists(resolve(ROOT, '.uplex/adapters/registry.json')), '.uplex/adapters/registry.json'],
    ['Git', await exists(resolve(ROOT, '.git')), 'opcional neste diretório']
  ];
  checks.forEach(([name, passed, detail], index) => {
    if (name === 'Git' && !passed) console.log(c('33', `! ${name} (${detail})`));
    else (passed ? ok : fail)(`${name} (${detail})`);
  });
  if (checks.filter(([name]) => name !== 'Git').some(([, passed]) => !passed)) throw new Error('Ambiente incompleto');
  console.log();
}

function help() {
  console.log(`${c('1;36', 'UplexOS v4.1')} — Autonomous Workflow Engine\n
  uplex init <id> [--tier mvp|startup|enterprise] [--client Nome] [--goal Objetivo]
  uplex status <id>
  uplex next <id>
  uplex plan <id> --request "necessidade em linguagem natural"
  uplex request <id> --request "necessidade em linguagem natural" [--max-parallel 2]
  uplex execute <id> --execution-id <id>
  uplex continue <id> --execution-id <id> [--adapter id] [--max-parallel 2] [--max-rounds 20]
  uplex execution-status <id> --execution-id <id>
  uplex stage-claim <id> --execution-id <id> --stage <capacidade>
  uplex stage-dispatch <id> --execution-id <id> --stage <capacidade> [--adapter id]
  uplex stage-complete <id> --execution-id <id> --stage <capacidade> --evidence <arquivo> [--summary texto]
  uplex stage-fail <id> --execution-id <id> --stage <capacidade> --summary texto
  uplex run <id> --evidence <arquivo> [--result passed|not_applicable] [--justification texto] [--approval-id id]
  uplex approval-request <id> --action ação --risk resumo
  uplex approval-decide <approval-id> --decision approved|rejected
  uplex migrate <id>
  uplex adapters
  uplex start <id> [--port 3000]
  uplex runtime-status <id>
  uplex stop <id>
  uplex runtime-logs <id> [--limit 100]
  uplex validate [id]
  uplex doctor
  uplex dashboard`);
}

async function main() {
  const [, , command = 'help', id] = process.argv;
  if (command === 'init') { if (!id) throw new Error('Informe o ID do projeto.'); await initProject({ projectId: id, tier: arg('tier', 'mvp'), client: arg('client', 'Cliente'), goal: arg('goal', 'Definir objetivo') }); ok(`Projeto ${id} criado`); await status(id); }
  else if (command === 'status') await status(id);
  else if (command === 'next') { const { state } = await loadProject(id); const flow = await workflow(); const phase = flow.phases[state.phase]; console.log(`${phase.label} → execute ${c('33', phase.skill ? `/${phase.skill}` : 'nenhuma ação')}`); }
  else if (command === 'plan') { const request=arg('request'); if(!request) throw new Error('Use --request "necessidade".'); const {execution,plan}=await planExecution(id,request); console.log(JSON.stringify({execution_id:execution.execution_id,intent:plan.intent,stages:plan.stages},null,2)); }
  else if(command==='request'){const request=arg('request');if(!request)throw new Error('Use --request "necessidade".');const {execution,plan}=await planExecution(id,request);const result=await continueExecution(id,execution.execution_id,{adapterId:arg('adapter'),maxParallel:arg('max-parallel',2),maxRounds:arg('max-rounds',20)});console.log(JSON.stringify({mensagem:result.status==='completed'?'Solicitação concluída.':'Solicitação interrompida antes da conclusão.',intencao:plan.intent.type,execucao:result},null,2));}
  else if (command === 'execute') { const executionId=arg('execution-id'); if(!executionId)throw new Error('Use --execution-id.'); console.log(JSON.stringify(executionSummary(await startExecution(id,executionId)),null,2)); }
  else if (command === 'continue') { const executionId=arg('execution-id'); if(!executionId)throw new Error('Use --execution-id.'); console.log(JSON.stringify(await continueExecution(id,executionId,{adapterId:arg('adapter'),maxParallel:arg('max-parallel',2),maxRounds:arg('max-rounds',20)}),null,2)); }
  else if (command === 'execution-status') { const executionId=arg('execution-id'); if(!executionId)throw new Error('Use --execution-id.'); console.log(JSON.stringify(executionSummary(await loadExecution(id,executionId)),null,2)); }
  else if (command === 'stage-claim') { const executionId=arg('execution-id'),stageId=arg('stage'); if(!executionId||!stageId)throw new Error('Use --execution-id e --stage.'); console.log(JSON.stringify(await claimStage(id,executionId,stageId),null,2)); }
  else if (command === 'stage-dispatch') { const executionId=arg('execution-id'),stageId=arg('stage'); if(!executionId||!stageId)throw new Error('Use --execution-id e --stage.'); console.log(JSON.stringify(await dispatchStage(id,executionId,stageId,arg('adapter')),null,2)); }
  else if (command === 'stage-complete') { const executionId=arg('execution-id'),stageId=arg('stage'),evidence=arg('evidence'); if(!executionId||!stageId||!evidence)throw new Error('Use --execution-id, --stage e --evidence.'); const result=await recordStageResult(id,executionId,stageId,{status:'completed',summary:arg('summary','Etapa concluída'),evidence:evidence.split(','),decisions:[],risks:[],limitations:[]}); console.log(JSON.stringify(executionSummary(result),null,2)); }
  else if (command === 'stage-fail') { const executionId=arg('execution-id'),stageId=arg('stage'); if(!executionId||!stageId)throw new Error('Use --execution-id e --stage.'); const result=await recordStageResult(id,executionId,stageId,{status:'failed',summary:arg('summary','Etapa falhou'),evidence:[]}); console.log(JSON.stringify(executionSummary(result),null,2)); }
  else if (command === 'run') { const evidence = arg('evidence'); if (!evidence) throw new Error('Use --evidence <arquivo>.'); await advance(id, { evidence: evidence.split(','), result: arg('result', 'passed'), justification:arg('justification'), approvalId:arg('approval-id'), executionId:arg('execution-id') }); ok('Gate registrado e handoff concluído'); await status(id); }
  else if (command === 'approval-request') { const action=arg('action'),riskSummary=arg('risk'); if(!action||!riskSummary)throw new Error('Use --action e --risk.'); console.log(JSON.stringify(await requestApproval({projectId:id,action,riskSummary}),null,2)); }
  else if (command === 'approval-decide') { console.log(JSON.stringify(await decideApproval({approvalId:id,decision:arg('decision')}),null,2)); }
  else if (command === 'migrate') { const result=await migrateProject(id); ok(result.migrated?'Projeto migrado':'Projeto já está atualizado'); await status(id); }
  else if (command === 'adapters') { const registry=await loadAdapterRegistry(); console.log(JSON.stringify({configured:registry.adapters.map(x=>({id:x.id,enabled:x.enabled,type:x.type,reason:x.reason??null})),detected:await detectHarnesses(registry)},null,2)); }
  else if(command==='project-status')await friendlyStatus(id);
  else if(command==='start')console.log(JSON.stringify(await startStaticRuntime(id,{port:arg('port')}),null,2));
  else if(command==='runtime-status')console.log(JSON.stringify(await runtimeStatus(id),null,2));
  else if(command==='stop')console.log(JSON.stringify(await stopRuntime(id),null,2));
  else if(command==='runtime-logs')console.log(await runtimeLogs(id,arg('limit',100)));
  else if (command === 'validate') await validate(id);
  else if (command === 'doctor') await doctor();
  else if (command === 'dashboard') await import('../dashboard/index.js');
  else help();
}

main().catch((error) => { fail(error.message); process.exitCode = 1; });
