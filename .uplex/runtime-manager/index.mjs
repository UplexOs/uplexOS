import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdir, open, readFile, rm } from 'node:fs/promises';
import { platform } from 'node:os';
import { resolve } from 'node:path';
import { projectDir, readJson, writeJson } from '../runtime/core.mjs';
import { smokeHttp } from '../../.mcp/lib/testing.mjs';

const metadataPath = (projectId) => resolve(projectDir(projectId), 'contexto/runtime.json');
const logsPath = (projectId) => resolve(projectDir(projectId), 'contexto/runtime.log');

async function freePort() {
  return new Promise((done, fail) => {
    const server = createServer();
    server.on('error', fail);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => done(address.port));
    });
  });
}

function alive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try { process.kill(pid, 0); return true; } catch { return false; }
}

async function waitForHealth(url, timeoutMs = 10_000) {
  const deadline = Date.now() + timeoutMs;
  let last = null;
  while (Date.now() < deadline) {
    last = await smokeHttp(url, { timeoutMs: 1000 });
    if (last.status === 'passed') return last;
    await new Promise((done) => setTimeout(done, 150));
  }
  return last ?? { status: 'blocked', url, error: 'timeout' };
}

export async function runtimeStatus(projectId) {
  let metadata;
  try { metadata = await readJson(metadataPath(projectId)); }
  catch { return { schema_version:'1.0', project_id:projectId, status:'not_started', process_status:'not_started', health:null }; }
  const processActive = alive(metadata.pid);
  const health = processActive ? await smokeHttp(metadata.health_url, { timeoutMs: 2000 }) : null;
  const status = processActive && health?.status === 'passed' ? 'running' : processActive ? 'degraded' : 'stopped';
  metadata = { ...metadata, status, process_status:processActive?'active':'stopped', health, checked_at:new Date().toISOString() };
  await writeJson(metadataPath(projectId), metadata);
  return metadata;
}

export async function startStaticRuntime(projectId, options = {}) {
  const current = await runtimeStatus(projectId);
  if (['running','degraded'].includes(current.status)) return current;
  const root = resolve(projectDir(projectId), options.root ?? 'code');
  const port = Number(options.port ?? await freePort());
  const logPath = logsPath(projectId);
  await mkdir(resolve(logPath, '..'), { recursive:true });
  const log = await open(logPath, 'a');
  const script = resolve(import.meta.dirname, 'static-server.mjs');
  const child = spawn(process.execPath, [script, root, String(port)], {
    cwd:root, detached:true, windowsHide:true, stdio:['ignore', log.fd, log.fd]
  });
  child.unref();
  await log.close();
  const url = `http://127.0.0.1:${port}`;
  const healthUrl = `${url}/__uplex_health`;
  let metadata = {
    schema_version:'1.0', project_id:projectId, status:'starting', mode:'static', pid:child.pid,
    command:[process.execPath, script, root, String(port)], root, port, url, health_url:healthUrl,
    log_path:'contexto/runtime.log', started_at:new Date().toISOString(), process_status:'active', health:null
  };
  await writeJson(metadataPath(projectId), metadata);
  const health = await waitForHealth(healthUrl, options.timeoutMs ?? 10_000);
  metadata = { ...metadata, status:health.status === 'passed'?'running':'degraded', health, checked_at:new Date().toISOString() };
  await writeJson(metadataPath(projectId), metadata);
  return metadata;
}

export async function stopRuntime(projectId) {
  let metadata;
  try { metadata = await readJson(metadataPath(projectId)); }
  catch { return { project_id:projectId, status:'not_started' }; }
  if (alive(metadata.pid)) {
    if (platform() === 'win32') spawnSync('taskkill', ['/pid', String(metadata.pid), '/t', '/f'], { windowsHide:true, stdio:'ignore' });
    else { try { process.kill(-metadata.pid, 'SIGTERM'); } catch { try { process.kill(metadata.pid, 'SIGTERM'); } catch {} } }
  }
  const stopped = { ...metadata, status:'stopped', process_status:'stopped', stopped_at:new Date().toISOString(), health:null };
  await writeJson(metadataPath(projectId), stopped);
  return stopped;
}

export async function runtimeLogs(projectId, limit = 100) {
  try { const lines=(await readFile(logsPath(projectId),'utf8')).split(/\r?\n/);return lines.slice(-Math.max(1,Math.min(Number(limit),1000))).join('\n'); }
  catch { return ''; }
}
