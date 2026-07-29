import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { detectProjectStack } from '../../.mcp/lib/environment.mjs';
import { detectManager, loadPackage, runScript } from '../../.mcp/lib/testing.mjs';
import { startStaticRuntime } from '../runtime-manager/index.mjs';

async function write(root,path,content){const target=resolve(root,path);await mkdir(resolve(target,'..'),{recursive:true});await writeFile(target,content,'utf8');return path}
async function files(root){try{return await readdir(root)}catch{return[]}}
const result=(summary,evidence,extra={})=>({status:'completed',summary,evidence,decisions:extra.decisions??[],risks:extra.risks??[],limitations:extra.limitations??[]});

async function architecture(root,pack){
  const path=await write(root,'docs/architecture.md',`# Arquitetura\n\n## Objetivo\n\n${pack.request}\n\n## Estrutura\n\n- Interface web separada da camada de dados.\n- Supabase como backend quando solicitado.\n- Variáveis públicas e privadas separadas.\n- Qualidade e segurança como gates antes da execução.\n\n## Decisões\n\n- Operações remotas não são executadas automaticamente.\n- Evidências são mantidas dentro do projeto.\n`);
  return result('Arquitetura inicial definida.',[path],{decisions:['Separar interface, dados e validações'],risks:['Credenciais e ambiente remoto ainda precisam ser configurados']});
}
async function design(root,pack){
  const system={schema_version:'1.0',project_id:pack.project_id,principles:['clareza','acessibilidade','responsividade'],tokens:{color:{background:'#f7f7f2',foreground:'#161616',primary:'#14532d',border:'#d4d4cc'},space:{sm:'0.5rem',md:'1rem',lg:'2rem'},radius:{sm:'0.375rem',md:'0.75rem'}},typography:{body:'system-ui, sans-serif',mono:'ui-monospace, monospace'}};
  const json=await write(root,'design-system/system.json',`${JSON.stringify(system,null,2)}\n`);
  const md=await write(root,'design-system/MASTER.md','# Design System\n\nDireção visual clara, acessível e responsiva. Use os tokens em `system.json`.\n');
  return result('Design system mínimo criado.',[json,md]);
}
async function database(root,pack){
  const sql=await write(root,'supabase/migrations/0001_initial.sql',`-- Migration preparada localmente. Revise antes de aplicar remotamente.\ncreate table if not exists public.items (\n  id uuid primary key default gen_random_uuid(),\n  title text not null check (char_length(title) between 1 and 200),\n  created_at timestamptz not null default now()\n);\n\nalter table public.items enable row level security;\n`);
  const model=await write(root,'docs/data-model.md','# Modelo de dados\n\nTabela inicial `items`. A migration está preparada, mas não foi aplicada em ambiente remoto.\n');
  return result('Modelo de dados e migration local preparados.',[sql,model],{risks:['Políticas RLS específicas dependem do modelo de autenticação'],limitations:['Nenhuma migration remota foi executada']});
}
async function backend(root){
  const client=await write(root,'code/lib/supabase.ts',`export type SupabaseConfig = { url: string; anonKey: string };\n\nexport function getSupabaseConfig(env: Record<string, string | undefined>): SupabaseConfig {\n  const url = env.NEXT_PUBLIC_SUPABASE_URL;\n  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;\n  if (!url || !anonKey) throw new Error('Supabase environment is not configured');\n  return { url, anonKey };\n}\n`);
  const env=await write(root,'code/.env.example','NEXT_PUBLIC_SUPABASE_URL=\nNEXT_PUBLIC_SUPABASE_ANON_KEY=\n');
  return result('Integração Supabase local preparada.',[client,env],{limitations:['Cliente SDK não foi instalado automaticamente','Banco remoto não foi alterado']});
}
async function auth(root){
  const path=await write(root,'docs/authorization.md','# Autenticação e autorização\n\n- Autenticação deve usar o provedor configurado no projeto.\n- Políticas RLS devem usar `auth.uid()`.\n- Operações administrativas exigem autorização explícita no servidor.\n- Adicionar testes negativos antes da entrega.\n');
  return result('Modelo inicial de autorização documentado.',[path],{risks:['Implementação depende do provedor e requisitos confirmados']});
}
async function frontend(root,pack){
  const html=await write(root,'code/index.html',`<!doctype html>\n<html lang="pt-BR">\n<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>UplexOS Project</title></head>\n<body><main><h1>${pack.request.replace(/[<>&]/g,'')}</h1><p>Interface inicial pronta para integração.</p></main></body>\n</html>\n`);
  const css=await write(root,'code/styles.css',`:root{color:#161616;background:#f7f7f2;font-family:system-ui,sans-serif}body{margin:0}main{max-width:70rem;margin:auto;padding:clamp(1rem,4vw,4rem)}h1{font-size:clamp(2rem,6vw,5rem);line-height:1.05}*:focus-visible{outline:3px solid #14532d;outline-offset:3px}\n`);
  return result('Interface frontend inicial criada.',[html,css]);
}
async function quality(root){
  const pkg=await loadPackage(resolve(root,'code'))??await loadPackage(root);const rootUsed=await loadPackage(resolve(root,'code'))?resolve(root,'code'):root;
  const observed=await files(rootUsed),manager=detectManager(observed);const checks=[];
  for(const script of ['lint','typecheck','test','build']){
    if(!pkg?.scripts?.[script]){checks.push({script,status:'not_configured'});continue}
    checks.push(await runScript(rootUsed,manager,script,{timeoutMs:120000}));
  }
  const failed=checks.some(x=>x.status==='failed'||x.status==='blocked');
  const report={schema_version:'1.0',status:failed?'failed':'passed',checks,limitations:['Checks not configured were not executed.']};
  const path=await write(root,'reports/quality.json',`${JSON.stringify(report,null,2)}\n`);
  return failed?{status:'failed',summary:'Uma ou mais verificações de qualidade falharam.',evidence:[path],decisions:[],risks:[],limitations:report.limitations}:result('Qualidade verificada no escopo configurado.',[path],{limitations:report.limitations});
}
async function security(root){
  const stack=await detectProjectStack(root);const findings=[];
  const envFiles=(await files(resolve(root,'code'))).filter(x=>/^\.env/.test(x)&&x!=='.env.example');
  for(const file of envFiles)findings.push({severity:'high',confidence:'medium',category:'secret_exposure',location:`code/${file}`,status:'open'});
  const migration=await readFile(resolve(root,'supabase/migrations/0001_initial.sql'),'utf8').catch(()=>null);
  if(migration&&!/enable row level security/i.test(migration))findings.push({severity:'high',confidence:'high',category:'supabase_rls',location:'supabase/migrations/0001_initial.sql',status:'open'});
  const blocking=findings.some(x=>x.severity==='high'||x.severity==='critical');
  const report={schema_version:'1.0',decision:blocking?'fail':'pass',stack,findings,limitations:['Revisão local focal; scanners profissionais não foram executados por esta capacidade nativa.']};
  const path=await write(root,'reports/security.json',`${JSON.stringify(report,null,2)}\n`);
  return blocking?{status:'failed',summary:'Revisão de segurança encontrou risco bloqueante.',evidence:[path],decisions:[],risks:findings.map(x=>x.category),limitations:report.limitations}:result('Revisão de segurança focal concluída.',[path],{limitations:report.limitations});
}
async function runtime(root,pack){
  const runtimeState=await startStaticRuntime(pack.project_id,{root:'code'});
  const report={schema_version:'1.0',...runtimeState,limitations:runtimeState.status==='running'?[]:['O processo iniciou, mas o health check não foi aprovado.']};
  const path=await write(root,'reports/runtime.json',`${JSON.stringify(report,null,2)}\n`);
  return runtimeState.status==='running'?result(`Aplicação em execução em ${runtimeState.url}.`,[path],{limitations:[]}):{status:'blocked',summary:'Aplicação iniciada em estado degradado.',evidence:[path],decisions:[],risks:[],limitations:report.limitations};
}

export async function executeNativeCapability(payload,{cwd}){
  const id=payload.work_order.capability_id,pack=payload.context_pack;
  const handlers={'architecture.plan':architecture,'design.system':design,'database.model':database,'backend.supabase':backend,'auth.implement':auth,'frontend.implement':frontend,'quality.verify':quality,'security.review':security,'runtime.start':runtime};
  const handler=handlers[id];if(!handler)throw new Error(`Capacidade nativa não implementada: ${id}`);
  return handler(cwd,pack);
}
