import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const data = JSON.parse(html.match(/<script id="comparison-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const code = html.match(/<script id="report-code">([\s\S]*?)<\/script>/)[1];
new Script(code); // Compile the actual dashboard script to catch syntax errors.
const pareto = runInNewContext(code.match(/^    const dominates = .+$/m)[0] + '\n' + code.match(/^    const pareto = .+$/m)[0] + '\npareto');
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
console.log('Report checks passed: 33 configurations, original README values, default floor, rounding, script syntax, and Pareto dominance.');
