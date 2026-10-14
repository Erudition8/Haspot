// Runs every strategy × economy in the Scenario lab and writes reports/scenario-report.md.
// Usage: node tools/scenario-report.mjs [runs=300] [months=36]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const src = html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1];
const E = vm.runInThisContext('(function () {' + src + '\n;return HaspotEngine;})', { filename: 'engine' })();

const runs = +process.argv[2] || 300, months = +process.argv[3] || 36;
const cells = [];
for (const st of E.STRATEGIES) for (const ec of E.ECONOMIES) {
  cells.push(E.labCell(st.id, ec.id, { runs, months }));
  process.stdout.write('.');
}
const summary = E.labSummarize(cells);
const rep = cells.find(c => c.strategy === summary.best && c.economy === 'normal');
const timeline = E.labTimeline(summary.best, 'normal', rep.representativeSeed, months);
const md = E.labMarkdown(cells, summary, timeline, { date: new Date().toISOString().slice(0, 10) });
mkdirSync(join(root, 'reports'), { recursive: true });
writeFileSync(join(root, 'reports', 'scenario-report.md'), md);
writeFileSync(join(root, 'reports', 'scenario-results.json'), JSON.stringify({ runs, months, cells: cells.map(c => ({ ...c, netMedianByMonth: undefined })), summary }, null, 2) + '\n');
console.log('\nBest strategy: ' + E.STRATEGIES.find(s => s.id === summary.best).name + ' → reports/scenario-report.md');
