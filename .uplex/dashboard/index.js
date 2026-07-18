import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PROJECTS, ROOT, exists, readJson, workflow } from '../runtime/core.mjs';

const registry = await readJson(resolve(ROOT, '.claude/skills/registry.json'));
const flow = await workflow();
const entries = await readdir(PROJECTS, { withFileTypes: true });
const ids = entries.filter((entry) => entry.isDirectory() && entry.name !== '_template').map((entry) => entry.name);
const rows = [];
for (const id of ids) {
  const statePath = resolve(PROJECTS, id, 'contexto/estado.json');
  if (!await exists(statePath)) continue;
  const state = await readJson(statePath);
  rows.push({ projeto: id, fase: flow.phases[state.phase]?.label ?? state.phase, status: state.status, responsavel: state.active_skill ?? '-' });
}

console.log('\x1b[1;36m✦ UPLEX OPS CONSOLE [v4.1.0]\x1b[0m');
console.log(`\x1b[32m✓\x1b[0m ${registry.skills.length} skills registradas · ${rows.length} projetos monitorados\n`);
if (rows.length) console.table(rows);
else console.log('Nenhum projeto inicializado. Use: npm run uplex -- init meu-projeto');
