let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', async () => {
  const payload = JSON.parse(input);
  const { writeFile, mkdir } = await import('node:fs/promises');
  const { dirname, resolve } = await import('node:path');
  const evidence = `docs/${payload.work_order.capability_id.replaceAll('.', '-')}.md`;
  const target = resolve(process.cwd(), evidence);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `# ${payload.work_order.capability_id}\n`, 'utf8');
  process.stdout.write(JSON.stringify({
    status: 'completed', summary: 'Etapa executada pelo adaptador de teste', evidence: [evidence],
    decisions: ['resultado estruturado'], risks: [], limitations: []
  }));
});
