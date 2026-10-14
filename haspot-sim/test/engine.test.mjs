// Runs the Haspot Sim engine fixtures (plan section 9) in Node 18+, no packages.
// Usage: node test/engine.test.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, '..', 'index.html'), 'utf8');
const m = html.match(/<script id="engine">([\s\S]*?)<\/script>/);
if (!m) { console.error('Could not find <script id="engine"> in index.html'); process.exit(1); }
// runInThisContext: same speed as a browser (a separate vm context slows every global lookup).
// The engine is wrapped in a function so it cannot touch anything but its own scope.
const E = vm.runInThisContext('(function () {' + m[1] + '\n;return HaspotEngine;})', { filename: 'engine' })();
if (typeof window !== 'undefined' || typeof document !== 'undefined') throw new Error('engine must not need a DOM');

const tests = [];
const test = (name, fn) => tests.push({ name, fn });
const row = (s, month) => s.ledger.find(r => r.month === month);
const firstLakh = s => (s.ledger.find(r => r.profit >= 100000) || {}).month;
const plan = (over) => E.merge(E.presetParams('P1'), over || {});
const screens = r => r.screens_ph + r.screens_ki;

// ---------- 9.1 plan mode ----------
const P = E.presetParams('P1');
const Pe = E.effective(P);

test('9.1 per-screen margin at 8 slots × ₹500 = 2,597', () => {
  assert.equal(Math.round(E.perScreenMargin(Pe, 8)), 2597);
  assert.equal(Math.round(8 * 500 * Pe.feeRate), 141);
  assert.equal(E.opexPerScreen(Pe), 1262);
});
test('9.1 kit cost = 13,650', () => assert.equal(E.kitCost(Pe, 'androidTV'), 13650));
test('9.1 screens for ₹1 lakh at 8 / 6.5 / 5 slots = 42 / 58 / 94', () => {
  assert.deepEqual([8, 6.5, 5].map(k => E.screensFor(Pe, 100000, k)), [42, 58, 94]);
});
test('9.1 payback at 8 / 6.5 / 5 slots = 5.3 / 7.3 / 11.9 months', () => {
  assert.deepEqual([8, 6.5, 5].map(k => Math.round(E.paybackMonths(Pe, k) * 10) / 10), [5.3, 7.3, 11.9]);
});
test('9.1 start cash = −1,17,800', () => {
  const s = E.newGame(P, { seed: 1 });
  assert.equal(Math.round(s.cash), -117800);
  assert.equal(s.screens.length, 10);
  assert.equal(s.advertisers.filter(a => a.kind === 'founding').length, 5);
});

const s1 = E.runScenario(P, 40, { seed: 1 });
const expect = { 1: [10, -13796, -91596], 7: [20, 10321, 40065], 9: [31, 27974, 24231], 17: [42, 99869, 415421], 18: [42, 102466, 517887] };
for (const [mo, [sc, pr, ca]] of Object.entries(expect)) {
  test(`9.1 month ${mo}: screens ${sc}, profit ${pr}, cash ${ca}`, () => {
    const r = row(s1, +mo);
    assert.deepEqual([screens(r), r.profit, r.cash], [sc, pr, ca]);
  });
}
test('9.1 first month with profit ≥ ₹1 lakh = 18', () => assert.equal(firstLakh(s1), 18));
test('9.1 same rules, 2 new advertisers a month → month 15', () => {
  assert.equal(firstLakh(E.runScenario(plan({ demand: { fixedArrivals: 2 } }), 40)), 15);
});
test('9.1 same rules, no salary top-ups → month 34', () => {
  assert.equal(firstLakh(E.runScenario(plan({ growth: { salaryTopup: 0 } }), 60)), 34);
});

// ---------- 9.2 sales-model comparison, through the real tick ----------
function steady(openSold, anchorSlots) {
  const p = E.makeParams({
    mode: 'stochastic',
    events: { tvFailMonthly: 0, hotspotFailMonthly: 0, unplugMonthly: 0, powerCutDaysMonthly: 0, restartFailProb: 0, hostQuitMonthly: 0, adRuleBreach: 0 },
    demand: { fixedArrivals: 0, churnMonthly: 0 },
    opex: { licenceY2: 257, freeLicences: 0 },
    growth: { autoExpand: false, salaryTopup: 0 },
    start: { setup: 'empty', creditInterestMonthly: 0 },
    anchors: { enabled: anchorSlots > 0, pitchSuccess: 1, maxSlotsPerClient: 5 }
  });
  const s = E.newGame(p, { seed: 3 });
  for (const type of ['pharmacy', 'kirana']) {
    const shops = s.shops.filter(x => x.type === type).slice(0, 21);
    for (const sh of shops) { sh.state = 'host'; s.cash += 1e6; E.installScreen(s, sh.id); }
  }
  for (const net of ['ph']) {
    for (let i = 0; i < openSold; i++) s.advertisers.push({ id: 'x' + i, network: net, kind: 'list', slots: 1, rate: 500, startMonth: 1, category: 'retail' });
  }
  // Model "N slots sold" across 42 screens: put the same advertisers on both networks.
  for (let i = 0; i < openSold; i++) s.advertisers.push({ id: 'y' + i, network: 'ki', kind: 'list', slots: 1, rate: 500, startMonth: 1, category: 'retail' });
  for (const net of ['ph', 'ki']) for (let i = 0; i < anchorSlots; i++) {
    s.advertisers.push({ id: 'an' + net + i, kind: 'anchor', network: net, name: 'A' + i, category: 'c' + i, slots: 1, rate: 450,
      startMonth: 1, termMonths: 12, endMonth: 12, billing: 'quarterly', exclusive: false, seasonal: false, nextBillMonth: 1 });
  }
  return E.tick(s).profit;
}
test('9.2 all monthly, 8 of 10 sold → 1,02,466', () => assert.equal(steady(8, 0), 102466));
test('9.2 all monthly, 3 of 10 sold → 1,172', () => assert.equal(steady(3, 0), 1172));
test('9.2 5 anchors at ₹450 + 3 open sold → 95,672', () => assert.equal(steady(3, 5), 95672));
test('9.2 5 anchors at ₹450 + 0 open sold → 34,896', () => assert.equal(steady(0, 5), 34896));
test('9.2 steadyNet helper agrees', () => {
  assert.deepEqual([[8, 0], [3, 0], [3, 5], [0, 5]].map(([o, a]) => Math.round(E.steadyNet(Pe, 42, o, a))), [102466, 1172, 95672, 34896]);
});

// ---------- 9.3 engine properties ----------
test('9.3 same seed + same params → identical ledger', () => {
  const p = E.presetParams('P2');
  const a = E.runScenario(p, 36, { seed: 42 }), b = E.runScenario(p, 36, { seed: 42 });
  assert.deepEqual(a.ledger, b.ledger);
  const c = E.runScenario(p, 36, { seed: 43 });
  assert.notDeepEqual(a.ledger, c.ledger);
});
test('9.3 stochastic with zero events and fixed arrivals equals plan mode', () => {
  const p = E.makeParams({
    mode: 'stochastic',
    events: { tvFailMonthly: 0, hotspotFailMonthly: 0, unplugMonthly: 0, powerCutDaysMonthly: 0, restartFailProb: 0, hostQuitMonthly: 0, adRuleBreach: 0 },
    demand: { fixedArrivals: 1, targetSold: 8, churnMonthly: 0, halfShare: 0 },
    opex: { licenceY2: 257, freeLicences: 0 },
    start: { money: 0, creditLimit: 1e15, creditInterestMonthly: 0 }
  });
  const st = E.runScenario(p, 36, { seed: 99 });
  const strip = l => l.map(r => ({ ...r }));
  assert.deepEqual(strip(st.ledger), strip(E.runScenario(P, 36, { seed: 5 }).ledger));
});
test('9.3 cash never below −creditLimit without the insolvent flag', () => {
  for (const id of ['P2', 'P4', 'P5', 'P8']) for (let seed = 1; seed <= 30; seed++) {
    const p = E.merge(E.presetParams(id), { start: { creditLimit: 20000, money: 60000 } });
    const s = E.runScenario(p, 36, { seed });
    for (const r of s.ledger) if (r.cash < -s.creditLimit) assert.ok(s.insolvent && s.insolvent.month === r.month, `${id} seed ${seed} month ${r.month}`);
  }
  const broke = E.runScenario(E.merge(E.presetParams('P8'), { start: { money: 0, creditLimit: 10000 } }), 36, { seed: 1 });
  assert.ok(broke.insolvent, 'an underfunded game goes insolvent');
  assert.ok(broke.insolvent.cause.length > 10);
});
test('9.3 revenue is 0 for a network with 0 live screens', () => {
  const p = E.makeParams({ start: { setup: 'empty', money: 1e6 }, growth: { autoExpand: false } });
  const s = E.newGame(p, { seed: 1 });
  s.advertisers.push({ id: 'z', network: 'ki', kind: 'list', slots: 1, rate: 500, startMonth: 1, category: 'retail' });
  const r = E.tick(s);
  assert.equal(r.revenue, 0);
});
test('9.3 exclusivity: a second anchor in the same category and network is rejected', () => {
  const p = E.makeParams({ anchors: { enabled: true, pitchSuccess: 1 }, growth: { autoExpand: false } });
  const s = E.newGame(p, { seed: 1 });
  s.institutions.forEach(i => { i.budgetMonthly = 1e6; });
  const schools = s.institutions.filter(i => i.category === 'school');
  const other = s.institutions.find(i => i.category === 'school' && i !== schools[0]) ||
    (() => { const c = { ...schools[0], id: 'iX', name: 'Second School' }; s.institutions.push(c); return c; })();
  const a = E.pitchAnchor(s, schools[0].id, { network: 'ph', slots: 1, exclusive: true });
  assert.equal(a.ok, true, a.reason);
  const b = E.pitchAnchor(s, other.id, { network: 'ph', slots: 1, exclusive: false });
  assert.equal(b.ok, false);
  assert.match(b.reason, /Exclusivity/);
  const hosp = s.institutions.find(i => i.category === 'hospital');
  assert.equal(E.pitchAnchor(s, hosp.id, { network: 'ph', slots: 1 }).ok, true, 'other categories still allowed');
  assert.equal(E.pitchAnchor(s, schools[0].id, { network: 'ph', slots: 3 }).ok, false, 'concentration cap');
});
test('9.3 500-run Monte Carlo of P1: P(₹1 lakh by month 18) = 1.0', () => {
  const t = Date.now();
  const mc = E.monteCarlo(P, { runs: 500, months: 36 });
  assert.equal(mc.pLakhBy18, 1);
  assert.equal(mc.medianMonthToLakh, 18);
  assert.ok(Date.now() - t < 3000, 'took ' + (Date.now() - t) + ' ms');
});

// ---------- extras ----------
test('Monte Carlo of P2: 500 × 36 months in under 3 s', () => {
  const t = Date.now();
  const mc = E.monteCarlo(E.presetParams('P2'), { runs: 500, months: 36 });
  const ms = Date.now() - t;
  assert.ok(ms < 3000, 'took ' + ms + ' ms');
  assert.ok(mc.pLakhBy24 >= 0 && mc.pLakhBy24 <= 1);
  assert.equal(mc.fan.length, 36);
});
test('every preset runs 36 months without throwing', () => {
  for (const pr of E.PRESETS) E.runScenario(E.presetParams(pr.id), 36, { seed: pr.seed });
});
test('anchor billing: quarterly cash in advance less TDS, revenue recognised monthly; TDS back in month 15', () => {
  const s = E.runScenario(E.presetParams('P3'), 30, { seed: 2 });
  assert.ok(s.ledger.some(r => r.anchors_active > 0), 'anchors signed');
});
test('CSV export re-imports to the same ledger', () => {
  const s = E.runScenario(E.presetParams('P2'), 24, { seed: 7 });
  assert.deepEqual(JSON.parse(JSON.stringify(E.csvToLedger(E.ledgerToCSV(s.ledger)))), JSON.parse(JSON.stringify(s.ledger)));
  assert.equal(E.ledgerToCSV(s.ledger).split('\n')[0], E.LEDGER_COLUMNS.join(','));
});
test('JSON save/load continues identically', () => {
  const p = E.presetParams('P2');
  const a = E.runScenario(p, 12, { seed: 11 });
  const b = E.importState(E.exportState(a));
  E.runTo(a, 30); E.runTo(b, 30);
  assert.deepEqual(a.ledger, b.ledger);
});
test('classic preset: flat ₹7,000 revenue and ₹5,000 expense per screen', () => {
  const s = E.newGame(E.presetParams('P0'), { seed: 1 });
  const shop = s.shops.find(x => x.type === 'pharmacy');
  shop.state = 'host';
  assert.equal(E.installScreen(s, shop.id).ok, true);
  const p0 = E.presetParams('P0');
  p0.events = E.makeParams({ events: { tvFailMonthly: 0, hotspotFailMonthly: 0, unplugMonthly: 0, powerCutDaysMonthly: 0, hostQuitMonthly: 0, adRuleBreach: 0 } }).events;
  s.params = p0;
  E.tick(s); const r = E.tick(s);
  assert.equal(r.revenue, 7000); assert.equal(r.profit, 2000);
});
test('Pi player costs ₹7,091 more', () => {
  assert.equal(E.kitCost(Pe, 'pi') - E.kitCost(Pe, 'androidTV'), 7091);
});
test('scenario lab: every strategy × economy runs, ranks and explains', () => {
  const cells = [];
  for (const st of E.STRATEGIES) for (const ec of E.ECONOMIES) cells.push(E.labCell(st.id, ec.id, { runs: 20, months: 24 }));
  assert.equal(cells.length, E.STRATEGIES.length * E.ECONOMIES.length);
  const sum = E.labSummarize(cells);
  assert.ok(E.STRATEGIES.some(s => s.id === sum.best));
  assert.equal(sum.overall.length, E.STRATEGIES.length);
  for (const ec of E.ECONOMIES) assert.equal(sum.byEconomy[ec.id].length, E.STRATEGIES.length);
  const tl = E.labTimeline(sum.best, 'normal', 1, 24);
  assert.ok(tl.steps.length > 0);
  const md = E.labMarkdown(cells, sum, tl, {});
  for (const ec of E.ECONOMIES) assert.ok(md.includes('Scenario report: ' + ec.name));
  assert.ok(md.includes('Recommended plan'));
});
test('scenario lab: monthly strategy in a normal economy is the Base preset', () => {
  const a = E.monteCarlo(E.labParams('monthly', 'normal'), { runs: 30 }), b = E.monteCarlo(E.presetParams('P2'), { runs: 30 });
  assert.equal(a.pLakhBy24, b.pLakhBy24);
});
test('calendar: month 7 is Apr 2027', () => assert.equal(E.calendarLabel(P, 7), 'Apr 2027'));

// ---------- run ----------
let pass = 0, fail = 0;
for (const t of tests) {
  try { await t.fn(); pass++; console.log('  ok   ' + t.name); }
  catch (e) { fail++; console.log('  FAIL ' + t.name + '\n       ' + (e && e.message || e).split('\n').join('\n       ')); }
}
console.log(`\n${pass} passed, ${fail} failed, ${tests.length} tests`);
process.exit(fail ? 1 : 0);
