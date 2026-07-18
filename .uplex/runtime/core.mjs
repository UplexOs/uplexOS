import { appendFile, access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve, relative } from 'node:path';
import { randomUUID } from 'node:crypto';

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
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export async function recordEvent(projectId, event, skill, result, details = {}) {
  const dir = projectDir(projectId);
  const payload = {
    event_id: randomUUID(), event, skill: skill ?? 'uplex-runtime', project_id: projectId,
    task_id: details.task_id ?? null, timestamp: new Date().toISOString(), result,
    commands: details.commands ?? [], evidence: details.evidence ?? [], estimated: false,
    metadata: details.metadata ?? {}
  };
  await mkdir(resolve(dir, 'contexto'), { recursive: true });
  await appendFile(resolve(dir, 'contexto/timeline.jsonl'), `${JSON.stringify(payload)}\n`, 'utf8');
  return payload;
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

export async function advance(projectId, { result = 'passed', evidence = [], approved = false } = {}) {
  const project = await loadProject(projectId);
  const flow = await workflow();
  const phase = flow.phases[project.state.phase];
  if (!phase || !phase.next) throw new Error('O projeto não possui próxima fase.');
  if (result !== 'passed' && result !== 'not_applicable') throw new Error('Somente resultados passed ou not_applicable liberam handoff.');
  if (!evidence.length) throw new Error('Evidência verificável é obrigatória para avançar.');
  for (const item of evidence) if (!await exists(resolve(ROOT, item))) throw new Error(`Evidência não encontrada: ${item}`);
  if (phase.requires_approval && !approved) throw new Error('Esta transição exige aprovação explícita (--approve).');
  if (phase.gate) project.state[phase.gate] = result;
  const next = flow.phases[phase.next];
  project.state.phase = phase.next;
  project.state.status = phase.next === 'completed' ? 'completed' : 'in_progress';
  project.state.active_skill = next.skill;
  project.state.updated_at = new Date().toISOString();
  if (approved) project.state.approvals.push(`${phase.skill}:${project.state.updated_at}`);
  await writeJson(project.statePath, project.state);
  await recordEvent(projectId, 'gate_evaluated', phase.skill, result, { evidence, metadata: { from: phase.label, to: next.label, approved } });
  await recordEvent(projectId, 'handoff_created', next.skill, 'passed', { evidence, metadata: { from_skill: phase.skill } });
  return project.state;
}