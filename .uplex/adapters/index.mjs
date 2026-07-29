import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { ROOT, readJson } from '../runtime/core.mjs';
import { executeNativeCapability } from '../engines/native.mjs';

const MAX_OUTPUT = 2 * 1024 * 1024;

function runProcess(command, args, options = {}) {
  return new Promise((resolvePromise) => {
    const started = Date.now();
    let stdout = '', stderr = '', settled = false;
    const child = spawn(command, args, {
      cwd: options.cwd ?? ROOT, env: options.env ?? process.env,
      shell: false, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe']
    });
    const finish = (result) => {
      if (settled) return;
      settled = true; clearTimeout(timer);
      resolvePromise({ ...result, stdout, stderr, duration_ms: Date.now() - started });
    };
    const timer = setTimeout(() => { child.kill(); finish({ status: 'timeout', exit_code: null }); }, options.timeoutMs ?? 30_000);
    child.on('error', (error) => finish({ status: error.code === 'ENOENT' ? 'not_installed' : 'failed', exit_code: null, error: error.message }));
    child.stdout.on('data', (chunk) => { if (stdout.length < MAX_OUTPUT) stdout += chunk; });
    child.stderr.on('data', (chunk) => { if (stderr.length < MAX_OUTPUT) stderr += chunk; });
    child.on('close', (code) => finish({ status: code === 0 ? 'completed' : 'failed', exit_code: code }));
    child.stdin.end(options.stdin ?? '');
  });
}

export async function loadAdapterRegistry() {
  return readJson(resolve(ROOT, '.uplex/adapters/registry.json'));
}

export async function detectHarnesses(registry = null) {
  registry ??= await loadAdapterRegistry();
  const results = [];
  for (const candidate of registry.detection ?? []) {
    const result = await runProcess(candidate.command, candidate.args ?? [], { timeoutMs: 5000 });
    results.push({ id: candidate.id, command: candidate.command, status: result.status === 'completed' ? 'available' : result.status, version: result.stdout.trim() || result.stderr.trim() || null });
  }
  return results;
}

export function validateAdapter(adapter) {
  const errors = [];
  if (!adapter?.id) errors.push('Adaptador sem id.');
  if (!['process-json','builtin'].includes(adapter?.type)) errors.push('Tipo de adaptador não suportado.');
  if (adapter?.type === 'process-json' && adapter?.enabled && !adapter.command) errors.push('Adaptador habilitado sem comando.');
  if (adapter?.args && !Array.isArray(adapter.args)) errors.push('args deve ser uma lista.');
  return errors;
}

export async function dispatchAdapter(adapter,payload,options={}){
  if(adapter.type==='builtin'){
    if(!adapter.enabled)return{status:'not_configured',adapter_id:adapter.id,reason:adapter.reason??'Adaptador desabilitado.'};
    const started=Date.now();
    try{return{status:'completed',adapter_id:adapter.id,response:await executeNativeCapability(payload,{cwd:options.cwd??ROOT}),duration_ms:Date.now()-started}}
    catch(error){return{status:'failed',adapter_id:adapter.id,error:error.message,duration_ms:Date.now()-started}}
  }
  return dispatchProcessAdapter(adapter,payload,options);
}

export async function dispatchProcessAdapter(adapter, payload, options = {}) {
  const errors = validateAdapter(adapter);
  if (errors.length) throw new Error(errors.join(' '));
  if (!adapter.enabled) return { status: 'not_configured', adapter_id: adapter.id, reason: adapter.reason ?? 'Adaptador desabilitado.' };
  const result = await runProcess(adapter.command, adapter.args ?? [], {
    cwd: options.cwd ?? ROOT, timeoutMs: adapter.timeout_ms ?? 900000,
    stdin: `${JSON.stringify(payload)}\n`, env: { ...process.env, ...(adapter.environment ?? {}) }
  });
  if (result.status !== 'completed') return { ...result, adapter_id: adapter.id };
  try {
    const response = JSON.parse(result.stdout.trim());
    return { status: 'completed', adapter_id: adapter.id, response, stderr: result.stderr, duration_ms: result.duration_ms };
  } catch {
    return { status: 'invalid_output', adapter_id: adapter.id, stdout: result.stdout, stderr: result.stderr, duration_ms: result.duration_ms, reason: 'O adaptador não retornou um objeto JSON válido.' };
  }
}

export async function resolveAdapter(id, registry = null) {
  registry ??= await loadAdapterRegistry();
  const adapter = registry.adapters.find((item) => item.id === (id ?? registry.default_adapter));
  if (!adapter) throw new Error(`Adaptador desconhecido: ${id}`);
  return adapter;
}
