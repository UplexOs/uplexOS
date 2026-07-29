import { appendFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

const ROOT = resolve(import.meta.dirname, '../..');
const APPROVALS = resolve(ROOT, '.mcp/data/approvals.jsonl');

const now = () => new Date().toISOString();

async function entries() {
  try {
    return (await readFile(APPROVALS, 'utf8')).split(/\r?\n/).filter(Boolean).map(JSON.parse);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function append(value) {
  await mkdir(dirname(APPROVALS), { recursive: true });
  await appendFile(APPROVALS, `${JSON.stringify(value)}\n`, 'utf8');
}

export async function latestApprovals() {
  const latest = new Map();
  for (const entry of await entries()) latest.set(entry.approval_id, entry);
  return latest;
}

export async function requestApproval({ projectId, action, riskSummary, actor = 'user', ttlMinutes = 30 }) {
  const approval = {
    schema_version: '1.0', approval_id: `apr-${randomUUID()}`, project_id: projectId,
    action, risk_summary: riskSummary, requested_by: actor, status: 'pending', single_use: true,
    created_at: now(), valid_until: new Date(Date.now() + ttlMinutes * 60_000).toISOString()
  };
  await append(approval);
  return approval;
}

export async function decideApproval({ approvalId, decision, actor = 'user' }) {
  const approval = (await latestApprovals()).get(approvalId);
  if (!approval || approval.status !== 'pending') throw new Error('Aprovação indisponível.');
  if (!['approved', 'rejected'].includes(decision)) throw new Error('Decisão inválida.');
  const decided = { ...approval, status: decision, decided_by: actor, decided_at: now() };
  await append(decided);
  return decided;
}

export async function consumeApproval({ approvalId, action, projectId }) {
  const approval = (await latestApprovals()).get(approvalId);
  if (!approval || approval.status !== 'approved' || approval.action !== action || approval.project_id !== projectId) {
    throw new Error('Aprovação inválida para esta ação ou projeto.');
  }
  if (Date.parse(approval.valid_until) < Date.now()) throw new Error('Aprovação expirada.');
  const consumed = { ...approval, status: 'consumed', consumed_at: now() };
  await append(consumed);
  return consumed;
}
