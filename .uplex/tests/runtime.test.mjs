import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { migrateLegacyState, newState, newTasks, resolveEvidence, validateState, validateTasks, workflow } from '../runtime/core.mjs';

test('estado inicial obedece ao contrato e à FSM', async () => {
  const state = newState('clinica-demo', 'startup');
  assert.deepEqual(validateState(state, await workflow()), []);
  assert.equal(state.active_skill, 'onboarding');
});

test('coleção de tasks vazia é válida', () => {
  assert.deepEqual(validateTasks(newTasks('clinica-demo')), []);
});

test('estado com fase desconhecida é bloqueado', async () => {
  const state = newState('clinica-demo');
  state.phase = 'fase-inventada';
  assert.match(validateState(state, await workflow()).join(' '), /fase desconhecida/);
});

test('IDs impedem path traversal', async () => {
  const { projectDir } = await import('../runtime/core.mjs');
  assert.throws(() => projectDir('../segredo'), /ID inválido/);
});

test('estado legado é migrado para o contrato atual', async () => {
  const state=migrateLegacyState({fase_atual:'onboarding_concluido',tier:'TIER 2 (Startup Mode)'},'clinica-demo',await workflow());
  assert.equal(state.schema_version,'1.0');assert.equal(state.phase,'architecture');assert.equal(state.tier,'startup');
});

test('evidência precisa existir dentro do projeto e recebe hash',async()=>{
  const dir=await mkdtemp(resolve(tmpdir(),'uplex-evidence-'));await mkdir(resolve(dir,'docs'));await writeFile(resolve(dir,'docs/report.md'),'ok');
  const evidence=await resolveEvidence({dir},'docs/report.md');assert.equal(evidence.path,'docs/report.md');assert.equal(evidence.sha256.length,64);
  await assert.rejects(()=>resolveEvidence({dir},'../outside.md'),/fora do projeto/);await rm(dir,{recursive:true,force:true});
});
