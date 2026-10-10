import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const data = JSON.parse(html.match(/<script id="comparison-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const code = html.match(/<script id="report-code">([\s\S]*?)<\/script>/)[1];
new Script(code); // Compile the actual dashboard script to catch syntax errors.
const valueCode = code.match(/^    const value20 = .+$/m)[0];
const value20 = runInNewContext(valueCode + '\nvalue20');
const pareto = runInNewContext(valueCode + '\n' + code.match(/^    const dominates = .+$/m)[0] + '\n' + code.match(/^    const pareto = .+$/m)[0] + '\npareto');
const expected = [1338, 1010, 880, 662, 648, 586, 544, 340, 152, 110];
assert.deepEqual(data.slice(0,10).map(model => model.tasks20), expected);
assert.equal(new Set(data.map(model => model.id)).size, 33);
for (const model of data) {
  assert.ok(Number.isFinite(model.intelligence) && model.intelligence > 0);
  assert.ok(model.benchmarkCost > 0 && Number.isFinite(model.multiplier));
  assert.equal(Math.round(model.multiplier / model.benchmarkCost * 10) / 10 * 20, model.tasks20);
  if (data.indexOf(model) < 10) assert.ok(readme.includes(`| ${model.model} | ${model.reasoning} | ${model.intelligence} | ${model.multiplier}× | **${model.tasks20.toLocaleString('en-US')}** |`));
}
assert.equal(pareto(data.filter(model => model.intelligence >= 46)).map(model => model.id).join(','), 'sonnet-high,sol-medium,opus-medium,opus-high,opus-xhigh,opus-max');
assert.equal(data.filter(model => model.intelligence >= 46).length, 18);
assert.ok(data.filter(model => /Luna|Haiku/.test(model.model)).every(model => model.intelligence < 46));
assert.ok(!data.some(model => model.model.includes('Fable')));
assert.ok(html.includes('value="46" selected'));
assert.ok(!html.includes('Download original $20 graph'));
assert.equal(pareto(data.filter(model => model.provider === 'Cursor' && model.intelligence >= 46)).map(model => model.id).join(','), 'grok-high');
assert.equal(pareto([]).length, 0);
assert.equal(pareto([{intelligence:46,tasks20:100},{intelligence:46,tasks20:100}]).length, 2);
assert.equal(pareto([{intelligence:46,tasks20:100},{intelligence:46,tasks20:101}]).length, 1);
const chartY = runInNewContext(code.match(/^    const chartY = .+$/m)[0] + '\nchartY');
assert.equal(chartY(1,1000,1,true),458);
assert.equal(chartY(1000,1000,1,true),38);
assert.equal(chartY(0,1000,1,false),458);
for (const model of data) {
  const py = chartY(model.tasks20,70000,10,true);
  assert.ok(Number.isFinite(py) && py >= 38 && py <= 458);
}
assert.ok(html.includes('.chart-point[aria-pressed="true"] .chart-label'));
for (const model of data) {
  const bug = model.bugHunt;
  assert.ok(bug.fixed > 0 && bug.fixed <= 105 && bug.cost_usd > 0);
  assert.ok(bug.n_runs >= 1 && ['list','floor'].includes(bug.cost_kind));
  assert.equal(value20(model,'bugs'),model.multiplier * bug.fixed / bug.cost_usd * 20);
  assert.equal(value20(model,'tasks'),model.tasks20);
}
assert.equal(data.find(model => model.id === 'sol-medium').bugHunt.cost_usd,1.76);
assert.equal(data.find(model => model.id === 'sol-medium').bugHunt.fixed,29);
assert.equal(data.find(model => model.id === 'grok-xhigh').bugHunt.n_runs,5);
assert.equal(data.find(model => model.id === 'grok-xhigh').bugHunt.cost_kind,'floor');
assert.equal(value20({tasks20:10},'bugs'),null);
assert.equal(pareto(data.filter(model => model.intelligence >= 46),'bugs').map(model => model.id).join(','),'sol-medium,sol-high,opus-medium,opus-high,opus-xhigh,opus-max');
const solMedium = data.find(model => model.id === 'sol-medium');
assert.ok(Math.abs(value20(solMedium,'bugs') - 3493.181818181818) < 1e-10);
assert.ok(Math.abs(20 / value20(solMedium,'bugs') - 1.76 / (10.6 * 29)) < 1e-10);
assert.ok(html.includes('Bugs fixed / subscription $'));
console.log('Report checks passed: 33 configurations, original README values, default floor, rounding, script syntax, and Pareto dominance.');
