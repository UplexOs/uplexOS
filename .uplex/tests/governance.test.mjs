import test from 'node:test';
import assert from 'node:assert/strict';
import { consumeApproval, decideApproval, requestApproval } from '../runtime/governance.mjs';

test('aprovação é específica e consumida uma única vez',async()=>{
  const action=`test.action:${Date.now()}`;
  const requested=await requestApproval({projectId:'approval-test',action,riskSummary:'teste automatizado',ttlMinutes:5});
  const approved=await decideApproval({approvalId:requested.approval_id,decision:'approved'});
  assert.equal(approved.status,'approved');
  const consumed=await consumeApproval({approvalId:requested.approval_id,action,projectId:'approval-test'});
  assert.equal(consumed.status,'consumed');
  await assert.rejects(()=>consumeApproval({approvalId:requested.approval_id,action,projectId:'approval-test'}),/inválida/);
});

test('aprovação não pode ser usada em outro projeto ou ação',async()=>{
  const requested=await requestApproval({projectId:'approval-test',action:`test.scope:${Date.now()}`,riskSummary:'teste automatizado'});
  await decideApproval({approvalId:requested.approval_id,decision:'approved'});
  await assert.rejects(()=>consumeApproval({approvalId:requested.approval_id,action:'outra.acao',projectId:'approval-test'}),/inválida/);
  await assert.rejects(()=>consumeApproval({approvalId:requested.approval_id,action:requested.action,projectId:'outro-projeto'}),/inválida/);
});
