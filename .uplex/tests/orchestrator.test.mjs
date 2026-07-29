import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, rm } from 'node:fs/promises';
import { buildPlan, createHandoff, detectIntent, loadCapabilities, validateCapabilityRegistry } from '../orchestrator/index.mjs';
import { initProject, projectDir, readJson, ROOT } from '../runtime/core.mjs';
import { planExecution } from '../orchestrator/index.mjs';
import { claimStage, loadExecution, recordStageResult, startExecution } from '../orchestrator/workflow.mjs';
import { resolve } from 'node:path';

test('pedido frontend com Supabase seleciona arquitetura, implementação, qualidade e segurança',async()=>{
  const plan=buildPlan('Crie uma página frontend com backend no Supabase',await loadCapabilities());
  const ids=plan.stages.map(x=>x.id);
  for(const id of ['architecture.plan','database.model','backend.supabase','frontend.implement','quality.verify','security.review','runtime.start'])assert.ok(ids.includes(id),id);
  assert.equal(plan.intent.type,'build_fullstack');
});

test('landing page não seleciona backend ou segurança completa',async()=>{
  const plan=buildPlan('Crie uma landing page para uma clínica',await loadCapabilities());
  const ids=plan.stages.map(x=>x.id);assert.ok(ids.includes('frontend.implement'));assert.ok(!ids.includes('backend.supabase'));assert.ok(!ids.includes('security.review'));
});

test('registry canônico não possui agentes ausentes ou ciclos',async()=>{
  const registry=await loadCapabilities(),agents=await readJson(resolve(ROOT,'.uplex/agents/registry.json'));
  assert.deepEqual(validateCapabilityRegistry(registry,agents),[]);
});

test('handoff preserva artefatos, decisões e riscos',()=>{
  const handoff=createHandoff({executionId:'run-1',projectId:'demo',from:'architecture.plan',to:'frontend.implement',artifacts:[{path:'docs/architecture.md'}],decisions:['usar Supabase'],risks:['RLS']});
  assert.equal(handoff.status,'ready');assert.equal(handoff.artifacts.length,1);assert.deepEqual(handoff.risks,['RLS']);
});

test('planejamento natural cria execução persistida e evento auditável',async()=>{
  const projectId=`plan-test-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar orquestração'});
    const {execution,plan}=await planExecution(projectId,'Crie uma página frontend com backend no Supabase');
    const persisted=await readJson(resolve(projectDir(projectId),'contexto/executions',`${execution.execution_id}.json`));
    assert.equal(persisted.request,execution.request);assert.equal(plan.intent.type,'build_fullstack');
    const timeline=await readFile(resolve(projectDir(projectId),'contexto/timeline.jsonl'),'utf8');
    assert.match(timeline,/execution_created/);assert.match(timeline,new RegExp(execution.execution_id));
  } finally {
    await rm(projectDir(projectId),{recursive:true,force:true});
  }
});

test('workflow libera etapas por dependência, materializa handoffs e conclui',async()=>{
  const projectId=`workflow-test-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar workflow'});
    const {execution}=await planExecution(projectId,'Crie uma landing page para uma clínica');
    let running=await startExecution(projectId,execution.execution_id);
    assert.deepEqual(running.plan.stages.filter(x=>x.status==='ready').map(x=>x.id),['architecture.plan']);

    const evidencePath=resolve(projectDir(projectId),'docs/evidence.md');
    await import('node:fs/promises').then(x=>x.writeFile(evidencePath,'evidência'));
    await claimStage(projectId,execution.execution_id,'architecture.plan');
    running=await recordStageResult(projectId,execution.execution_id,'architecture.plan',{status:'completed',summary:'Arquitetura pronta',evidence:['docs/evidence.md'],decisions:['estrutura aprovada']});
    assert.deepEqual(running.plan.stages.filter(x=>x.status==='ready').map(x=>x.id),['design.system']);

    await claimStage(projectId,execution.execution_id,'design.system');
    running=await recordStageResult(projectId,execution.execution_id,'design.system',{status:'completed',summary:'Design pronto',evidence:['docs/evidence.md']});
    assert.deepEqual(running.plan.stages.filter(x=>x.status==='ready').map(x=>x.id),['frontend.implement']);

    for(const id of ['frontend.implement','quality.verify']){
      await claimStage(projectId,execution.execution_id,id);
      running=await recordStageResult(projectId,execution.execution_id,id,{status:'completed',summary:`${id} concluída`,evidence:['docs/evidence.md']});
    }
    assert.equal(running.status,'completed');
    const handoff=await readJson(resolve(projectDir(projectId),'contexto/executions',execution.execution_id,'handoffs','architecture.plan--design.system.json'));
    assert.deepEqual(handoff.decisions,['estrutura aprovada']);
  } finally { await rm(projectDir(projectId),{recursive:true,force:true}); }
});

test('falha bloqueia dependentes sem marcar trabalho como concluído',async()=>{
  const projectId=`blocked-test-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar bloqueio'});
    const {execution}=await planExecution(projectId,'Crie uma landing page');
    await startExecution(projectId,execution.execution_id);
    await claimStage(projectId,execution.execution_id,'architecture.plan');
    const result=await recordStageResult(projectId,execution.execution_id,'architecture.plan',{status:'failed',summary:'Arquitetura inválida'});
    assert.equal(result.plan.stages.find(x=>x.id==='design.system').status,'blocked');
    assert.notEqual(result.status,'completed');
  } finally { await rm(projectDir(projectId),{recursive:true,force:true}); }
});

test('workflow fullstack libera design e banco em paralelo e retoma estado persistido',async()=>{
  const projectId=`parallel-test-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar paralelismo'});
    const {execution}=await planExecution(projectId,'Crie uma página frontend com backend no Supabase');
    await startExecution(projectId,execution.execution_id);
    await import('node:fs/promises').then(x=>x.writeFile(resolve(projectDir(projectId),'docs/evidence.md'),'evidência'));
    await claimStage(projectId,execution.execution_id,'architecture.plan');
    await recordStageResult(projectId,execution.execution_id,'architecture.plan',{status:'completed',summary:'Arquitetura pronta',evidence:['docs/evidence.md']});
    const resumed=await loadExecution(projectId,execution.execution_id);
    assert.deepEqual(resumed.plan.stages.filter(x=>x.status==='ready').map(x=>x.id),['design.system','database.model']);
    const designOrder=await claimStage(projectId,execution.execution_id,'design.system');
    const databaseOrder=await claimStage(projectId,execution.execution_id,'database.model');
    assert.equal(designOrder.capability_id,'design.system');assert.equal(databaseOrder.capability_id,'database.model');
    const persisted=await loadExecution(projectId,execution.execution_id);
    assert.deepEqual(persisted.plan.stages.filter(x=>x.status==='running').map(x=>x.id),['design.system','database.model']);
  } finally { await rm(projectDir(projectId),{recursive:true,force:true}); }
});
