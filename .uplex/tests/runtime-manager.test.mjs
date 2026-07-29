import test from 'node:test';
import assert from 'node:assert/strict';
import { rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { initProject, projectDir } from '../runtime/core.mjs';
import { runtimeLogs, runtimeStatus, startStaticRuntime, stopRuntime } from '../runtime-manager/index.mjs';

test('runtime manager inicia, verifica e encerra servidor local',async()=>{
  const projectId=`runtime-test-${Date.now()}`;
  try{
    await initProject({projectId,goal:'Validar runtime'});
    await writeFile(resolve(projectDir(projectId),'code/index.html'),'<h1>Runtime ativo</h1>','utf8');
    const started=await startStaticRuntime(projectId);
    assert.equal(started.status,'running');assert.equal(started.health.status,'passed');assert.ok(started.port>0);
    const page=await fetch(started.url);assert.equal(page.status,200);assert.match(await page.text(),/Runtime ativo/);
    const observed=await runtimeStatus(projectId);assert.equal(observed.status,'running');
    assert.match(await runtimeLogs(projectId),/UPLEX_RUNTIME_READY/);
    const stopped=await stopRuntime(projectId);assert.equal(stopped.status,'stopped');
    await new Promise(done=>setTimeout(done,250));
    const final=await runtimeStatus(projectId);assert.equal(final.status,'stopped');
  }finally{await stopRuntime(projectId);await rm(projectDir(projectId),{recursive:true,force:true})}
});
