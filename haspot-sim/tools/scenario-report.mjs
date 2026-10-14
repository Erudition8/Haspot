// Runs every strategy × economy in the Scenario lab and writes the reports:
//   reports/scenario-report.md        overview: ranking, heat table, short report per economy
//   reports/best-plan.md              the recommended plan: roadmap, checkpoints, switch rules
//   reports/scenarios/NN-<id>.md      one detailed report per economy
//   reports/scenario-results.json     the raw numbers
// Usage: node tools/scenario-report.mjs [runs=300] [months=36]
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const src = html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1];
const E = vm.runInThisContext('(function () {' + src + '\n;return HaspotEngine;})', { filename: 'engine' })();

const runs = +process.argv[2] || 300, months = +process.argv[3] || 36;
const meta = { date: new Date().toISOString().slice(0, 10) };
const t0 = Date.now();
const cells = [];
for (const st of E.STRATEGIES) for (const ec of E.ECONOMIES) {
  cells.push(E.labCell(st.id, ec.id, { runs, months }));
  process.stdout.write('.');
}
const summary = E.labSummarize(cells);
const typical = (st, ec) => E.labTimeline(st, ec, cells.find(c => c.strategy === st && c.economy === ec).representativeSeed, months);
const planTimeline = typical(summary.best, 'normal');

const out = join(root, 'reports');
rmSync(join(out, 'scenarios'), { recursive: true, force: true });
mkdirSync(join(out, 'scenarios'), { recursive: true });
writeFileSync(join(out, 'scenario-report.md'), E.labMarkdown(cells, summary, planTimeline, meta));
writeFileSync(join(out, 'best-plan.md'), E.labPlanMarkdown(cells, summary, planTimeline, meta));
E.ECONOMIES.forEach((ec, i) => {
  const top = summary.byEconomy[ec.id][0];
  const file = String(i + 1).padStart(2, '0') + '-' + ec.id + '.md';
  writeFileSync(join(out, 'scenarios', file), E.labEconomyMarkdown(ec.id, cells, summary, typical(top.strategy, ec.id), meta));
});
const slim = cells.map(({ netMedianByMonth, cashMedianByMonth, screensMedianByMonth, soldMedianByMonth, ...c }) => c);
writeFileSync(join(out, 'scenario-results.json'), JSON.stringify({ runs, months, generated: meta.date, cells: slim, summary }, null, 2) + '\n');

const name = id => E.STRATEGIES.find(s => s.id === id).name;
console.log(`\n${cells.length} scenarios in ${((Date.now() - t0) / 1000).toFixed(1)} s. Best plan: ${name(summary.best)}`);
for (const ec of E.ECONOMIES) console.log(`  ${ec.name.padEnd(26)} best: ${name(summary.byEconomy[ec.id][0].strategy)}`);
