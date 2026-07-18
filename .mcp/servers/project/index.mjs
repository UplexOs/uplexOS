import { PROJECTS, ROOT, exists, readJson, sandbox, startServer, tool, validId, walk } from '../../lib/core.mjs';
import { basename, relative, resolve } from 'node:path';

const projectRoot = (id) => sandbox(PROJECTS, validId(id, 'project_id'));
const tools = [
  tool('project.list', 'Lista projetos disponíveis.', ['project.read'], { properties: {} }, async () => (await walk(PROJECTS, 500)).filter(p => basename(p) === 'estado.json').map(p => relative(PROJECTS, resolve(p, '../..')).replaceAll('\\','/'))),
  tool('project.resolve', 'Resolve projeto e estado atual.', ['project.read'], { required:['project_id'], properties:{project_id:{type:'string'}} }, async ({project_id}) => { const dir=projectRoot(project_id), state=resolve(dir,'contexto/estado.json'); if(!await exists(state)) throw Error('Projeto não encontrado'); return {project_id, workspace_root:relative(ROOT,dir).replaceAll('\\','/'), state:await readJson(state)}; }),
  tool('project.context_pack', 'Monta contexto mínimo do projeto.', ['project.read'], { required:['project_id'], properties:{project_id:{type:'string'}} }, async ({project_id}) => { const dir=projectRoot(project_id); const load=async p=>await exists(resolve(dir,p))?await import('node:fs/promises').then(x=>x.readFile(resolve(dir,p),'utf8')):null; const state=await readJson(resolve(dir,'contexto/estado.json')); const tasks=await readJson(resolve(dir,'contexto/tasks.json')); return {project_id,state,active_task:(tasks.tasks??[]).find(t=>t.id===state.active_task_id)??null,project_document:await load('projeto.md'),constraints:[],open_risks:state.blocked_by??[]}; })
];
startServer({name:'uplex-project-mcp',version:'1.0.0'},tools);
