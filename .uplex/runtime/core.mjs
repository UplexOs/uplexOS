import { appendFile, access, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve, relative, sep } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { consumeApproval } from './governance.mjs';

export const ROOT = resolve(import.meta.dirname, '../..');
export const PROJECTS = resolve(ROOT, '_projetos');

export async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

export async function exists(path) {
  try { await access(path, constants.F_OK); return true; } catch { return false; }
}

export async function workflow() {
  return readJson(resolve(ROOT, '.uplex/runtime/workflow.json'));
}

export function hash(content) {
  return createHash('sha256').update(content).digest('hex');
}

export function inside(root, target) {
  const rel = relative(root, target);
  return rel !== '..' && !rel.startsWith(`..${sep}`) && !rel.includes('\0');
}

export function projectDir(projectId) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(projectId)) {
    throw new Error('ID inválido. Use letras minúsculas, números e hífens.');
  }
  return resolve(PROJECTS, projectId);
}

export async function loadProject(projectId) {
  const dir = projectDir(projectId);
  const statePath = resolve(dir, 'contexto/estado.json');
  const tasksPath = resolve(dir, 'contexto/tasks.json');
  if (!await exists(statePath)) throw new Error(`Projeto não encontrado: ${projectId}`);
  return { dir, statePath, tasksPath, state: await readJson(statePath), tasks: await readJson(tasksPath) };
}

export function newState(projectId, tier = 'mvp') {
  return {
    schema_version: '1.0', project_id: projectId, tier, phase: 'onboarding',
    status: 'in_progress', active_task_id: null, active_skill: 'onboarding',
    last_verified_commit: null, quality_gate: 'pending', security_gate: 'pending',
    blocked_by: [], approvals: [], updated_at: new Date().toISOString()
  };
}

export function newTasks(projectId) {
  return { schema_version: '1.0', project_id: projectId, tasks: [] };
}

export async function writeJson(path, value) {
  await atomicWrite(path, `${JSON.stringify(value, null, 2)}\n`);
}

export async function atomicWrite(path, content) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${randomUUID()}.tmp`;
  await writeFile(temporary, content, 'utf8');
  await rename(temporary, path);
}

export async function recordEvent(projectId, event, skill, result, details = {}) {
  const dir = projectDir(projectId);
  const payload = {
    event_id: randomUUID(), event, skill: skill ?? 'uplex-runtime', project_id: projectId,
    task_id: details.task_id ?? null, timestamp: new Date().toISOString(), result,
    commands: details.commands ?? [], evidence: details.evidence ?? [], estimated: false,
    execution_id: details.execution_id ?? null, metadata: details.metadata ?? {}
  };
  await mkdir(resolve(dir, 'contexto'), { recursive: true });
  await appendFile(resolve(dir, 'contexto/timeline.jsonl'), `${JSON.stringify(payload)}\n`, 'utf8');
  return payload;
}

export async function createExecution(projectId, request, plan = null) {
  const project = await loadProject(projectId);
  const execution = {
    schema_version: '1.0', execution_id: `run-${randomUUID()}`, project_id: projectId,
    request, status: 'planned', current_stage: null, plan, started_at: null,
    completed_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  };
  const path = resolve(project.dir, 'contexto/executions', `${execution.execution_id}.json`);
  await writeJson(path, execution);
  await recordEvent(projectId, 'execution_created', 'uplex-orchestrator', 'passed', {
    execution_id: execution.execution_id, metadata: { request }
  });
  return execution;
}

export async function resolveEvidence(project, item) {
  if (typeof item !== 'string' || !item.trim()) throw new Error('Caminho de evidência inválido.');
  const fromRoot = resolve(ROOT, item);
  const target = inside(project.dir, fromRoot) ? fromRoot : resolve(project.dir, item);
  if (!inside(project.dir, target)) throw new Error(`Evidência fora do projeto: ${item}`);
  if (!await exists(target)) throw new Error(`Evidência não encontrada: ${item}`);
  const content = await readFile(target);
  return {
    path: relative(project.dir, target).replaceAll('\\', '/'),
    sha256: hash(content), size: content.length
  };
}

export function validateState(state, flow) {
  const errors = [];
  const required = ['schema_version', 'project_id', 'status', 'updated_at'];
  for (const key of required) if (!(key in state)) errors.push(`estado: campo obrigatório ausente: ${key}`);
  if (state.schema_version !== '1.0') errors.push('estado: schema_version deve ser 1.0');
  if (!flow.phases[state.phase]) errors.push(`estado: fase desconhecida: ${state.phase}`);
  if (!['planned', 'in_progress', 'blocked', 'completed', 'archived'].includes(state.status)) errors.push(`estado: status inválido: ${state.status}`);
  for (const gate of ['quality_gate', 'security_gate']) {
    if (!['pending', 'passed', 'failed', 'not_applicable'].includes(state[gate])) errors.push(`estado: ${gate} inválido`);
  }
  return errors;
}

export function validateTasks(doc) {
  const errors = [];
  if (doc.schema_version !== '1.0' || !doc.project_id || !Array.isArray(doc.tasks)) errors.push('tasks: envelope inválido');
  for (const task of doc.tasks ?? []) {
    if (!/^TASK-[0-9]{3,}$/.test(task.id ?? '')) errors.push(`tasks: ID inválido: ${task.id}`);
    if (!task.title || !task.priority || !Array.isArray(task.acceptance_criteria) || !task.acceptance_criteria.length) errors.push(`tasks: contrato incompleto: ${task.id}`);
  }
  return errors;
}

export async function initProject({ projectId, tier = 'mvp', client = 'Cliente', goal = 'Definir objetivo' }) {
  if (!['mvp', 'startup', 'enterprise'].includes(tier)) throw new Error('Tier deve ser mvp, startup ou enterprise.');
  const dir = projectDir(projectId);
  if (await exists(dir)) throw new Error(`Projeto já existe: ${projectId}`);
  await Promise.all(['contexto', 'code', 'marketing', 'docs'].map((name) => mkdir(resolve(dir, name), { recursive: true })));
  const state = newState(projectId, tier);
  await writeJson(resolve(dir, 'contexto/estado.json'), state);
  await writeJson(resolve(dir, 'contexto/tasks.json'), newTasks(projectId));
  await writeFile(resolve(dir, 'projeto.md'), `# ${projectId}\n\n- **Cliente:** ${client}\n- **Tier:** ${tier}\n- **Objetivo:** ${goal}\n`, 'utf8');
  await recordEvent(projectId, 'handoff_created', 'onboarding', 'passed', { evidence: [relative(ROOT, resolve(dir, 'projeto.md'))], metadata: { next_skill: 'onboarding' } });
  return state;
}

export function migrateLegacyState(raw, projectId, flow) {
  if (raw.schema_version === '1.0') return raw;
  const legacyPhase = raw.fase_atual ?? 'onboarding_concluido';
  const phase = flow.legacy_phase_aliases?.[legacyPhase] ?? 'onboarding';
  const tierText = String(raw.tier ?? '').toLowerCase();
  const tier = tierText.includes('enterprise') || tierText.includes('tier 3') ? 'enterprise'
    : tierText.includes('startup') || tierText.includes('tier 2') ? 'startup' : 'mvp';
  return {
    ...newState(projectId, tier), phase, active_skill: flow.phases[phase]?.skill ?? null,
    security_gate: raw.status_seguranca === 'aprovado' ? 'passed' : 'pending',
    updated_at: new Date().toISOString()
  };
}

export async function migrateProject(projectId) {
  const dir = projectDir(projectId);
  const statePath = resolve(dir, 'contexto/estado.json');
  const tasksPath = resolve(dir, 'contexto/tasks.json');
  if (!await exists(statePath)) throw new Error(`Projeto não encontrado: ${projectId}`);
  const project = { dir, statePath, tasksPath, state: await readJson(statePath) };
  const flow = await workflow();
  if (project.state.schema_version === '1.0') return { migrated: false, state: project.state };
  const state = migrateLegacyState(project.state, projectId, flow);
  await writeJson(project.statePath, state);
  if (!await exists(project.tasksPath)) await writeJson(project.tasksPath, newTasks(projectId));
  await recordEvent(projectId, 'project_migrated', 'uplex-runtime', 'passed', {
    metadata: { from: 'legacy', to: '1.0' }
  });
  return { migrated: true, state };
}

export async function advance(projectId, { result = 'passed', evidence = [], approvalId = null, justification = null, executionId = null } = {}) {
  const project = await loadProject(projectId);
  const flow = await workflow();
  const phase = flow.phases[project.state.phase];
  if (!phase || !phase.next) throw new Error('O projeto não possui próxima fase.');
  if (result !== 'passed' && result !== 'not_applicable') throw new Error('Somente resultados passed ou not_applicable liberam handoff.');
  if (result === 'not_applicable' && !justification) throw new Error('not_applicable exige justificativa.');
  if (result === 'not_applicable' && phase.gate) throw new Error('Gates de qualidade e segurança não podem ser ignorados.');
  if (!evidence.length) throw new Error('Evidência verificável é obrigatória para avançar.');
  const artifacts = [];
  for (const item of evidence) artifacts.push(await resolveEvidence(project, item));
  const action = `workflow.advance:${project.state.phase}`;
  if (phase.requires_approval) {
    if (!approvalId) throw new Error(`Esta transição exige aprovação específica para ${action}.`);
    await consumeApproval({ approvalId, action, projectId });
  }
  if (phase.gate) project.state[phase.gate] = result;
  const next = flow.phases[phase.next];
  project.state.phase = phase.next;
  project.state.status = phase.next === 'completed' ? 'completed' : 'in_progress';
  project.state.active_skill = next.skill;
  project.state.updated_at = new Date().toISOString();
  if (approvalId) project.state.approvals.push(approvalId);
  await writeJson(project.statePath, project.state);
  await recordEvent(projectId, 'gate_evaluated', phase.skill, result, {
    execution_id: executionId, evidence: artifacts.map((item) => item.path),
    metadata: { from: phase.label, to: next.label, approval_id: approvalId, justification, artifacts }
  });
  await recordEvent(projectId, 'handoff_created', next.skill, 'passed', {
    execution_id: executionId, evidence: artifacts.map((item) => item.path),
    metadata: { from_skill: phase.skill, artifacts }
  });
  return project.state;
}
