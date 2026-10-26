import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const data = JSON.parse(html.match(/<script id="comparison-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const code = html.match(/<script id="report-code">([\s\S]*?)<\/script>/)[1];
new Script(code); // Compile the actual dashboard script to catch syntax errors.
const valueCode = ['resetCostFactor','effectiveMultiplier','reliableBugs','bugWeights','bugScore','totalFixes','costPerBug','metricValue','rating'].map(name => code.match(new RegExp('^    const ' + name + ' = .+$','m'))[0]).join('\n');
const metricValue = runInNewContext(valueCode + '\nmetricValue',{models:data,controls:{'early-resets':{checked:false}}});
const pareto = runInNewContext(valueCode + '\n' + code.match(/^    const dominates = .+$/m)[0] + '\n' + code.match(/^    const pareto = .+$/m)[0] + '\npareto',{models:data,controls:{'early-resets':{checked:false}}});
const expected = [1338, 1010, 880, 662, 648, 586, 544, 340, 152, 110];
assert.deepEqual(data.slice(0,10).map(model => model.tasks20), expected);
assert.equal(new Set(data.map(model => model.id)).size, 70);
const matchesSearch = runInNewContext(code.match(/^    const matchesSearch = .+$/m)[0] + '\nmatchesSearch');
for(const model of data){
  const expectedCountry = /^(DeepSeek |GLM-|Kimi |MiMo-|MiniMax |Qwen|Step )/.test(model.model) ? 'China' : 'United States';
  assert.equal(model.country,expectedCountry);
  assert.ok(matchesSearch(model,model.provider.toLowerCase()));
  assert.equal(matchesSearch(model,'china'),expectedCountry === 'China');
  for(const alias of ['us','usa','united states']) assert.equal(matchesSearch(model,alias),expectedCountry === 'United States');
}
assert.ok(data.some(model => model.provider === 'OpenCode Go' && model.country === 'China'));
assert.ok(matchesSearch({model:'Mistral Large',reasoning:'Default',country:'France'},'france'));
assert.ok(!matchesSearch({model:'Mistral Large',reasoning:'Default',country:'France'},'us'));
assert.ok(!html.includes('id="provider"') && !code.includes('controls.provider'));
// Bug Hunt-only efforts have no AA score or task cost and appear in bugs mode only.
const bugsOnly = data.filter(model => model.intelligence === null);
assert.equal(bugsOnly.map(model => model.id).join(','),'grok-medium,muse-standard-low,muse-standard-medium,muse-standard-high,muse-contributor-low,muse-contributor-medium,muse-contributor-high');
assert.ok(bugsOnly.every(model => model.tasks20 === null && model.benchmarkCost === null && model.bugHunt.n_runs === 3 && model.bugHunt.coverage_runs === 3));
for (const model of data) {
  assert.ok(model.intelligence === null || (Number.isFinite(model.intelligence) && model.intelligence > 0));
  assert.ok(Number.isFinite(model.multiplier));
  if(model.tasks20 !== null) assert.ok(model.benchmarkCost > 0);
  if(model.tasks20 !== null) assert.equal(Math.round(model.multiplier / model.benchmarkCost * 10) / 10 * 20, model.tasks20);
}
assert.equal(pareto(data.filter(model => model.intelligence >= 46 && metricValue(model,'tasks') !== null)).map(model => model.id).join(','), 'muse-contributor-max,opus-medium,opus-high,opus-xhigh,opus-max');
assert.equal(data.filter(model => model.intelligence >= 46 && metricValue(model,'tasks') !== null).length, 30);
assert.ok(data.filter(model => /Luna|Haiku/.test(model.model)).every(model => model.intelligence < 46));
assert.equal(data.filter(model => model.model.includes('Fable')).length,5);
assert.ok(data.filter(model => /Fable|Astra/.test(model.model)).every(model => metricValue(model,'tasks') > 0));
assert.equal(data.filter(model => metricValue(model,'tasks') !== null).length,63);
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
  const py = chartY(model.tasks20,70000,1,true);
  assert.ok(Number.isFinite(py) && py >= 38 && py <= 458);
}
assert.ok(html.includes('.chart-point[aria-pressed="true"] .chart-label'));
const reliableBugs = runInNewContext(valueCode + '\nreliableBugs',{models:data,controls:{'early-resets':{checked:false}}});
const weights = runInNewContext(valueCode + '\nbugWeights',{models:data,controls:{'early-resets':{checked:false}}});
const bugScore = runInNewContext(valueCode + '\nbugScore',{models:data,controls:{'early-resets':{checked:false}}});
for (const model of data) {
  const bug = model.bugHunt;
  if (!bug) {
    assert.ok(['sol-5-6-low','kimi-k3-low','go-minimax-m3-1-flash','go-step-5-preview','go-qwen3-8-max-0902','terra-low','terra-medium'].includes(model.id));
    assert.equal(metricValue(model,'bugs'),null);
    continue;
  }
  assert.ok(bug.fixed > 0 && bug.fixed <= 105 && bug.cost_usd > 0);
  assert.ok(bug.n_runs >= 1 && ['list','floor','bill'].includes(bug.cost_kind));
  const reliable = reliableBugs(model);
  assert.equal(metricValue(model,'bugs'),reliable === null ? null : bug.cost_usd * (bug.price_factor ?? 1) / model.multiplier / (bug.fixed + bug.extras));
  assert.equal(metricValue(model,'tasks'),model.tasks20);
}
assert.equal(data.find(model => model.id === 'sol-medium').bugHunt.cost_usd,1.76);
assert.equal(data.find(model => model.id === 'sol-medium').bugHunt.fixed,29);
assert.equal(data.find(model => model.id === 'grok-xhigh').bugHunt.n_runs,5);
assert.equal(data.find(model => model.id === 'grok-xhigh').bugHunt.cost_kind,'floor');
assert.equal(metricValue({tasks20:10},'bugs'),null);
assert.equal(pareto(data.filter(model => model.intelligence >= 46 && metricValue(model,'bugs') !== null),'bugs').map(model => model.id).join(','),'muse-contributor-max,sol-medium,sol-high,sol-xhigh,sol-max,astra-xhigh,fable-max');
const solMedium = data.find(model => model.id === 'sol-medium');
assert.equal(reliableBugs(solMedium).length,25);
assert.ok(Math.abs(metricValue(solMedium,'bugs') - 1.76 / (10.6 * (29 + 30.5))) < 1e-10);
assert.ok(html.includes('Subscription $ / bug fixed'));
assert.equal(data.filter(model => reliableBugs(model) === null).length,7);
assert.equal(Object.keys(weights).length,105);
for(const [id,weight] of Object.entries(weights)){
  const solvers = data.filter(model => model.intelligence !== null && reliableBugs(model)?.includes(id));
  assert.equal(weight,solvers.length ? Math.min(...solvers.map(model => model.intelligence)) : null);
}
assert.equal(reliableBugs({model:'Any model',bugHunt:{n_runs:1,coverage_runs:1,bug_hits:{1:1}}}).join(','),'1');
assert.equal(reliableBugs({bugHunt:{n_runs:1,coverage_runs:0,bug_hits:{}}}),null);
assert.equal(reliableBugs({bugHunt:{n_runs:3,coverage_runs:2,bug_hits:{1:2}}}),null);
assert.equal(reliableBugs({bugHunt:{n_runs:3,coverage_runs:3,bug_hits:{1:3,2:2}}}).join(','),'1');
assert.equal(bugScore({bugHunt:{n_runs:2,coverage_runs:2,bug_hits:{}}}),null);
console.log('Rated bugs:',Object.values(weights).filter(weight => weight !== null).length);
assert.equal(bugScore(solMedium),reliableBugs(solMedium).reduce((sum,id) => sum + weights[id],0));
const easy = Object.keys(weights).find(id => weights[id] === Math.min(...Object.values(weights).filter(weight => weight !== null)));
const hard = Object.keys(weights).find(id => weights[id] === Math.max(...Object.values(weights).filter(weight => weight !== null)));
assert.equal(bugScore({bugHunt:{n_runs:2,coverage_runs:2,bug_hits:{[easy]:2,[hard]:2}}}),weights[easy] + weights[hard]);
assert.ok(html.includes('data-sort="bugScore"'));
console.log('Report checks passed: 70 configurations, original task values, default floor, rounding, script syntax, reliable fix weights, and Pareto dominance.');

const dominates = runInNewContext(valueCode + '\n' + code.match(/^    const dominates = .+$/m)[0] + '\ndominates',{models:data,controls:{'early-resets':{checked:false}}});
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
const bugFloors = runInNewContext(valueCode + '\n' + floorCode + '\nbugFloors',{models:data,controls:{'early-resets':{checked:false}}});
const defaultBugFloor = runInNewContext(valueCode + '\n' + floorCode + '\ndefaultBugFloor',{models:data,controls:{'early-resets':{checked:false}}});
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
const newlyAdmitted = data.filter(model => /Luna|Haiku/.test(model.model) && model.bugHunt.n_runs === 1);
assert.equal(newlyAdmitted.length,6);
assert.ok(newlyAdmitted.every(model => model.bugHunt.coverage_runs === 1 && reliableBugs(model).length === model.bugHunt.fixed));

for(const model of data.filter(model => model.bugHunt)) assert.ok(Number.isFinite(model.bugHunt.extras) && model.bugHunt.extras >= 0);
assert.equal(data.find(model=>model.id==='sol-medium').bugHunt.extras,30.5);
const costPerBug = runInNewContext(valueCode + '\ncostPerBug',{models:data,controls:{'early-resets':{checked:false}}});
assert.ok(costPerBug({...candidate,bugHunt:{...candidate.bugHunt,extras:3}}) < costPerBug(candidate));

assert.equal(reliableBugs({model:'Claude Fable 5.1',bugHunt:{n_runs:1,coverage_runs:1,bug_hits:{1:1}}}).join(','),'1');
assert.equal(data.filter(model => metricValue(model,'bugs') !== null).length,63);

assert.equal(data.filter(model => model.model === 'Claude Fable 5.1').map(model => model.tasks20).join(','),'210,166,126,82,66');
assert.equal(data.filter(model => model.model === 'GPT-6 Astra').map(model => model.tasks20).join(','),'354,188,168,126,88');
for(const model of data){
  if(model.model === 'Claude Fable 5.1'){
    assert.equal(model.multiplier,12.4 / 0.5);
    assert.ok(model.sourceNote.includes('50% plan allocation'));
    assert.equal(costPerBug(model),model.bugHunt.cost_usd / (12.4 / 0.5) / (model.bugHunt.fixed + model.bugHunt.extras));
  }else if(model.model === 'GPT-6 Astra'){
    assert.equal(model.multiplier,14.5);
    assert.ok(model.sourceNote.includes('Pro $200/month'));
    assert.equal(costPerBug(model),model.bugHunt.cost_usd / 14.5 / (model.bugHunt.fixed + model.bugHunt.extras));
  }else if(model.provider === 'Claude') assert.equal(model.multiplier,58.9);
  else if(model.provider === 'ChatGPT') assert.equal(model.multiplier,10.6);
}
assert.ok(readme.includes('24.8× per allocated subscription dollar'));
assert.ok(!readme.includes('Astra and Fable use their providers’ multipliers'));
assert.ok(!html.includes('Astra and Fable use the same provider subscription multipliers'));
assert.ok(html.includes('id="fable-normalization">Fable uses allocated subscription dollars for both graphs (full-plan equivalent).'));

for(const method of ['Tasks / subscription $ = multiplier / AA cost per task','Bug-fix rating = sum of weights of its qualifying planted fixes','source run cost × token-price conversion factor / subscription multiplier / total fixes','Single-run results are allowed for every model']) assert.ok(readme.includes(method));
assert.ok(readme.includes('https://nishimura-katsuo.github.io/subscription-value/'));

const chartX = runInNewContext(code.match(/^    const chartX = .+$/m)[0] + '\nchartX');
assert.equal(chartX(100,100,1100,true),82);
assert.equal(chartX(1100,100,1100,true),940);
assert.equal(chartX(600,100,1100,false),511);
assert.ok(chartX(600,100,1100,true) < 511);
assert.ok(chartX(1100,100,1100,true) - chartX(1000,100,1100,true) > chartX(200,100,1100,true) - chartX(100,100,1100,true));
assert.ok(Number.isFinite(chartX(100,99,101,true)));
assert.ok(html.includes('const tickStep = '));
console.log('Exponential horizontal scale checks passed.');

const labelPosition = runInNewContext(code.match(/^    const labelPosition = .+$/m)[0] + '\nlabelPosition');
for(const [px,py,width,height] of [[82,458,120,14],[940,38,160,14],[400,250,100,14],[90,42,300,16]]){
  const [lx,ly] = labelPosition(px,py,width,height);
  assert.ok(lx >= 90 && lx + width <= 932);
  assert.ok(ly - height >= 38 && ly <= 450);
}
assert.ok(!code.includes('const labels ='));
assert.ok(code.includes('label.getBBox()'));
console.log('General chart label bounds checks passed.');

const muse = data.filter(model => model.id.startsWith('muse-') && model.intelligence !== null);
for(const effort of ['low','medium','high']){
  const standard = data.find(model => model.id === 'muse-standard-' + effort), contributor = data.find(model => model.id === 'muse-contributor-' + effort);
  assert.deepEqual(standard.bugHunt,contributor.bugHunt);
  assert.ok(Math.abs(costPerBug(contributor) / costPerBug(standard) - 11.1 / 137) < 1e-12);
  assert.ok(standard.sourceNote.includes('bugs mode only') && contributor.sourceNote.includes('bugs mode only'));
}
assert.equal(muse.length,4);
assert.equal(muse.map(model => model.tasks20).join(','),'162,138,2000,1712');
for(const effort of ['xhigh','max']){
  const standard = data.find(model => model.id === 'muse-standard-' + effort);
  const contributor = data.find(model => model.id === 'muse-contributor-' + effort);
  assert.equal(standard.multiplier,11.1);
  assert.equal(contributor.multiplier,137);
  assert.equal(standard.intelligence,contributor.intelligence);
  assert.equal(standard.benchmarkCost,contributor.benchmarkCost);
  assert.deepEqual(standard.bugHunt,contributor.bugHunt);
  assert.equal(bugScore(standard),bugScore(contributor));
  assert.ok(Math.abs(costPerBug(contributor) / costPerBug(standard) - 11.1 / 137) < 1e-12);
  assert.ok(dominates(contributor,standard,'tasks'));
  assert.ok(dominates(contributor,standard,'bugs'));
  assert.equal(standard.bugHunt.n_runs,effort === 'max' ? 5 : 3);
  assert.equal(standard.bugHunt.coverage_runs,standard.bugHunt.n_runs);
  for(const [id,hits] of Object.entries(standard.bugHunt.bug_hits)){
    assert.ok(Number.isInteger(Number(id)) && Number(id) >= 1 && Number(id) <= 105);
    assert.ok(Number.isInteger(hits) && hits >= 0 && hits <= standard.bugHunt.n_runs);
  }
}
assert.equal(data.find(model => model.id === 'muse-standard-xhigh').intelligence,45);
assert.equal(data.find(model => model.id === 'muse-standard-max').intelligence,48);
assert.equal(data.find(model => model.id === 'muse-standard-max').bugHunt.cost_usd,18.11);
assert.ok(muse.every(model => model.sourceNote && model.aaSource && model.sourceDate === '2026-10-12'));
console.log('Muse checks passed: shared benchmark evidence, consistent Standard pricing basis, tier multipliers, and independent configuration IDs.');

const [,belowY] = labelPosition(200,200,150,14,true);
assert.ok(belowY - 14 > 200);
assert.ok(labelPosition(200,458,150,14,true)[1] <= 450);

const sol56 = data.filter(model => model.model === 'GPT-5.6 Sol');
assert.deepEqual(sol56.map(model => model.reasoning),['Low','Medium','High','XHigh','Max']);
assert.deepEqual(sol56.map(model => model.intelligence),[33,39,42,44,47]);
assert.deepEqual(sol56.map(model => model.benchmarkCost),[0.26,0.5,0.81,1.18,1.99]);
assert.deepEqual(sol56.map(model => model.tasks20),[816,424,262,180,106]);
assert.ok(sol56.every(model => model.multiplier === 10.6 && model.provider === 'ChatGPT' && model.aaSource && model.sourceDate === '2026-10-20'));
assert.equal(metricValue(sol56[0],'bugs'),null);
for (const [index,fixed,cost,extras] of [[1,29,15.77,24],[2,34,33.92,28],[3,39,52.75,59]]) {
  const model = sol56[index];
  assert.equal(model.bugHunt.n_runs,1);
  assert.equal(model.bugHunt.coverage_runs,1);
  assert.equal(reliableBugs(model).length,fixed);
  assert.ok(Object.values(model.bugHunt.bug_hits).every(hits => hits === 1));
  assert.equal(metricValue(model,'bugs'),cost / 10.6 / (fixed + extras));
}
const sol56Max = sol56[4];
assert.equal(sol56Max.bugHunt.id,'GPT-5.6 Sol (max effort) - mean of 2');
assert.equal(sol56Max.bugHunt.coverage_runs,2);
assert.equal(reliableBugs(sol56Max).length,35);
assert.equal(costPerBug(sol56Max),95.35 / 10.6 / (43.5 + 48.5));
for(const [id,hits] of Object.entries(sol56Max.bugHunt.bug_hits)){
  assert.ok(Number.isInteger(Number(id)) && Number(id) >= 1 && Number(id) <= 105);
  assert.ok(Number.isInteger(hits) && hits >= 0 && hits <= 2);
}
assert.ok(sol56.every(model => model.short !== solMedium.short));
console.log('Sol 5.6 checks passed: exact AA tiers, subscription normalization, current Max mean, and labeled single-run eligibility.');

const intelligenceFloors = runInNewContext(code.match(/^    const intelligenceFloors = .+$/m)[0] + '\nintelligenceFloors',{models:data,controls:{'early-resets':{checked:false}}});
assert.equal(intelligenceFloors.join(','),[...new Set([46,...data.filter(model => model.tasks20 !== null && model.intelligence !== null).map(model => model.intelligence)])].sort((a,b) => a-b).join(','));
assert.ok([22,33,39,47,58].every(score => intelligenceFloors.includes(score)));
console.log('AA floor checks passed: all published task scores, sorted without duplicates, plus the original floor.');

const resetControls = {'early-resets':{checked:true}};
const adjusted = runInNewContext(valueCode + '\n({metricValue,resetCostFactor,effectiveMultiplier,bugScore})',{models:data,controls:resetControls});
for (const model of data) {
  const factor = model.provider === 'ChatGPT' ? 3 / 7 : 1;
  assert.equal(adjusted.resetCostFactor(model),factor);
  assert.equal(adjusted.effectiveMultiplier(model),model.multiplier / factor);
  assert.equal(adjusted.metricValue(model,'tasks'),model.tasks20 === null ? null : model.tasks20 / factor);
  assert.equal(adjusted.metricValue(model,'bugs'),metricValue(model,'bugs') === null ? null : metricValue(model,'bugs') * factor);
  assert.equal(adjusted.bugScore(model),bugScore(model));
}
resetControls['early-resets'].checked = false;
for (const model of data) assert.equal(adjusted.metricValue(model,'tasks'),model.tasks20);
console.log('Early reset checks passed: ChatGPT costs ×3/7, throughput ×7/3, unchanged ratings and other subscriptions, reversible toggle.');

const kimi = data.filter(model => model.provider === 'Kimi');
assert.deepEqual(kimi.map(model => model.id),['kimi-k3-low','kimi-k3-max','kimi-k3-1-pro-max']);
assert.deepEqual(kimi.map(model => model.intelligence),[30,44,55]);
assert.deepEqual(kimi.map(model => model.benchmarkCost),[1.15,2,2.11]);
assert.deepEqual(kimi.map(model => model.tasks20),[192,110,104]);
assert.ok(kimi.every(model => model.multiplier === 11 && model.sourceDate === '2026-10-23' && model.aaSource && model.sourceNote.includes('not a measured current allowance')));
assert.equal(metricValue(kimi[0],'bugs'),null);
assert.equal(kimi[1].reasoning,'Max');
assert.equal(kimi[1].bugHunt.source_effort,'default');
assert.equal(kimi[1].bugHunt.id,'Kimi K3');
assert.equal(kimi[1].bugHunt.n_runs,1);
assert.equal(reliableBugs(kimi[1]).length,21);
assert.equal(bugScore(kimi[1]),681);
assert.equal(costPerBug(kimi[1]),25.27 / 11 / 27);
assert.ok(kimi[1].sourceNote.includes('highest published effort') && kimi[1].sourceNote.includes('not a verified effort match') && kimi[1].sourceNote.includes('repeatability is unverified'));
assert.equal(kimi[2].bugHunt.source_effort,'max');
assert.equal(kimi[2].bugHunt.n_runs,3);
assert.equal(kimi[2].bugHunt.coverage_runs,3);
assert.equal(kimi[2].bugHunt.cost_kind,'bill');
assert.equal(reliableBugs(kimi[2]).length,25);
assert.equal(bugScore(kimi[2]),813);
assert.equal(costPerBug(kimi[2]),13.76 / 11 / (36 + 29.3));
assert.ok(kimi[2].sourceNote.includes('failed repo-2 attempt'));
for(const model of kimi.filter(model => model.bugHunt)){
  for(const [id,hits] of Object.entries(model.bugHunt.bug_hits)){
    assert.ok(Number.isInteger(Number(id)) && Number(id) >= 1 && Number(id) <= 105);
    assert.ok(Number.isInteger(hits) && hits > 0 && hits <= model.bugHunt.n_runs);
  }
}
assert.ok(html.includes("Kimi:'#ff8f80'") && html.includes("Kimi:'star'"));
assert.ok(readme.includes('unspecified Bug Hunt effort is assigned to the highest published effort'));
console.log('Kimi checks passed: 11× normalization, exact AA inputs, Default mapped to Max, single-run labels, repeated coverage, bill provenance, and recalibrated ratings.');

const flash = data.find(model => model.id === 'deepseek-flash-1017-max');
assert.equal(flash.provider,'OpenCode Go');
assert.equal(flash.reasoning,'Max');
assert.equal(flash.intelligence,45);
assert.equal(flash.benchmarkCost,0.26);
assert.equal(flash.multiplier,80 / 10);
assert.equal(flash.tasks20,616);
assert.equal(flash.bugHunt.id,'DeepSeek V4.1 Flash 1017 (max effort, OpenCode) - mean of 5');
assert.equal(flash.bugHunt.n_runs,5);
assert.equal(flash.bugHunt.coverage_runs,5);
assert.equal(flash.bugHunt.cost_kind,'bill');
assert.equal(flash.bugHunt.fixed,37.6);
assert.equal(flash.bugHunt.extras,36.2);
assert.equal(flash.bugHunt.cost_usd,0.96);
assert.equal(reliableBugs(flash).length,21);
assert.equal(costPerBug(flash),0.96 / 8 / (37.6 + 36.2));
assert.ok(Object.entries(flash.bugHunt.bug_hits).every(([id,hits]) => Number(id) >= 1 && Number(id) <= 105 && Number.isInteger(hits) && hits >= 0 && hits <= 5));
assert.ok(flash.sourceNote.includes('not measured consumption') && flash.sourceNote.includes('off-peak') && flash.sourceNote.includes('by assumption'));
assert.ok(html.includes("'OpenCode Go':'#a9dc76'") && html.includes("'OpenCode Go':'plus'"));
// Every subscription keeps its own marker shape, so identity never depends on hue alone.
const shapes = runInNewContext('(' + code.match(/^    const shapes = ({.+});$/m)[1] + ')');
assert.deepEqual(Object.keys(shapes).sort(),[...new Set(data.map(model => model.provider))].sort());
assert.equal(new Set(Object.values(shapes)).size,Object.keys(shapes).length);
console.log('Flash 1017 checks passed: Go allowance, task rounding, exact OpenCode Max mean, complete coverage, and subscription cost.');

const goAdded = data.filter(model => model.id.startsWith('go-'));
assert.deepEqual(goAdded.map(model => [model.id,model.reasoning,model.intelligence,model.benchmarkCost,model.multiplier,model.tasks20]),[
  ['go-mimo-v2-6-pro','Default',46,0.13,1.5,230],
  ['go-glm-5-3-flash-max','Max',42,0.28,6,428],
  ['go-minimax-m3-1-flash','Default',43,0.22,2,182],
  ['go-step-5-preview','Default',44,1.03,1.5,30],
  ['go-kimi-k3-1-pro-max','Max',55,2.11,1.5,14],
  ['go-glm-5-3-max','Max',45,2.01,1.5,14],
  ['go-qwen3-8-max-0902','Default',45,5.41,1.5,6]
]);
assert.ok(goAdded.every(model => model.provider === 'OpenCode Go' && model.sourceDate === '2026-10-26' && model.aaSource && model.sourceNote.includes('not measured consumption') && model.sourceNote.includes('by assumption')));
assert.ok(goAdded.every(model => !/Claude|GPT|Muse|Gemini|Grok/.test(model.model)));
const byId = id => data.find(model => model.id === id);
for(const [id,count,fixed,extras,cost] of [
  ['go-mimo-v2-6-pro',14,22.7,5.3,0.86],
  ['go-glm-5-3-flash-max',12,17.7,3.3,1.03],
  ['go-kimi-k3-1-pro-max',25,36,29.3,13.76],
  ['go-glm-5-3-max',19,19,2,15.93]
]){
  const model = byId(id), bug = model.bugHunt;
  assert.equal(reliableBugs(model).length,count);
  assert.equal(bug.fixed,fixed);assert.equal(bug.extras,extras);assert.equal(bug.cost_usd,cost);
  assert.equal(costPerBug(model),cost * (bug.price_factor ?? 1) / model.multiplier / (fixed + extras));
  assert.equal(bug.coverage_runs,bug.n_runs);
  assert.ok(Object.entries(bug.bug_hits).every(([id,hits]) => Number.isInteger(Number(id)) && Number(id) >= 1 && Number(id) <= 105 && Number.isInteger(hits) && hits >= 0 && hits <= bug.n_runs));
}
assert.equal(byId('go-mimo-v2-6-pro').bugHunt.source_effort,'default');
assert.ok(byId('go-mimo-v2-6-pro').sourceNote.includes('mixed judges'));
assert.ok(byId('go-glm-5-3-flash-max').sourceNote.includes('Replication configuration is unverified'));
assert.equal(byId('go-glm-5-3-flash-max').bugHunt.price_factor,2);
assert.equal(costPerBug(byId('go-glm-5-3-flash-max')),2.06 / 6 / 21);
assert.equal(byId('go-glm-5-3-max').bugHunt.n_runs,1);
assert.ok(byId('go-glm-5-3-max').sourceNote.includes('repeatability is unverified'));
assert.equal(bugScore(byId('go-glm-5-3-max')),605);
assert.deepEqual(byId('go-kimi-k3-1-pro-max').bugHunt,kimi[2].bugHunt);
assert.equal(bugScore(byId('go-kimi-k3-1-pro-max')),bugScore(kimi[2]));
for(const id of ['go-minimax-m3-1-flash','go-step-5-preview','go-qwen3-8-max-0902']) assert.equal(metricValue(byId(id),'bugs'),null);
assert.ok(byId('go-qwen3-8-max-0902').sourceNote.includes('revision cannot') || byId('go-qwen3-8-max-0902').sourceNote.includes('cannot establish'));
assert.ok(html.includes('Single-run results are included and labeled; repeatability is unverified.'));
assert.ok(code.includes("'Single run; repeatability unverified'"));
console.log('Go additions passed: seven allowed models, exact task inputs, complete source coverage, one-run inclusion, shared benchmark ratings, and missing-revision exclusions.');

const terra = data.filter(model => model.model === 'GPT-6.1 Terra');
assert.deepEqual(terra.map(model => [model.id,model.reasoning,model.intelligence,model.benchmarkCost,model.tasks20]),[
  ['terra-low','Low',36,0.05,4240],
  ['terra-medium','Medium',41,0.10,2120],
  ['terra-high','High',44,0.13,1630],
  ['terra-xhigh','XHigh',45,0.19,1116],
  ['terra-max','Max',48,0.40,530]
]);
assert.ok(terra.every(model => model.provider === 'ChatGPT' && model.multiplier === 10.6 && model.sourceDate === '2026-10-26' && model.aaSource && model.sourceNote.includes('not a Terra-specific allowance measurement')));
assert.ok(terra.slice(0,2).every(model => model.bugHunt === null && metricValue(model,'bugs') === null && model.sourceNote.includes('no matching Low or Medium run')));
for(const [id,fixed,extras,cost,reliable] of [['terra-high',9.7,6.7,0.56,7],['terra-xhigh',11.3,17,0.75,5],['terra-max',40.7,48,3.88,25]]){
  const model = terra.find(model => model.id === id), bug = model.bugHunt;
  assert.deepEqual([bug.fixed,bug.extras,bug.cost_usd,bug.n_runs,bug.coverage_runs,bug.cost_kind],[fixed,extras,cost,3,3,'list']);
  assert.equal(bug.id,'GPT-6.1 Terra (' + model.reasoning.toLowerCase() + ' effort) - mean of 3');
  assert.equal(bug.date,'2026-10-26');
  assert.equal(reliableBugs(model).length,reliable);
  assert.ok(Object.entries(bug.bug_hits).every(([id,hits]) => Number(id) >= 1 && Number(id) <= 105 && Number.isInteger(hits) && hits > 0 && hits <= 3));
  assert.ok(Math.abs(Object.values(bug.bug_hits).reduce((sum,hits) => sum + hits,0) / 3 - fixed) < 0.051);
  assert.equal(metricValue(model,'bugs'),cost / 10.6 / (fixed + extras));
  assert.ok(model.sourceNote.includes('list estimate') || model.sourceNote.includes('list-rate estimate'));
}
assert.ok(terra[4].sourceNote.includes('long-context rate'));
assert.ok(readme.includes('7 / 5 / 25'));
assert.deepEqual(terra.filter(model => model.intelligence >= 46).map(model => model.id),['terra-max']);
const effortOrder = runInNewContext(code.match(/^    const effortOrder = .+$/m)[0] + '\neffortOrder');
assert.deepEqual(terra.map(model => model.reasoning).sort((a,b) => effortOrder.indexOf(a) - effortOrder.indexOf(b)),terra.map(model => model.reasoning));
assert.ok(!effortOrder.includes('None') && data.every(model => model.reasoning !== 'None'));
console.log('Terra checks passed: all five AA reasoning configurations, task rounding, ChatGPT normalization, effort ordering, provenance, and three-run bug coverage and costs, and exclusion of unpublished Low/Medium bug evidence.');
