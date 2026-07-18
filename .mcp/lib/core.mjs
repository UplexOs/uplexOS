import { appendFile, mkdir, readFile, readdir, rename, stat, writeFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { dirname, relative, resolve, sep } from 'node:path';
import readline from 'node:readline';

export const ROOT = resolve(import.meta.dirname, '../..');
export const MCP_ROOT = resolve(ROOT, '.mcp');
export const PROJECTS = resolve(ROOT, '_projetos');
export const KNOWLEDGE = resolve(ROOT, '_knowledge');

export function validId(value, field = 'id') {
  if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(value)) throw new Error(`${field} inválido`);
  return value;
}

export function sandbox(root, input = '.') {
  if (typeof input !== 'string' || input.includes('\0')) throw new Error('Caminho inválido');
  const target = resolve(root, input);
  const rel = relative(root, target);
  if (rel === '..' || rel.startsWith(`..${sep}`) || resolve(target) === resolve(root, '..')) throw new Error('Acesso fora do sandbox');
  return target;
}

export async function exists(path) { try { await stat(path); return true; } catch { return false; } }
export async function readJson(path) { return JSON.parse(await readFile(path, 'utf8')); }
export async function atomicJson(path, data) { await atomicWrite(path, `${JSON.stringify(data, null, 2)}\n`); }
export async function atomicWrite(path, content) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${randomUUID()}.tmp`;
  await writeFile(temporary, content, 'utf8');
  await rename(temporary, path);
}
export function hash(content) { return createHash('sha256').update(content).digest('hex'); }
export function now() { return new Date().toISOString(); }
export function requireScopes(context, required) {
  const granted = new Set(context?.scopes ?? []);
  const missing = required.filter((scope) => !granted.has(scope));
  if (missing.length) throw new Error(`Scopes ausentes: ${missing.join(', ')}`);
}
export async function appendJsonl(path, value) { await mkdir(dirname(path), { recursive: true }); await appendFile(path, `${JSON.stringify(value)}\n`, 'utf8'); }
export async function readJsonl(path) {
  if (!await exists(path)) return [];
  return (await readFile(path, 'utf8')).split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}
export async function walk(root, limit = 1000) {
  const output = [];
  async function visit(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (output.length >= limit) return;
      const path = resolve(dir, entry.name);
      if (entry.isDirectory()) await visit(path); else output.push(path);
    }
  }
  if (await exists(root)) await visit(root);
  return output;
}

export function tool(name, description, scopes, inputSchema, handler, options = {}) {
  return { name, description, risk: options.risk ?? 'low', readOnly: options.readOnly ?? true, destructive: options.destructive ?? false, external: false, paid: false, requiresApproval: options.requiresApproval ?? false, scopes, inputSchema: { type: 'object', additionalProperties: false, ...inputSchema }, evidence: options.evidence ?? [], handler };
}

export function startServer(serverInfo, tools) {
  const map = new Map(tools.map((item) => [item.name, item]));
  const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  rl.on('line', async (line) => {
    let request;
    try {
      request = JSON.parse(line);
      let result;
      if (request.method === 'initialize') result = { protocolVersion: '2025-03-26', serverInfo, capabilities: { tools: {} } };
      else if (request.method === 'ping') result = {};
      else if (request.method === 'tools/list') result = { tools: tools.map(({ handler, risk, readOnly, destructive, external, paid, requiresApproval, scopes, evidence, ...definition }) => ({ ...definition, annotations: { risk, readOnly, destructive, external, paid, requiresApproval, scopes, evidence } })) };
      else if (request.method === 'tools/call') {
        const selected = map.get(request.params?.name);
        if (!selected) throw new Error(`Ferramenta desconhecida: ${request.params?.name}`);
        requireScopes(request.params?.context, selected.scopes);
        const value = await selected.handler(request.params?.arguments ?? {}, request.params?.context ?? {});
        result = { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }], structuredContent: value };
      } else throw new Error(`Método desconhecido: ${request.method}`);
      process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id: request.id ?? null, result })}\n`);
    } catch (error) {
      process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id: request?.id ?? null, error: { code: -32000, message: error.message } })}\n`);
    }
  });
}
