import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, loadProject, projectDir, readJson, recordEvent, resolveEvidence, writeJson } from '../runtime/core.mjs';
import { createHandoff } from './index.mjs';
import { dispatchAdapter, resolveAdapter } from '../adapters/index.mjs';

const finalStageStatuses = new Set(['completed', 'failed', 'blocked', 'skipped']);
const executionPath = (projectId, executionId) => resolve(projectDir(projectId), 'contexto/executions', `${executionId}.json`);
const executionRoot = (projectId, executionId) => resolve(projectDir(projectId), 'contexto/executions', executionId);

export async function loadExecution(projectId, executionId) {
  return readJson(executionPath(projectId, executionId));
}

async function agentContract(agentId) {
  const registry = await readJson(resolve(ROOT, '.uplex/agents/registry.json'));
  return registry.agents.find((item) => item.id === agentId);
}

function dependenciesCompleted(stage, stages) {
  const byId = new Map(stages.map((item) => [item.id, item]));
  return stage.depends_on.every((id) => byId.get(id)?.status === 'completed');
}

function dependencyFailed(stage, stages) {
  const byId = new Map(stages.map((item) => [item.id, item]));
  return stage.depends_on.some((id) => ['failed', 'blocked'].includes(byId.get(id)?.status));
}

async function buildContextPack(project, execution, stage) {
  const projectDocument = await readFile(resolve(project.dir, 'projeto.md'), 'utf8').catch(() => null);
  const handoffDir = resolve(executionRoot(project.state.project_id, execution.execution_id), 'handoffs');
  const incoming = [];
  for (const dependency of stage.depends_on) {
    const path = resolve(handoffDir, `${dependency}--${stage.id}.json`);
    try { incoming.push(await readJson(path)); } catch {}
  }
  return {
    schema_version: '1.0', project_id: project.state.project_id, execution_id: execution.execution_id,
    capability_id: stage.id, request: execution.request, project_state: project.state,
    active_task: project.tasks.tasks.find((item) => item.id === project.state.active_task_id) ?? null,
    project_document: projectDocument, incoming_handoffs: incoming,
    generated_at: new Date().toISOString()
  };
}

async function materializeWorkOrder(project, execution, stage) {
  const contract = await agentContract(stage.agent);
  if (!contract) throw new Error(`Contrato de agente ausente: ${stage.agent}`);
  const root = executionRoot(project.state.project_id, execution.execution_id);
  const contextPack = await buildContextPack(project, execution, stage);
  const workOrder = {
    schema_version: '1.0', work_order_id: `work-${execution.execution_id}-${stage.id}`,
    project_id: project.state.project_id, execution_id: execution.execution_id,
    capability_id: stage.id, status: 'ready', objective: execution.request,
    expected_outputs: stage.outputs, read_scopes: contract.read_scopes,
    write_scopes: contract.write_scopes, approval_boundaries: stage.requires_approval,
    context_pack: `context-packs/${stage.id}.json`, created_at: new Date().toISOString()
  };
  await writeJson(resolve(root, 'context-packs', `${stage.id}.json`), contextPack);
  await writeJson(resolve(root, 'work-orders', `${stage.id}.json`), workOrder);
  return workOrder;
}

async function refreshStages(project, execution) {
  for (const stage of execution.plan.stages) {
    if (stage.status !== 'pending') continue;
    if (dependencyFailed(stage, execution.plan.stages)) {
      stage.status = 'blocked';
      stage.blocked_reason = 'Uma dependência falhou ou foi bloqueada.';
    } else if (dependenciesCompleted(stage, execution.plan.stages)) {
      stage.status = 'ready';
      await materializeWorkOrder(project, execution, stage);
    }
  }
}

export async function startExecution(projectId, executionId) {
  const project = await loadProject(projectId);
  const execution = await loadExecution(projectId, executionId);
  if (execution.status !== 'planned') throw new Error('Somente execuções planejadas podem ser iniciadas.');
  execution.status = 'running'; execution.started_at = new Date().toISOString(); execution.updated_at = execution.started_at;
  await refreshStages(project, execution);
  await writeJson(executionPath(projectId, executionId), execution);
  await recordEvent(projectId, 'execution_started', 'uplex-orchestrator', 'passed', { execution_id: executionId });
  return execution;
}

export async function claimStage(projectId, executionId, stageId) {
  const execution = await loadExecution(projectId, executionId);
  const stage = execution.plan.stages.find((item) => item.id === stageId);
  if (!stage || stage.status !== 'ready') throw new Error('Etapa não está disponível para execução.');
  stage.status = 'running'; stage.started_at = new Date().toISOString(); execution.current_stage = stageId; execution.updated_at = stage.started_at;
  await writeJson(executionPath(projectId, executionId), execution);
  await recordEvent(projectId, 'stage_started', stageId, 'passed', { execution_id: executionId });
  return readJson(resolve(executionRoot(projectId, executionId), 'work-orders', `${stageId}.json`));
}

export async function dispatchStage(projectId, executionId, stageId, adapterId = null, adapterOverride = null) {
  const execution = await loadExecution(projectId, executionId);
  const stage = execution.plan.stages.find((item) => item.id === stageId);
  if (!stage || stage.status !== 'ready') throw new Error('Etapa não está disponível para dispatch.');
  const adapter = adapterOverride ?? await resolveAdapter(adapterId);
  if (!adapter.enabled) return { status: 'not_configured', adapter_id: adapter.id, reason: adapter.reason ?? 'Adaptador desabilitado.' };

  const workOrder = await claimStage(projectId, executionId, stageId);
  const root = executionRoot(projectId, executionId);
  const contextPack = await readJson(resolve(root, workOrder.context_pack));
  const dispatch = await dispatchAdapter(adapter, {
    protocol_version: '1.0', kind: 'uplex.work_order', work_order: workOrder, context_pack: contextPack,
    response_contract: {
      status: ['completed', 'failed', 'blocked'], summary: 'string', evidence: ['project-relative-path'],
      decisions: ['string'], risks: ['string'], limitations: ['string']
    }
  }, { cwd: projectDir(projectId) });

  if (dispatch.status !== 'completed') {
    const updated = await recordStageResult(projectId, executionId, stageId, {
      status: dispatch.status === 'not_configured' ? 'blocked' : 'failed',
      summary: dispatch.reason ?? dispatch.error ?? dispatch.stderr ?? `Falha no adaptador: ${dispatch.status}`,
      limitations: [`adapter:${adapter.id}`, `dispatch:${dispatch.status}`]
    });
    return { ...dispatch, execution: executionSummary(updated) };
  }

  const response = dispatch.response;
  if (!response || !['completed', 'failed', 'blocked'].includes(response.status) || typeof response.summary !== 'string') {
    const updated = await recordStageResult(projectId, executionId, stageId, {
      status: 'failed', summary: 'Resposta do adaptador viola o contrato de resultado.',
      limitations: [`adapter:${adapter.id}`, 'invalid_response_contract']
    });
    return { status: 'invalid_output', adapter_id: adapter.id, execution: executionSummary(updated) };
  }
  const updated = await recordStageResult(projectId, executionId, stageId, {
    status: response.status, summary: response.summary, evidence: response.evidence ?? [],
    decisions: response.decisions ?? [], risks: response.risks ?? [], limitations: response.limitations ?? []
  });
  return { status: 'completed', adapter_id: adapter.id, stage_result: response, execution: executionSummary(updated), duration_ms: dispatch.duration_ms };
}

async function dispatchClaimedStage(projectId, executionId, stageId, adapter) {
  const root = executionRoot(projectId, executionId);
  const workOrder = await readJson(resolve(root, 'work-orders', `${stageId}.json`));
  const contextPack = await readJson(resolve(root, workOrder.context_pack));
  return dispatchAdapter(adapter, {
    protocol_version: '1.0', kind: 'uplex.work_order', work_order: workOrder, context_pack: contextPack,
    response_contract: {
      status: ['completed', 'failed', 'blocked'], summary: 'string', evidence: ['project-relative-path'],
      decisions: ['string'], risks: ['string'], limitations: ['string']
    }
  }, { cwd: projectDir(projectId) });
}

function normalizeDispatchResult(adapter, dispatch) {
  if (dispatch.status !== 'completed') return {
    status: dispatch.status === 'not_configured' ? 'blocked' : 'failed',
    summary: dispatch.reason ?? dispatch.error ?? dispatch.stderr ?? `Falha no adaptador: ${dispatch.status}`,
    limitations: [`adapter:${adapter.id}`, `dispatch:${dispatch.status}`]
  };
  const response = dispatch.response;
  if (!response || !['completed', 'failed', 'blocked'].includes(response.status) || typeof response.summary !== 'string') return {
    status: 'failed', summary: 'Resposta do adaptador viola o contrato de resultado.',
    limitations: [`adapter:${adapter.id}`, 'invalid_response_contract']
  };
  return {
    status: response.status, summary: response.summary, evidence: response.evidence ?? [],
    decisions: response.decisions ?? [], risks: response.risks ?? [], limitations: response.limitations ?? []
  };
}

export async function continueExecution(projectId, executionId, options = {}) {
  const maxRounds = Math.max(1, Math.min(Number(options.maxRounds ?? 20), 100));
  const maxParallel = Math.max(1, Math.min(Number(options.maxParallel ?? 2), 8));
  const adapter = options.adapterOverride ?? await resolveAdapter(options.adapterId ?? null);
  let execution = await loadExecution(projectId, executionId);
  if (execution.status === 'planned') execution = await startExecution(projectId, executionId);
  if (!['running', 'blocked'].includes(execution.status)) return { ...executionSummary(execution), stop_reason: `execution_${execution.status}`, rounds: 0 };
  if (!adapter.enabled) return { ...executionSummary(execution), stop_reason: 'adapter_not_configured', adapter_id: adapter.id, rounds: 0 };

  let rounds = 0;
  while (rounds < maxRounds) {
    execution = await loadExecution(projectId, executionId);
    const ready = execution.plan.stages.filter((item) => item.status === 'ready');
    if (!ready.length) {
      const running = execution.plan.stages.some((item) => item.status === 'running');
      return { ...executionSummary(execution), stop_reason: running ? 'stages_already_running' : `execution_${execution.status}`, adapter_id: adapter.id, rounds };
    }

    const batch = ready.slice(0, maxParallel);
    for (const stage of batch) await claimStage(projectId, executionId, stage.id);
    const dispatched = await Promise.all(batch.map((stage) => dispatchClaimedStage(projectId, executionId, stage.id, adapter)));
    for (let index = 0; index < batch.length; index += 1) {
      execution = await recordStageResult(projectId, executionId, batch[index].id, normalizeDispatchResult(adapter, dispatched[index]));
    }
    rounds += 1;
    if (execution.status !== 'running') return { ...executionSummary(execution), stop_reason: `execution_${execution.status}`, adapter_id: adapter.id, rounds };
  }
  execution = await loadExecution(projectId, executionId);
  return { ...executionSummary(execution), stop_reason: 'round_limit', adapter_id: adapter.id, rounds };
}

export async function recordStageResult(projectId, executionId, stageId, result) {
  const project = await loadProject(projectId);
  const execution = await loadExecution(projectId, executionId);
  const stage = execution.plan.stages.find((item) => item.id === stageId);
  if (!stage || stage.status !== 'running') throw new Error('Etapa não está em execução.');
  if (!['completed', 'failed', 'blocked'].includes(result.status)) throw new Error('Status de resultado inválido.');
  const artifacts = [];
  for (const item of result.evidence ?? []) artifacts.push(await resolveEvidence(project, item));
  if (result.status === 'completed' && !artifacts.length) throw new Error('Conclusão da etapa exige evidência.');

  Object.assign(stage, {
    status: result.status, summary: result.summary ?? '', artifacts,
    decisions: result.decisions ?? [], risks: result.risks ?? [], limitations: result.limitations ?? [],
    completed_at: new Date().toISOString()
  });
  if(stageId==='quality.verify') project.state.quality_gate=result.status==='completed'?'passed':'failed';
  if(stageId==='security.review') project.state.security_gate=result.status==='completed'?'passed':'failed';
  project.state.status=result.status==='blocked'?'blocked':'in_progress';
  project.state.active_skill=null;project.state.updated_at=new Date().toISOString();

  if (result.status === 'completed') {
    const dependents = execution.plan.stages.filter((item) => item.depends_on.includes(stageId));
    for (const dependent of dependents) {
      const handoff = createHandoff({ executionId, projectId, from: stageId, to: dependent.id, artifacts, decisions: stage.decisions, risks: stage.risks, limitations: stage.limitations });
      await writeJson(resolve(executionRoot(projectId, executionId), 'handoffs', `${stageId}--${dependent.id}.json`), handoff);
    }
  }

  await refreshStages(project, execution);
  const statuses = execution.plan.stages.map((item) => item.status);
  if (statuses.every((status) => status === 'completed')) {
    execution.status = 'completed'; execution.completed_at = new Date().toISOString(); execution.current_stage = null;
    project.state.status='completed';project.state.phase='completed';
  } else if (statuses.every((status) => finalStageStatuses.has(status)) && statuses.some((status) => status !== 'completed')) {
    execution.status = 'blocked'; execution.current_stage = null;
  } else {
    execution.status = 'running'; execution.current_stage = null;
  }
  execution.updated_at = new Date().toISOString();
  await writeJson(executionPath(projectId, executionId), execution);
  await writeJson(project.statePath,project.state);
  await recordEvent(projectId, 'stage_finished', stageId, result.status === 'completed' ? 'passed' : result.status, {
    execution_id: executionId, evidence: artifacts.map((item) => item.path), metadata: { summary: stage.summary, artifacts }
  });
  return execution;
}

export function executionSummary(execution) {
  return {
    execution_id: execution.execution_id, status: execution.status, current_stage: execution.current_stage,
    ready: execution.plan.stages.filter((item) => item.status === 'ready').map((item) => item.id),
    running: execution.plan.stages.filter((item) => item.status === 'running').map((item) => item.id),
    completed: execution.plan.stages.filter((item) => item.status === 'completed').map((item) => item.id),
    blocked: execution.plan.stages.filter((item) => item.status === 'blocked').map((item) => ({ id: item.id, reason: item.blocked_reason ?? item.summary }))
  };
}
