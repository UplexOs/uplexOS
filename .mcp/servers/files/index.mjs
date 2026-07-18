import { PROJECTS, atomicWrite, hash, readFile, sandbox, startServer, tool, validId, walk } from '../../lib/core.mjs';
import { relative } from 'node:path';
const root=a=>sandbox(PROJECTS,validId(a.project_id,'project_id'));
const tools=[
 tool('files.list','Lista arquivos no sandbox do projeto.',['project.files.read'],{required:['project_id'],properties:{project_id:{type:'string'},path:{type:'string'}}},async a=>(await walk(sandbox(root(a),a.path??'.'),500)).map(p=>relative(root(a),p).replaceAll('\\','/'))),
 tool('files.read','Lê arquivo textual do projeto.',['project.files.read'],{required:['project_id','path'],properties:{project_id:{type:'string'},path:{type:'string'}}},async a=>{const p=sandbox(root(a),a.path),c=await readFile(p,'utf8');if(c.length>1_000_000)throw Error('Arquivo excede 1 MB');return{path:a.path,content:c,sha256:hash(c)}}),
 tool('files.write','Escreve arquivo atomicamente no projeto.',['project.files.write'],{required:['project_id','path','content'],properties:{project_id:{type:'string'},path:{type:'string'},content:{type:'string'},expected_sha256:{type:'string'}}},async a=>{const p=sandbox(root(a),a.path);let before=null;try{before=await readFile(p,'utf8')}catch{}if(a.expected_sha256&&hash(before??'')!==a.expected_sha256)throw Error('Conflito: hash esperado não corresponde');await atomicWrite(p,a.content);return{path:a.path,before_sha256:before===null?null:hash(before),sha256:hash(a.content)}},{readOnly:false,risk:'medium',evidence:['path','sha256']})
];startServer({name:'uplex-files-mcp',version:'1.0.0'},tools);
