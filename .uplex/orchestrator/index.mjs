import { resolve } from 'node:path';
import { ROOT, createExecution, readJson } from '../runtime/core.mjs';

const unique = (items) => [...new Set(items)];

export async function loadCapabilities() {
  return readJson(resolve(ROOT, '.uplex/capabilities/registry.json'));
}

export function detectIntent(request) {
  const text = request.toLocaleLowerCase('pt-BR');
  const frontend = /front[ -]?end|página|pagina|interface|landing|dashboard|componente|site/.test(text);
  const supabase = /supabase/.test(text);
  const backend = supabase || /back[ -]?end|api|servidor|banco de dados/.test(text);
  const authentication = /login|autentica|cadastro|conta|usuário|usuario|admin/.test(text);
  const runtime = /rodar|executar|iniciar|funcionando|em execução|em execucao/.test(text) || (frontend && backend);
  return {
    type: frontend && backend ? 'build_fullstack' : frontend ? 'build_frontend' : backend ? 'build_backend' : 'general_change',
    requirements: { frontend, backend, supabase, authentication, runtime },
    risk_signals: unique([supabase && 'remote_database', authentication && 'authentication'].filter(Boolean))
  };
}

function closure(selected, byId) {
  const output = new Set();
  function add(id) {
    if (output.has(id)) return;
    const capability = byId.get(id);
    if (!capability) throw new Error(`Capacidade inexistente: ${id}`);
    for (const dependency of capability.depends_on ?? []) add(dependency);
    output.add(id);
  }
  selected.forEach(add);
  return output;
}

export function buildPlan(request, registry) {
  const intent = detectIntent(request);
  const selected = ['architecture.plan'];
  if (intent.requirements.frontend) selected.push('design.system', 'frontend.implement');
  if (intent.requirements.backend) selected.push('database.model');
  if (intent.requirements.supabase) selected.push('backend.supabase');
  if (intent.requirements.authentication) selected.push('auth.implement');
  selected.push('quality.verify');
  if (intent.requirements.backend || intent.requirements.authentication || intent.requirements.supabase) selected.push('security.review');
  if (intent.requirements.runtime) selected.push('runtime.start');

  const byId = new Map(registry.capabilities.map((item) => [item.id, item]));
  const included = closure(unique(selected), byId);
  const implementationStages = ['design.system', 'database.model', 'backend.supabase', 'auth.implement', 'frontend.implement'].filter((id) => included.has(id));
  const stages = registry.capabilities.filter((item) => included.has(item.id)).map((item) => ({
    id: item.id, agent: item.agent, status: 'pending', risk_level: item.risk_level,
    depends_on: item.id === 'quality.verify'
      ? implementationStages
      : (item.depends_on ?? []).filter((id) => included.has(id)), outputs: item.outputs ?? [],
    requires_approval: item.requires_approval ?? []
  }));
  return { schema_version: '1.0', request, intent, status: 'planned', stages };
}

export function validateCapabilityRegistry(registry, agents) {
  const errors = [];
  const ids = new Set();
  const agentIds = new Set(agents.agents.map((item) => item.id));
  for (const item of registry.capabilities) {
    if (ids.has(item.id)) errors.push(`Capacidade duplicada: ${item.id}`);
    ids.add(item.id);
    if (!agentIds.has(item.agent)) errors.push(`Agente inexistente em ${item.id}: ${item.agent}`);
  }
  for (const item of registry.capabilities) for (const dependency of item.depends_on ?? []) {
    if (!ids.has(dependency)) errors.push(`Dependência inexistente em ${item.id}: ${dependency}`);
  }
  const visiting = new Set(), visited = new Set(), byId = new Map(registry.capabilities.map((item) => [item.id, item]));
  function visit(id) {
    if (visiting.has(id)) { errors.push(`Ciclo de capacidades detectado em ${id}`); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of byId.get(id)?.depends_on ?? []) visit(dependency);
    visiting.delete(id); visited.add(id);
  }
  ids.forEach(visit);
  return errors;
}

export async function planExecution(projectId, request) {
  const registry = await loadCapabilities();
  const agents = await readJson(resolve(ROOT, '.uplex/agents/registry.json'));
  const errors = validateCapabilityRegistry(registry, agents);
  if (errors.length) throw new Error(errors.join('; '));
  const plan = buildPlan(request, registry);
  const execution = await createExecution(projectId, request, plan);
  return { execution, plan };
}

export function createHandoff({ executionId, projectId, from, to, artifacts = [], decisions = [], risks = [], limitations = [] }) {
  return {
    schema_version: '1.0', handoff_id: `handoff-${executionId}-${from}-${to}`,
    execution_id: executionId, project_id: projectId, from, to, status: 'ready',
    artifacts, decisions, risks, limitations, created_at: new Date().toISOString()
  };
}
