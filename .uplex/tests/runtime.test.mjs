import test from 'node:test';
import assert from 'node:assert/strict';
import { newState, newTasks, validateState, validateTasks, workflow } from '../runtime/core.mjs';

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