import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const data = JSON.parse(html.match(/<script id="comparison-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const code = html.match(/<script id="report-code">([\s\S]*?)<\/script>/)[1];
new Script(code); // Compile the actual dashboard script to catch syntax errors.
const valueCode = ['reliableBugs','bugWeights','bugScore','totalFixes','costPerBug','metricValue','rating'].map(name => code.match(new RegExp('^    const ' + name + ' = .+$','m'))[0]).join('\n');
const metricValue = runInNewContext(valueCode + '\nmetricValue',{models:data});
const pareto = runInNewContext(valueCode + '\n' + code.match(/^    const dominates = .+$/m)[0] + '\n' + code.match(/^    const pareto = .+$/m)[0] + '\npareto',{models:data});
const expected = [1338, 1010, 880, 662, 648, 586, 544, 340, 152, 110];
assert.deepEqual(data.slice(0,10).map(model => model.tasks20), expected);
assert.equal(new Set(data.map(model => model.id)).size, 38);
for (const model of data) {
  assert.ok(Number.isFinite(model.intelligence) && model.intelligence > 0);
  assert.ok(Number.isFinite(model.multiplier));
  if(model.tasks20 !== null) assert.ok(model.benchmarkCost > 0);
  if(model.tasks20 !== null) assert.equal(Math.round(model.multiplier / model.benchmarkCost * 10) / 10 * 20, model.tasks20);
}
assert.equal(pareto(data.filter(model => model.intelligence >= 46 && metricValue(model,'tasks') !== null)).map(model => model.id).join(','), 'sonnet-high,sol-medium,opus-medium,opus-high,opus-xhigh,opus-max');
assert.equal(data.filter(model => model.intelligence >= 46 && metricValue(model,'tasks') !== null).length, 23);
assert.ok(data.filter(model => /Luna|Haiku/.test(model.model)).every(model => model.intelligence < 46));
assert.equal(data.filter(model => model.model.includes('Fable')).length,5);
assert.ok(data.filter(model => /Fable|Astra/.test(model.model)).every(model => metricValue(model,'tasks') > 0));
assert.equal(data.filter(model => metricValue(model,'tasks') !== null).length,38);
assert.ok(data.filter(model => model.model.includes('Fable')).every(model => metricValue(model,'bugs') > 0));
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
  if(model.tasks20 === null) continue;
  const py = chartY(model.tasks20,70000,10,true);
  assert.ok(Number.isFinite(py) && py >= 38 && py <= 458);
}
assert.ok(html.includes('.chart-point[aria-pressed="true"] .chart-label'));
const reliableBugs = runInNewContext(valueCode + '\nreliableBugs',{models:data});
const weights = runInNewContext(valueCode + '\nbugWeights',{models:data});
const bugScore = runInNewContext(valueCode + '\nbugScore',{models:data});
for (const model of data) {
  const bug = model.bugHunt;
  assert.ok(bug.fixed > 0 && bug.fixed <= 105 && bug.cost_usd > 0);
  assert.ok(bug.n_runs >= 1 && ['list','floor'].includes(bug.cost_kind));
  const reliable = reliableBugs(model);
  assert.equal(metricValue(model,'bugs'),reliable === null ? null : bug.cost_usd / model.multiplier / (bug.fixed + bug.extras));
  assert.equal(metricValue(model,'tasks'),model.tasks20);
}
assert.equal(data.find(model => model.id === 'sol-medium').bugHunt.cost_usd,1.76);
assert.equal(data.find(model => model.id === 'sol-medium').bugHunt.fixed,29);
assert.equal(data.find(model => model.id === 'grok-xhigh').bugHunt.n_runs,5);
assert.equal(data.find(model => model.id === 'grok-xhigh').bugHunt.cost_kind,'floor');
assert.equal(metricValue({tasks20:10},'bugs'),null);
assert.equal(pareto(data.filter(model => model.intelligence >= 46 && metricValue(model,'bugs') !== null),'bugs').map(model => model.id).join(','),'sol-medium,sol-high,sol-xhigh,sol-max,astra-xhigh,fable-max');
const solMedium = data.find(model => model.id === 'sol-medium');
assert.equal(reliableBugs(solMedium).length,25);
assert.ok(Math.abs(metricValue(solMedium,'bugs') - 1.76 / (10.6 * (29 + 30.5))) < 1e-10);
assert.ok(html.includes('Subscription $ / bug fixed'));
assert.equal(data.filter(model => reliableBugs(model) === null).length,6);
assert.equal(Object.keys(weights).length,105);
for(const [id,weight] of Object.entries(weights)){
  const solvers = data.filter(model => reliableBugs(model)?.includes(id));
  assert.equal(weight,solvers.length ? Math.min(...solvers.map(model => model.intelligence)) : null);
}
assert.equal(reliableBugs({bugHunt:{n_runs:1,coverage_runs:1,bug_hits:{1:1}}}),null);
assert.equal(reliableBugs({bugHunt:{n_runs:3,coverage_runs:2,bug_hits:{1:2}}}),null);
assert.equal(reliableBugs({bugHunt:{n_runs:3,coverage_runs:3,bug_hits:{1:3,2:2}}}).join(','),'1');
assert.equal(bugScore({bugHunt:{n_runs:2,coverage_runs:2,bug_hits:{}}}),null);
console.log('Rated bugs:',Object.values(weights).filter(weight => weight !== null).length);
assert.equal(bugScore(solMedium),reliableBugs(solMedium).reduce((sum,id) => sum + weights[id],0));
const easy = Object.keys(weights).find(id => weights[id] === Math.min(...Object.values(weights).filter(weight => weight !== null)));
const hard = Object.keys(weights).find(id => weights[id] === Math.max(...Object.values(weights).filter(weight => weight !== null)));
assert.equal(bugScore({bugHunt:{n_runs:2,coverage_runs:2,bug_hits:{[easy]:2,[hard]:2}}}),weights[easy] + weights[hard]);
assert.ok(html.includes('data-sort="bugScore"'));
console.log('Report checks passed: 38 configurations, original task values, default floor, rounding, script syntax, reliable fix weights, and Pareto dominance.');

const dominates = runInNewContext(valueCode + '\n' + code.match(/^    const dominates = .+$/m)[0] + '\ndominates',{models:data});
const candidate = {intelligence:58,multiplier:10,bugHunt:{n_runs:2,coverage_runs:2,bug_hits:{[hard]:2},fixed:1,extras:1,cost_usd:1}};
assert.ok(dominates(candidate,{...candidate,bugHunt:{...candidate.bugHunt,cost_usd:2}},'bugs'));
assert.ok(!dominates({...candidate,bugHunt:{...candidate.bugHunt,cost_usd:2}},candidate,'bugs'));
assert.equal(pareto([candidate,{...candidate,bugHunt:{...candidate.bugHunt,cost_usd:2}}],'bugs').length,1);

assert.equal(chartY(.001,.1,.001,true,true),38);
assert.equal(chartY(.1,.1,.001,true,true),458);
assert.ok(chartY(.01,.1,.001,true,true) < chartY(.05,.1,.001,true,true));
assert.ok(!html.includes('id="scale"'));
assert.ok(html.includes('Higher bug-fix rating · lower subscription cost / bug'));
assert.ok(html.includes('Higher intelligence · more tasks / subscription $'));

const floorCode = ['bugFloors','defaultBugFloor'].map(name => code.match(new RegExp('^    const ' + name + ' = .+$','m'))[0]).join('\n');
const bugFloors = runInNewContext(valueCode + '\n' + floorCode + '\nbugFloors',{models:data});
const defaultBugFloor = runInNewContext(valueCode + '\n' + floorCode + '\ndefaultBugFloor',{models:data});
assert.equal(bugFloors.join(','),[...new Set(data.map(bugScore).filter(score => score !== null))].sort((a,b) => a-b).join(','));
assert.equal(defaultBugFloor,0);
assert.ok(data.filter(model => model.model === 'Claude Haiku 5.5' && bugScore(model) !== null).every(model => bugScore(model) >= defaultBugFloor));
assert.ok(code.includes('rating(model,controls.metric.value) >= Number(controls.floor.value)'));
console.log('Default bug floor:',defaultBugFloor,'rating options:',bugFloors.length);

assert.equal(reliableBugs({model:'GPT-6 Astra',bugHunt:{n_runs:1,coverage_runs:1,bug_hits:{1:1}}}).join(','),'1');
for(const model of data.filter(model => model.model === 'GPT-6 Astra')){
 assert.ok(reliableBugs(model).length > 0);
 if(model.bugHunt.n_runs === 1) assert.equal(reliableBugs(model).length,model.bugHunt.fixed);
}
assert.ok(data.filter(model => /Luna|Haiku/.test(model.model) && model.bugHunt.n_runs === 1).every(model => reliableBugs(model) === null));

for(const model of data) assert.ok(Number.isFinite(model.bugHunt.extras) && model.bugHunt.extras >= 0);
assert.equal(data.find(model=>model.id==='sol-medium').bugHunt.extras,30.5);
const costPerBug = runInNewContext(valueCode + '\ncostPerBug',{models:data});
assert.ok(costPerBug({...candidate,bugHunt:{...candidate.bugHunt,extras:3}}) < costPerBug(candidate));

assert.equal(reliableBugs({model:'Claude Fable 5.1',bugHunt:{n_runs:1,coverage_runs:1,bug_hits:{1:1}}}).join(','),'1');
assert.equal(data.filter(model => metricValue(model,'bugs') !== null).length,32);

assert.equal(data.filter(model => model.model === 'Claude Fable 5.1').map(model => model.tasks20).join(','),'498,396,302,196,154');
assert.ok(data.filter(model => model.model === 'Claude Fable 5.1').every(model => model.multiplier === 58.9));

for(const method of ['Tasks / subscription $ = multiplier / AA cost per task','Bug-fix rating = sum of weights of its qualifying planted fixes','source run cost / subscription multiplier / total fixes','Astra and Fable are explicit single-run exceptions']) assert.ok(readme.includes(method));
assert.ok(readme.includes('https://nishimura-katsuo.github.io/subscription-value/'));
