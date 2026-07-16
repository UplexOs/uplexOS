import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, dirname, basename } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const skillsRoot = resolve(root, '.claude/skills');
const registryPath = resolve(skillsRoot, 'registry.json');
const requiredContractFields = [
  'name', 'version', 'description', 'risk_level', 'mode', 'read_scope',
  'write_scope', 'required_inputs', 'outputs', 'external_actions',
  'requires_approval', 'aliases', 'status'
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return null;
  const end = raw.indexOf('\n---', 3);
  if (end < 0) return null;
  const header = raw.slice(4, end);
  const data = {};
  for (const line of header.split(/\r?\n/)) {
    const match = line.match(/^([a-z_]+):\s*(.*)$/);
    if (match) data[match[1]] = match[2].trim();
  }
  return data;
}

const allFiles = await walk(skillsRoot);
const skillFiles = allFiles.filter((file) => basename(file) === 'SKILL.md');
const legacyFiles = allFiles.filter((file) => file.endsWith('.md') && basename(file) !== 'SKILL.md' && basename(file) !== 'README.md');
const errors = [];
const warnings = [];
const discovered = new Map();

for (const file of skillFiles) {
  const path = relative(root, file).replaceAll('\\', '/');
  const raw = await readFile(file, 'utf8');
  const frontmatter = parseFrontmatter(raw);
  if (!frontmatter) {
    errors.push(`${path}: frontmatter ausente ou inválido`);
    continue;
  }
  const name = frontmatter.name?.replaceAll('"', '').replaceAll("'", '');
  if (!name) {
    errors.push(`${path}: campo name ausente`);
    continue;
  }
  if (discovered.has(name)) errors.push(`ID duplicado ${name}: ${discovered.get(name)} e ${path}`);
  discovered.set(name, path);
  const missing = requiredContractFields.filter((field) => !(field in frontmatter));
  if (missing.length) warnings.push(`${path}: contrato parcial; faltam ${missing.join(', ')}`);
}

const registry = JSON.parse(await readFile(registryPath, 'utf8'));
const registered = new Map();
for (const entry of registry.skills) {
  if (registered.has(entry.id)) errors.push(`registry: ID duplicado ${entry.id}`);
  registered.set(entry.id, entry.path);
  try {
    const info = await stat(resolve(root, entry.path));
    if (!info.isFile()) errors.push(`registry: caminho não é arquivo: ${entry.path}`);
  } catch {
    errors.push(`registry: caminho inexistente: ${entry.path}`);
  }
  if (discovered.get(entry.id) !== entry.path) {
    errors.push(`registry: ${entry.id} aponta para ${entry.path}, descoberto ${discovered.get(entry.id) ?? 'nenhum'}`);
  }
}

for (const [id, path] of discovered) {
  if (!registered.has(id)) errors.push(`skill não registrada: ${id} (${path})`);
}

for (const legacy of legacyFiles) {
  warnings.push(`legado não roteável: ${relative(root, legacy).replaceAll('\\', '/')}`);
}

console.log(`Skills descobertas: ${skillFiles.length}`);
console.log(`Skills registradas: ${registry.skills.length}`);
console.log(`Erros: ${errors.length}`);
console.log(`Avisos: ${warnings.length}`);
if (warnings.length) console.log(`\nAVISOS\n- ${warnings.join('\n- ')}`);
if (errors.length) {
  console.error(`\nERROS\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log('\nRegistry consistente. Avisos representam a migração incremental do contrato completo.');
}
