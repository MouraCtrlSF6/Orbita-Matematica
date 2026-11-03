import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// Use the installed extension's exact parser and bundled TypeScript, without starting its language server.
function installedExtension() {
  const extensions = path.join(os.homedir(), '.vscode/extensions');
  const folder = fs
    .readdirSync(extensions)
    .filter((name) => name.startsWith('kisstkondoros.vscode-codemetrics-'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .at(-1);
  if (!folder)
    throw new Error('Instale a extensão VS Code CodeMetrics ou informe CODEMETRICS_EXTENSION.');
  return path.join(extensions, folder);
}
const extension = process.env.CODEMETRICS_EXTENSION || installedExtension();
const manifest = JSON.parse(fs.readFileSync(path.join(extension, 'package.json'), 'utf8'));
const bundleFile = path.join(extension, 'dist/server.js');
const bundle = fs.readFileSync(bundleFile, 'utf8');
const entry = bundle.indexOf('// src/', bundle.indexOf('// node_modules/tsmetrics-core'));
if (entry < 0) throw new Error('Formato do pacote CodeMetrics não reconhecido.');
const sandbox = {
  require,
  process,
  console,
  Buffer,
  setTimeout,
  clearTimeout,
  __filename: bundleFile,
  __dirname: path.dirname(bundleFile),
};
vm.createContext(sandbox);
vm.runInContext(
  bundle.slice(0, entry) +
    ';globalThis.core = { parser: require_MetricsParser().MetricsParser, config: require_MetricsConfiguration().MetricsConfiguration, ts: require_typescript() };',
  sandbox,
);
const { parser, config, ts } = sandbox.core;
const properties = manifest.contributes.configuration.properties;
function applySettings(settings) {
  for (const [key, value] of Object.entries(settings)) {
    if (/^codemetrics\.(nodeconfiguration|basics)\./.test(key))
      config[key.split('.').at(-1)] = value;
  }
}
applySettings(
  Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, value.default])),
);
for (const file of [
  path.join(process.env.APPDATA || '', 'Code/User/settings.json'),
  '.vscode/settings.json',
]) {
  if (fs.existsSync(file))
    applySettings(ts.parseConfigFileTextToJson(file, fs.readFileSync(file, 'utf8')).config || {});
}
const rows = [];
for (const file of fs
  .readdirSync('src', { recursive: true })
  .filter((name) => /\.(ts|tsx)$/.test(name) && !name.includes('.test.'))) {
  const fullPath = path.join('src', file);
  const root = parser.getMetrics(fullPath, config).metrics;
  function visit(node) {
    if (node.visible)
      rows.push({
        file: fullPath.replaceAll('\\', '/'),
        line: node.line,
        complexity: node.getCollectedComplexity(),
        function: node.text.split('\n')[0].trim(),
      });
    node.children.forEach(visit);
  }
  visit(root);
}
rows.sort((a, b) => b.complexity - a.complexity);
const report = {
  extension: manifest.version,
  limit: 7,
  units: rows.length,
  overLimit: rows.filter((row) => row.complexity > 7).length,
  maximum: rows[0]?.complexity || 0,
  results: rows,
};
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(
    `CodeMetrics ${report.extension}: ${report.units} unidades, ${report.overLimit} acima de 7, máximo ${report.maximum}.`,
  );
  console.table(rows.filter((row) => row.complexity > 7));
}

if (process.argv.includes('--check') && report.overLimit > 0) process.exitCode = 1;
