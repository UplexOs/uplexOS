import { access, readFile } from 'node:fs/promises';import { resolve } from 'node:path';
const root=process.cwd(), registry=JSON.parse(await readFile(resolve(root,'.mcp/registry.json'),'utf8'));const errors=[];
for(const server of registry.servers.filter(x=>x.enabled)){const path=resolve(root,server.args?.[0]??'');try{await access(path)}catch{errors.push(`${server.id}: servidor ausente ${server.args?.[0]}`)}}
for(const file of ['policies/scopes.json','policies/approvals.json','policies/data-classification.json','schemas/tool.schema.json'])try{JSON.parse(await readFile(resolve(root,'.mcp',file),'utf8'))}catch(e){errors.push(`${file}: ${e.message}`)}
console.log(`MCPs ativos: ${registry.servers.filter(x=>x.enabled).length}`);console.log(`Adaptadores desabilitados: ${registry.servers.filter(x=>!x.enabled).length}`);console.log(`Erros: ${errors.length}`);if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log('Registry MCP consistente.');
