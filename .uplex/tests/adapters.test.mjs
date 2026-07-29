import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { rm } from 'node:fs/promises';
import { detectHarnesses, dispatchProcessAdapter, validateAdapter } from '../adapters/index.mjs';
import { initProject, projectDir } from '../runtime/core.mjs';
import { planExecution } from '../orchestrator/index.mjs';
import { continueExecution, dispatchStage, loadExecution, startExecution } from '../orchestrator/workflow.mjs';
import { stopRuntime } from '../runtime-manager/index.mjs';

const fixture = resolve(import.meta.dirname, 'fixtures/process-adapter.mjs');
const testAdapter = { id:'test', type:'process-json', enabled:true, command:process.execPath, args:[fixture], timeout_ms:10000, input:'stdin-json', output:'stdout-json' };

test('adaptador exige comando quando habilitado',()=>{
  assert.match(validateAdapter({...testAdapter,command:null}).join(' '),/sem comando/);
});

test('detecção informa comando ausente sem simular disponibilidade',async()=>{
  const result=await detectHarnesses({detection:[{id:'missing',command:'uplex-command-that-does-not-exist',args:['--version']}]});
  assert.equal(result[0].status,'not_installed');
});

test('process adapter troca JSON por stdin e stdout sem shell',async()=>{
  const dir=projectDir(`adapter-protocol-${Date.now()}`);
  try {
    await import('node:fs/promises').then(x=>x.mkdir(dir,{recursive:true}));
    const result=await dispatchProcessAdapter(testAdapter,{work_order:{capability_id:'protocol.test'}},{cwd:dir});
    assert.equal(result.status,'completed');assert.equal(result.response.status,'completed');
  } finally { await rm(dir,{recursive:true,force:true}); }
});

test('dispatch executa work order e conclui etapa automaticamente',async()=>{
  const projectId=`adapter-flow-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar adaptador'});
    const {execution}=await planExecution(projectId,'Crie uma landing page');
    await startExecution(projectId,execution.execution_id);
    const result=await dispatchStage(projectId,execution.execution_id,'architecture.plan','test',testAdapter);
    assert.equal(result.status,'completed');assert.equal(result.stage_result.status,'completed');
    const persisted=await loadExecution(projectId,execution.execution_id);
    assert.equal(persisted.plan.stages.find(x=>x.id==='architecture.plan').status,'completed');
    assert.equal(persisted.plan.stages.find(x=>x.id==='design.system').status,'ready');
  } finally { await rm(projectDir(projectId),{recursive:true,force:true}); }
});

test('adaptador desabilitado não reivindica a etapa',async()=>{
  const projectId=`adapter-disabled-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar bloqueio seguro'});
    const {execution}=await planExecution(projectId,'Crie uma landing page');
    await startExecution(projectId,execution.execution_id);
    const result=await dispatchStage(projectId,execution.execution_id,'architecture.plan',null,{...testAdapter,enabled:false,reason:'não configurado'});
    assert.equal(result.status,'not_configured');
    const persisted=await loadExecution(projectId,execution.execution_id);
    assert.equal(persisted.plan.stages.find(x=>x.id==='architecture.plan').status,'ready');
  } finally { await rm(projectDir(projectId),{recursive:true,force:true}); }
});

test('continue executa workflow completo sem comandos por etapa',async()=>{
  const projectId=`adapter-continue-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar execução automática'});
    const {execution}=await planExecution(projectId,'Crie uma landing page');
    const result=await continueExecution(projectId,execution.execution_id,{adapterOverride:testAdapter,maxParallel:2,maxRounds:10});
    assert.equal(result.status,'completed');assert.equal(result.stop_reason,'execution_completed');
    assert.deepEqual(result.completed,['architecture.plan','design.system','frontend.implement','quality.verify']);
    assert.ok(result.rounds>=4);
  } finally { await rm(projectDir(projectId),{recursive:true,force:true}); }
});

test('continue respeita paralelismo e limite de rodadas',async()=>{
  const projectId=`adapter-rounds-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar limites'});
    const {execution}=await planExecution(projectId,'Crie uma página frontend com backend no Supabase');
    const first=await continueExecution(projectId,execution.execution_id,{adapterOverride:testAdapter,maxParallel:2,maxRounds:2});
    assert.equal(first.stop_reason,'round_limit');assert.equal(first.rounds,2);
    assert.ok(first.completed.includes('architecture.plan'));
    assert.ok(first.completed.includes('design.system'));assert.ok(first.completed.includes('database.model'));
    const resumed=await continueExecution(projectId,execution.execution_id,{adapterOverride:testAdapter,maxParallel:2,maxRounds:10});
    assert.equal(resumed.status,'completed');assert.equal(resumed.stop_reason,'execution_completed');
  } finally { await rm(projectDir(projectId),{recursive:true,force:true}); }
});

test('continue com adaptador ausente preserva etapa pronta',async()=>{
  const projectId=`adapter-safe-pause-${Date.now()}`;
  try {
    await initProject({projectId,goal:'Validar pausa'});
    const {execution}=await planExecution(projectId,'Crie uma landing page');
    const result=await continueExecution(projectId,execution.execution_id,{adapterOverride:{...testAdapter,enabled:false,reason:'ausente'}});
    assert.equal(result.stop_reason,'adapter_not_configured');assert.deepEqual(result.ready,['architecture.plan']);
    const persisted=await loadExecution(projectId,execution.execution_id);
    assert.equal(persisted.plan.stages.find(x=>x.id==='architecture.plan').status,'ready');
  } finally { await rm(projectDir(projectId),{recursive:true,force:true}); }
});

test('executor nativo conclui vertical frontend Supabase com artefatos reais',async()=>{
  const projectId=`native-vertical-${Date.now()}`;
  try{
    await initProject({projectId,goal:'Página frontend com backend Supabase'});
    const {execution}=await planExecution(projectId,'Crie uma página frontend com backend no Supabase');
    const result=await continueExecution(projectId,execution.execution_id,{maxParallel:2,maxRounds:20});
    assert.equal(result.status,'completed');
    for(const path of ['docs/architecture.md','design-system/system.json','docs/data-model.md','supabase/migrations/0001_initial.sql','code/index.html','code/lib/supabase.ts','reports/quality.json','reports/security.json','reports/runtime.json']){
      const present=await import('node:fs/promises').then(x=>x.access(resolve(projectDir(projectId),path)).then(()=>true).catch(()=>false));assert.equal(present,true,path);
    }
    const security=await import('node:fs/promises').then(x=>x.readFile(resolve(projectDir(projectId),'reports/security.json'),'utf8').then(JSON.parse));
    assert.equal(security.decision,'pass');
    const state=await import('node:fs/promises').then(x=>x.readFile(resolve(projectDir(projectId),'contexto/estado.json'),'utf8').then(JSON.parse));
    assert.equal(state.status,'completed');assert.equal(state.quality_gate,'passed');assert.equal(state.security_gate,'passed');
  }finally{await stopRuntime(projectId);await rm(projectDir(projectId),{recursive:true,force:true})}
});
