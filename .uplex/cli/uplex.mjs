#!/usr/bin/env node
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { ROOT, PROJECTS, advance, exists, initProject, loadProject, readJson, validateState, validateTasks, workflow } from '../runtime/core.mjs';

const color = !process.env.NO_COLOR;
const c = (code, text) => color ? `\x1b[${code}m${text}\x1b[0m` : text;
const ok = (text) => console.log(c('32', `✓ ${text}`));
const fail = (text) => console.error(c('31', `✗ ${text}`));
const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i >= 0 ? process.argv[i + 1] : fallback; };

async function projectIds() {
  if (!await exists(PROJECTS)) return [];
  return (await readdir(PROJECTS, { withFileTypes: true })).filter((e) => e.isDirectory() && e.name !== '_template').map((e) => e.name);
}

async function status(id) {
  const { state, tasks } = await loadProject(id);
  const flow = await workflow();
  console.log(c('1;36', `\nUPLEXOS · ${id}`));
  console.log(`Fase: ${flow.phases[state.phase]?.label ?? state.phase}`);
  console.log(`Responsável: ${state.active_skill ?? 'nenhum'}`);
  console.log(`Status: ${state.status} · Tier: ${state.tier}`);
  console.log(`Gates: QA=${state.quality_gate} · Security=${state.security_gate}`);
  console.log(`Tasks: ${tasks.tasks.filter((t) => t.status === 'validated').length}/${tasks.tasks.length} validadas\n`);
}

async function validate(id) {
  const flow = await workflow();
  const ids = id ? [id] : await projectIds();
  const errors = [];
  for (const projectId of ids) {
    try {
      const project = await loadProject(projectId);
      errors.push(...validateState(project.state, flow).map((e) => `${projectId}: ${e}`));
      errors.push(...validateTasks(project.tasks).map((e) => `${projectId}: ${e}`));
    } catch (error) { errors.push(`${projectId}: ${error.message}`); }
  }
  if (!id && await exists(resolve(ROOT, 'contexto/estado.json'))) {
    const rootState = await readJson(resolve(ROOT, 'contexto/estado.json'));
    const rootTasks = await readJson(resolve(ROOT, 'contexto/tasks.json'));
    errors.push(...validateState(rootState, flow).map((e) => `uplexos-core: ${e}`));
    errors.push(...validateTasks(rootTasks).map((e) => `uplexos-core: ${e}`));
  }
  const registry = await readJson(resolve(ROOT, '.claude/skills/registry.json'));
  for (const skill of registry.skills) if (!await exists(resolve(ROOT, skill.path))) errors.push(`registry: caminho ausente: ${skill.path}`);
  if (errors.length) { errors.forEach(fail); throw new Error(`${errors.length} erro(s) de validação`); }
  ok(`${ids.length} instância(s), contexto do core e ${registry.skills.length} skills validados`);
}

async function doctor() {
  console.log(c('1;36', '\nUPLEXOS DOCTOR'));
  const checks = [
    ['Node >= 20', Number(process.versions.node.split('.')[0]) >= 20, process.version],
    ['Registry de skills', await exists(resolve(ROOT, '.claude/skills/registry.json')), '.claude/skills/registry.json'],
    ['Workflow', await exists(resolve(ROOT, '.uplex/runtime/workflow.json')), '.uplex/runtime/workflow.json'],
    ['Schemas', await exists(resolve(ROOT, '.claude/schemas/project-state.schema.json')), '.claude/schemas'],
    ['Git', await exists(resolve(ROOT, '.git')), 'opcional neste diretório']
  ];
  checks.forEach(([name, passed, detail], index) => {
    if (index === 4 && !passed) console.log(c('33', `! ${name} (${detail})`));
    else (passed ? ok : fail)(`${name} (${detail})`);
  });
  if (checks.slice(0, 4).some(([, passed]) => !passed)) throw new Error('Ambiente incompleto');
  console.log();
}

function help() {
  console.log(`${c('1;36', 'UplexOS v4.1')} — Autonomous Workflow Engine\n
  uplex init <id> [--tier mvp|startup|enterprise] [--client Nome] [--goal Objetivo]
  uplex status <id>
  uplex next <id>
  uplex run <id> --evidence <arquivo> [--result passed|not_applicable] [--approve]
  uplex validate [id]
  uplex doctor
  uplex dashboard`);
}

async function main() {
  const [, , command = 'help', id] = process.argv;
  if (command === 'init') { if (!id) throw new Error('Informe o ID do projeto.'); await initProject({ projectId: id, tier: arg('tier', 'mvp'), client: arg('client', 'Cliente'), goal: arg('goal', 'Definir objetivo') }); ok(`Projeto ${id} criado`); await status(id); }
  else if (command === 'status') await status(id);
  else if (command === 'next') { const { state } = await loadProject(id); const flow = await workflow(); const phase = flow.phases[state.phase]; console.log(`${phase.label} → execute ${c('33', phase.skill ? `/${phase.skill}` : 'nenhuma ação')}`); }
  else if (command === 'run') { const evidence = arg('evidence'); if (!evidence) throw new Error('Use --evidence <arquivo>.'); await advance(id, { evidence: evidence.split(','), result: arg('result', 'passed'), approved: process.argv.includes('--approve') }); ok('Gate registrado e handoff concluído'); await status(id); }
  else if (command === 'validate') await validate(id);
  else if (command === 'doctor') await doctor();
  else if (command === 'dashboard') await import('../dashboard/index.js');
  else help();
}

main().catch((error) => { fail(error.message); process.exitCode = 1; });