import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, relative, sep } from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const port = Number(process.argv[3] ?? 0);
const host = '127.0.0.1';
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg' };

function safePath(urlPath) {
  const pathname = decodeURIComponent(new URL(urlPath, 'http://localhost').pathname);
  const target = resolve(root, pathname === '/' ? 'index.html' : `.${pathname}`);
  const rel = relative(root, target);
  if (rel === '..' || rel.startsWith(`..${sep}`)) return null;
  return target;
}

const server = createServer(async (request, response) => {
  if (request.url === '/__uplex_health') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok', pid: process.pid }));
    return;
  }
  let target = safePath(request.url ?? '/');
  if (!target) { response.writeHead(403); response.end('Forbidden'); return; }
  try {
    const info = await stat(target);
    if (info.isDirectory()) target = resolve(target, 'index.html');
    const content = await readFile(target);
    response.writeHead(200, { 'content-type': types[extname(target).toLowerCase()] ?? 'application/octet-stream' });
    response.end(content);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, host, () => process.stdout.write(`UPLEX_RUNTIME_READY ${host}:${port}\n`));
const close = () => server.close(() => process.exit(0));
process.on('SIGTERM', close);
process.on('SIGINT', close);
