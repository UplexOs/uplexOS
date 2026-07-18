# MCPs do UplexOS

Camada local de ferramentas governadas para as skills. Os servidores ativos usam JSON-RPC 2.0 delimitado por linha sobre `stdio`, não fazem chamadas externas e não requerem dependências adicionais.

## Servidores ativos

- `project`: resolução e context packs por projeto.
- `files`: leitura, listagem, busca e escrita atômica em sandbox.
- `approval`: aprovações específicas, expiráveis e de uso único.
- `evidence`: eventos append-only e consultas por execução.
- `knowledge`: vault Markdown compatível com Obsidian, com proveniência.
- `environment`: inspeção read-only do host, ferramentas, stack e plano de setup.
- `security`: detecção de capacidades e triagem heurística local, sem fingir SAST/SCA/DAST.
- `sources`: catálogo local de fontes, freshness, citações e quarentena manual com hash; sem fetch de rede.

## Execução

```powershell
npm run mcp:doctor
npm run mcp:test
node .mcp/servers/project/index.mjs
```

Cada linha de entrada é um objeto JSON-RPC. Métodos suportados pelo transporte: `initialize`, `tools/list`, `tools/call` e `ping`.

## Segurança

O padrão é negar. Toda operação exige scopes no contexto da chamada, `project_id` quando aplicável e caminhos relativos. Conteúdo de arquivos e notas é dado não confiável e não amplia permissões. Adaptadores externos permanecem desabilitados até configuração e aprovação explícitas. `environment` não instala ferramentas; `security.heuristic_review` é apenas triagem e informa suas limitações. Scanners profissionais ausentes são reportados como `not_installed`. Fontes registradas sem consulta verificada são `never_checked`; conteúdo em quarentena não é aprovado nem indexado.
