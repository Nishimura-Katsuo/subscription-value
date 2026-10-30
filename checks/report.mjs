import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const data = JSON.parse(html.match(/<script id="comparison-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const code = html.match(/<script id="report-code">([\s\S]*?)<\/script>/)[1];
new Script(code);
// Independent Python refresh calculations, kept here so checks do not require source receipts or network access.
const expected = {
  "count": 55,
  "noBugIds": ["go-minimax-m3-1-flash","go-step-5-preview","go-qwen3-8-max-0902","antigravity-ultra-5x-carbon-high"],
  "firstTenTasks": [718.0,1178,480.0,718,340.0,288.0,558,194.0,66.0,56.0],
  "bases": {
    "intelligence": {
      "defaultFloor": 38,
      "defaultTaskCount": 29,
      "allTaskFrontier": ["luna-low","haiku-low","haiku-medium","haiku-high","haiku-xhigh","haiku-max","terra-medium","terra-high","sol-medium","sol-high","sol-xhigh","sol-max","opus-xhigh","opus-max","antigravity-ultra-5x-carbon-high"],
      "defaultTaskFrontier": ["terra-medium","terra-high","sol-medium","sol-high","sol-xhigh","sol-max","opus-xhigh","opus-max","antigravity-ultra-5x-carbon-high"],
      "bugCount": 51,
      "ratedBugs": 62,
      "minimumWeight": 10,
      "weights": {
        "1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,
        "8":null,"9":null,"10":null,"11":null,"12":null,"13":32,"14":null,
        "15":null,"16":25,"17":51,"18":null,"19":null,"20":18,"21":50,
        "22":35,"23":49,"24":null,"25":19,"26":43,"27":32,"28":38,
        "29":32,"30":10,"31":null,"32":49,"33":30,"34":30,"35":43,
        "36":43,"37":31,"38":null,"39":25,"40":32,"41":38,"42":null,
        "43":19,"44":32,"45":19,"46":48,"47":23,"48":null,"49":10,
        "50":23,"51":52,"52":null,"53":null,"54":null,"55":null,"56":null,
        "57":null,"58":null,"59":49,"60":34,"61":41,"62":23,"63":null,
        "64":50,"65":null,"66":null,"67":null,"68":35,"69":50,"70":30,
        "71":19,"72":null,"73":51,"74":51,"75":null,"76":19,"77":18,
        "78":49,"79":50,"80":43,"81":null,"82":32,"83":21,"84":19,
        "85":null,"86":null,"87":null,"88":null,"89":null,"90":50,"91":47,
        "92":23,"93":50,"94":50,"95":49,"96":49,"97":19,"98":19,
        "99":10,"100":10,"101":null,"102":32,"103":null,"104":null,"105":50
      },
      "allBugFrontier": ["luna-high","luna-max","luna-xhigh","sol-low","sol-medium","sol-high","sol-xhigh","sol-max","astra-xhigh","fable-max"],
      "negativeRatings": 18,
      "scoreRange": [-330.56113900345406,1179.1966021279675],
      "scores": {
        "sonnet-high": 549.2837129742852,
        "sol-medium": 385.9615354362685,
        "opus-medium": 346.93917187604654,
        "sol-high": 534.9024059036947,
        "opus-high": 413.4147785947065,
        "sonnet-xhigh": 400.84096440083675,
        "sol-xhigh": 808.9260383300198,
        "opus-xhigh": 500.8989354153295,
        "grok-high": -101.23302111226815,
        "grok-xhigh": 53.904060722754195,
        "sonnet-low": -27.011939918785856,
        "sonnet-medium": 3.511869605023662,
        "sonnet-max": 849.2753289675405,
        "opus-low": -1.8143172388977291,
        "opus-max": 759.2490606789312,
        "sol-low": 17.611747924009535,
        "sol-max": 869.8129878466686,
        "astra-low": 507.9921368808979,
        "astra-medium": 773.8132588777404,
        "astra-high": 789.6640015003709,
        "astra-xhigh": 1141.2049626381972,
        "astra-max": 832.220593399011,
        "luna-low": -328.7833612256763,
        "luna-medium": -330.56113900345406,
        "luna-high": -180.5694932223346,
        "luna-xhigh": -25.149457626097615,
        "luna-max": -177.17818887450846,
        "haiku-low": -122.57283490988681,
        "haiku-medium": -87.81870320381,
        "haiku-high": -91.57534117555093,
        "haiku-xhigh": -122.92956005608562,
        "haiku-max": 114.5593252005342,
        "grok-low": -258.69682768752983,
        "fable-low": 529.1154224604318,
        "fable-medium": 264.47578789367736,
        "fable-high": 695.0132739529802,
        "fable-xhigh": 526.282664345498,
        "fable-max": 1179.1966021279675,
        "muse-standard-max": 43.45752177893672,
        "muse-contributor-max": 43.45752177893672,
        "kimi-k3-1-pro-max": 370.7919447929936,
        "deepseek-flash-1017-max": 228.28939312396597,
        "go-mimo-v2-6-pro": -9.347525258947826,
        "go-kimi-k3-1-pro-max": 370.7919447929936,
        "go-glm-5-3-max": 167.42879053052584,
        "terra-low": -329.2570454362026,
        "terra-medium": -256.81260099175813,
        "terra-high": -226.81260099175813,
        "terra-xhigh": -297.5613932622895,
        "terra-max": 425.26878125734885,
        "antigravity-ultra-5x-argon-high": 732.4824435057461
      }
    },
    "engineering": {
      "defaultFloor": 43,
      "defaultTaskCount": 32,
      "allTaskFrontier": ["luna-low","haiku-low","haiku-medium","haiku-high","haiku-xhigh","haiku-max","terra-medium","terra-high","sol-medium","sol-high","sol-xhigh","opus-high","sol-max","opus-xhigh","opus-max"],
      "defaultTaskFrontier": ["terra-medium","terra-high","sol-medium","sol-high","sol-xhigh","opus-high","sol-max","opus-xhigh","opus-max"],
      "bugCount": 51,
      "ratedBugs": 62,
      "minimumWeight": 19,
      "weights": {
        "1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null,
        "8":null,"9":null,"10":null,"11":null,"12":null,"13":37,"14":null,
        "15":null,"16":32,"17":57,"18":null,"19":null,"20":25,"21":57,
        "22":42,"23":57,"24":null,"25":27,"26":50,"27":38,"28":45,
        "29":37,"30":19,"31":null,"32":57,"33":34,"34":34,"35":50,
        "36":50,"37":37,"38":null,"39":33,"40":38,"41":45,"42":null,
        "43":27,"44":37,"45":27,"46":54,"47":29,"48":null,"49":19,
        "50":29,"51":57,"52":null,"53":null,"54":null,"55":null,"56":null,
        "57":null,"58":null,"59":57,"60":41,"61":46,"62":29,"63":null,
        "64":57,"65":null,"66":null,"67":null,"68":42,"69":55,"70":34,
        "71":27,"72":null,"73":57,"74":57,"75":null,"76":27,"77":25,
        "78":57,"79":57,"80":50,"81":null,"82":37,"83":27,"84":27,
        "85":null,"86":null,"87":null,"88":null,"89":null,"90":57,"91":54,
        "92":29,"93":57,"94":57,"95":57,"96":57,"97":27,"98":27,
        "99":19,"100":19,"101":null,"102":38,"103":null,"104":null,"105":57
      },
      "allBugFrontier": ["luna-high","luna-xhigh","sol-low","sol-medium","sol-high","sol-xhigh","sol-max","astra-xhigh","fable-max"],
      "negativeRatings": 27,
      "scoreRange": [-1003.7042077051772,1290.570524182938],
      "scores": {
        "sonnet-high": 438.68967762209144,
        "sol-medium": 163.5949317313407,
        "opus-medium": 112.71426223088986,
        "sol-high": 388.8643769759583,
        "opus-high": 222.95947295885912,
        "sonnet-xhigh": 215.30384816570904,
        "sol-xhigh": 772.213085684667,
        "opus-xhigh": 378.33224573163193,
        "grok-high": -615.9354751311396,
        "grok-xhigh": -346.76433847724434,
        "sonnet-low": -461.5878719336689,
        "sonnet-medium": -407.84713119292815,
        "sonnet-max": 837.080768085377,
        "opus-low": -452.0400441312214,
        "opus-max": 711.7696868238397,
        "sol-low": -445.5378796290569,
        "sol-max": 844.6525251241064,
        "astra-low": 309.0938612026839,
        "astra-medium": 719.5057377097328,
        "astra-high": 760.8028805668757,
        "astra-xhigh": 1255.6408757107179,
        "astra-max": 825.152765624347,
        "luna-low": -997.4642077051772,
        "luna-medium": -1003.7042077051772,
        "luna-high": -728.6212447422141,
        "luna-xhigh": -462.4142971049216,
        "luna-max": -734.8281412939383,
        "haiku-low": -624.5382817792512,
        "haiku-medium": -569.6807115365947,
        "haiku-high": -567.5382817792512,
        "haiku-xhigh": -621.0005040014734,
        "haiku-max": -233.17774035112348,
        "grok-low": -892.4511655721349,
        "fable-low": 391.025683997484,
        "fable-medium": -48.15329469143387,
        "fable-high": 632.2985757127287,
        "fable-xhigh": 389.472778746713,
        "fable-max": 1290.570524182938,
        "muse-standard-max": -353.95057946879024,
        "muse-contributor-max": -353.95057946879024,
        "kimi-k3-1-pro-max": 158.45879795050098,
        "deepseek-flash-1017-max": -75.23799055634834,
        "go-mimo-v2-6-pro": -455.27806992439423,
        "go-kimi-k3-1-pro-max": 158.45879795050098,
        "go-glm-5-3-max": -173.77489663077984,
        "terra-low": -1000.7234669644363,
        "terra-medium": -893.3728787291423,
        "terra-high": -836.3728787291423,
        "terra-xhigh": -946.8269152402984,
        "terra-max": 196.9929974919064,
        "antigravity-ultra-5x-argon-high": 597.318088884437
      }
    }
  }
};
// Published v5 inputs and converted task costs from the 2026-10-27/28 AA snapshots.
const inputs = [
  ["sonnet-high",41,46,1.64,718.0,41.115109087048,45.7934013528139,1.6361294399784785,1],
  ["sol-medium",46,52,0.36,1178,46.1468797067114,51.8526137445887,0.3593898648025732,1],
  ["opus-medium",48,54,2.45,480.0,48.0581024960691,53.5990511363636,2.4510894376611723,1],
  ["sol-high",50,55,0.59,718,50.2291231936536,55.2761563311688,0.5909853515780825,1],
  ["opus-high",52,58,3.46,340.0,51.6859958227294,57.6955251623377,3.4646622820973185,1],
  ["sonnet-xhigh",50,53,4.09,288.0,49.5740327787242,53.479033495671,4.091984916321919,1],
  ["sol-xhigh",52,57,0.76,558,52.308219253291,57.3006561688312,0.7639949356156494,1],
  ["opus-xhigh",57,62,6.05,194.0,56.9947060170507,62.4715042207792,6.047194490848774,1],
  ["grok-high",35,41,6.18,66.0,35.0122962959703,41.4663142857143,6.18359556537658,1],
  ["grok-xhigh",34,41,7.51,56.0,34.3350117067196,40.9513249458874,7.511769586408455,1],
  ["sonnet-low",25,33,0.51,2310.0,25.299704549789,33.0204561688312,0.5113424463897498,1],
  ["sonnet-medium",30,37,0.78,1510.0,30.3195522148431,36.7916567099567,0.7806560352024481,1],
  ["sonnet-max",54,58,10.02,118.0,54.24133407109,58.1996613636364,10.020621343395753,1],
  ["opus-low",35,43,0.98,1202.0,34.502785007759,42.9668683982684,0.9755293224458845,1],
  ["opus-max",58,65,10.04,118.0,58.4060336078904,64.5760308441558,10.036409719512749,1],
  ["sol-low",35,42,0.16,2650,34.502924431456,42.2704755952381,0.16147357831822573,1],
  ["sol-max",55,59,1.27,334,54.5087338138148,59.2526158549784,1.2720632679446995,1],
  ["astra-low",43,50,1.42,408,43.0349823228524,49.5239466991342,1.4237229635663595,1],
  ["astra-medium",51,57,2.73,212,51.4548393864113,56.6978924242424,2.732438933013427,1],
  ["astra-high",55,60,3.24,180,54.849838322506,59.9769976190476,3.2385719685518306,1],
  ["astra-xhigh",55,60,3.66,158,55.2557468569681,60.3287090367965,3.6589264906126227,1],
  ["astra-max",57,62,6.24,92,56.8538559596797,61.7947113636364,6.244666943602518,1],
  ["luna-low",10,19,0.0051,83138,9.66610812336462,18.7273721861472,0.005115255188520391,1],
  ["luna-medium",18,25,0.04,10600,18.3042156192416,24.7770749458874,0.042201836106537785,1],
  ["luna-high",21,27,0.07,6058,21.3790170864582,27.207087012987,0.07294776473194697,1],
  ["luna-xhigh",23,29,0.1,4240,23.3008728089378,28.8393617965368,0.10409320921120957,1],
  ["luna-max",28,33,0.15,2826,27.7552004938153,33.198545508658,0.15195575732105837,1],
  ["haiku-low",19,27,0.04,29450.0,18.6180055310996,26.8470458874459,0.043757686381988486,1],
  ["haiku-medium",25,32,0.09,13088.0,24.5513254343023,31.7947239718615,0.0917645584066771,1],
  ["haiku-high",30,36,0.16,7362.0,29.624315467743,36.2529166666667,0.15856031956679498,1],
  ["haiku-xhigh",34,40,0.25,4712.0,34.3387759486628,40.2600491883117,0.24836110126596478,1],
  ["haiku-max",36,42,0.41,2874.0,36.2345435880142,42.2884125,0.41100741536816304,1],
  ["grok-low",31,37,2.92,142.0,30.882077602567,37.4371954004329,2.9222013011913153,1],
  ["fable-low",38,45,4.49,110.0,38.483648810734,45.367363961039,4.486736376258894,1],
  ["fable-medium",43,50,5.58,88.0,42.971597828284,50.0484300865801,5.58053808023747,1],
  ["fable-high",47,54,7.56,66.0,47.024988245604,54.1478176948052,7.560794697580411,1],
  ["fable-xhigh",50,57,10.89,46.0,49.6716384248632,56.8835588203463,10.88545763790596,1],
  ["fable-max",49,57,13.04,38.0,49.0102124158081,56.5894890151515,13.03926860806298,1],
  ["muse-standard-max",36,44,2.39,92.0,36.4172039139368,43.8583411255411,2.3857813858107244,1],
  ["muse-contributor-max",36,44,2.39,1146.0,36.4172039139368,43.8583411255411,2.3857813858107244,1],
  ["kimi-k3-1-pro-max",46,50,3.68,60.0,46.0026236744189,50.4437710497835,3.6812002895742055,1],
  ["deepseek-flash-1017-max",32,37,0.6,266.0,32.4896393532027,37.4970801948052,0.60210514783598,1],
  ["go-mimo-v2-6-pro",30,34,0.26,116.0,29.8897833093321,34.2701744047619,0.25718036275876155,1.0011543841255415],
  ["go-minimax-m3-1-flash",29,34,0.49,82.0,28.9095214290458,34.1339878787879,0.49097067348453205,1],
  ["go-step-5-preview",29,37,2.35,12.0,28.5283090216016,36.972620995671,2.3452525606205166,1],
  ["go-kimi-k3-1-pro-max",46,50,3.68,8.0,46.0026236744189,50.4437710497835,3.6812002895742055,1],
  ["go-glm-5-3-max",32,38,5.01,6.0,31.653381843882,37.59005254329,5.009264601719954,1],
  ["go-qwen3-8-max-0902",34,39,10.85,2.0,33.5545627367888,39.1803852813853,10.023891571541945,1.0827208279785372],
  ["terra-low",29,35,0.07,6058,29.2169280792131,35.0157104437229,0.07133756205169729,1],
  ["terra-medium",38,43,0.17,2494,38.1152076677975,42.5620279761905,0.16880458238389412,1],
  ["terra-high",42,46,0.26,1630,42.3344508712563,46.324690530303,0.2592796466169722,1],
  ["terra-xhigh",45,49,0.4,1060,44.950051789066,49.1166886904762,0.40068900166662513,1],
  ["terra-max",51,54,0.96,442,50.9765188577015,54.3859752164502,0.961108031081634,1],
  ["antigravity-ultra-5x-argon-high",50,57,3.84,46,50.4121935905389,57.3015892857143,7.682671372515551,0.5],
  ["antigravity-ultra-5x-carbon-high",59,65,3.88,44,59.425738829526,64.7103995670996,7.755545745286556,0.5]
];
const plain = value => JSON.parse(JSON.stringify(value));
const near = (actual,wanted) => assert.ok(Math.abs(actual - wanted) < 1e-9,`${actual} != ${wanted}`);
const declaration = name => {const match = code.match(new RegExp('^    const ' + name + ' = .+$','m'));assert.ok(match, name + ' declaration');return match[0];};
const names = ['intelligenceScore','reliableBugs','bugCalibrations','calibration','bugCredit','bugPenalty','bugScore','totalFixes','resetCostFactor','subscriptionTiers','selectedTier','tierMultiplier','tierLabel','effectiveMultiplier','costPerBug','metricValue','rating','bugFloors','defaultBugFloor','bugFloorSteps','defaultIntelligenceFloor','intelligenceFloors','dominates','pareto'];
const valueCode = names.map(declaration).join('\n');
const create = (models = data,basis = 'intelligence',strength = 2) => {
  const context = {models,budget:200,penaltyStrength:strength,controls:{'intelligence-basis':{value:basis},'early-resets':{checked:false}}};
  return {context,...runInNewContext(valueCode + '\n({' + names.join(',') + '})',context)};
};
assert.equal(Number(html.match(/id="penalty"[^>]*value="([^"]+)"/)[1]),2);
assert.equal(data.length,expected.count);
assert.equal(new Set(data.map(model => model.id)).size,expected.count);
assert.deepEqual(data.map(m => ['id','intelligence','engineering','benchmarkCost','tasks20','aaIntelligenceExact','aaEngineeringExact','aaTaskCostExact','taskPriceFactor'].map(key => m[key])),inputs);
assert.deepEqual(data.slice(0,10).map(m => m.tasks20),expected.firstTenTasks);
assert.deepEqual(data.filter(m => !m.bugHunt).map(m => m.id),expected.noBugIds);
assert.ok(!data.some(m => /sol-5-6|kimi-k3-(low|max)|muse-.*-(low|medium|high|xhigh)|grok-medium|go-glm-5-3-flash/.test(m.id)));
const matchesSearch = runInNewContext(declaration('matchesSearch') + '\nmatchesSearch');
for(const model of data){
  assert.equal(model.aaIndexVersion,'5.0');
  assert.equal(model.intelligence,Math.round(model.aaIntelligenceExact));
  assert.equal(model.engineering,Math.round(model.aaEngineeringExact));
  assert.ok(model.benchmarkCost > 0 && model.multiplier > 0 && model.aaSource && model.sourceDate === (model.provider === 'Antigravity Ultra 5x' ? '2026-10-28' : '2026-10-27'));
  assert.equal(model.tasks20,20 * Math.round(model.multiplier / model.benchmarkCost * 10) / 10);
  assert.ok(matchesSearch(model,model.provider.toLowerCase()));
  assert.equal(matchesSearch(model,'china'),model.country === 'China');
  for(const alias of ['us','usa','united states']) assert.equal(matchesSearch(model,alias),model.country === 'United States');
  if(!model.bugHunt) continue;
  const bug = model.bugHunt;
  assert.ok(bug.fixed > 0 && bug.fixed <= 105 && bug.extras >= 0 && bug.cost_usd > 0);
  assert.equal(bug.coverage_runs,bug.n_runs);
  assert.ok(bug.n_runs >= 1 && ['list','floor','bill'].includes(bug.cost_kind));
  for(const [id,hits] of Object.entries(bug.bug_hits)) assert.ok(Number.isInteger(+id) && +id >= 1 && +id <= 105 && Number.isInteger(hits) && hits >= 0 && hits <= bug.n_runs);
}
const byId = id => data.find(m => m.id === id);
// At the $200 validation budget, Go Plus differs from recorded Go baselines.
const expectedMultiplier = model => model.provider === 'X Subscription' ? 41.4 : model.id === 'deepseek-flash-1017-max' ? 4 : model.id === 'go-glm-5-3-max' ? 3 : model.multiplier;
const expectedTasks = model => 20 * Math.round(expectedMultiplier(model) / model.benchmarkCost * 10) / 10;
const argon = byId('antigravity-ultra-5x-argon-high');
assert.deepEqual([argon.provider,argon.reasoning,argon.multiplier,argon.taskPriceFactor,argon.benchmarkCost,argon.tasks20],['Antigravity Ultra 5x','High',8.7,.5,3.84,46]);
assert.equal(argon.multiplier,Math.round(200 * (30.4375 / 7) / 99.99 * 10) / 10);
assert.ok(!data.some(model => model.model.startsWith('Gemini') && model.provider === 'OpenCode Go'));
near(argon.benchmarkCost,Math.round(argon.aaTaskCostExact * argon.taskPriceFactor * 100) / 100);
assert.deepEqual([argon.bugHunt.id,argon.bugHunt.fixed,argon.bugHunt.extras,argon.bugHunt.cost_usd,argon.bugHunt.n_runs,argon.bugHunt.coverage_runs,argon.bugHunt.date],['Gemini 4 Argon (high effort, Antigravity CLI) - mean of 3',40.7,7.3,7.16,3,3,'2026-10-14']);
assert.equal(create().reliableBugs(argon).length,31);
near(create().metricValue(argon,'bugs'),7.16 / 8.7 / 48);
const carbon = byId('antigravity-ultra-5x-carbon-high');
assert.deepEqual([carbon.reasoning,carbon.benchmarkCost,carbon.tasks20,carbon.bugHunt],['High',3.88,44,undefined]);
near(carbon.benchmarkCost,Math.round(carbon.aaTaskCostExact * carbon.taskPriceFactor * 100) / 100);
for(const model of data.filter(model => /^Gemini 4 (Argon|Carbon)$/.test(model.model))) assert.deepEqual([model.provider,model.multiplier,model.taskPriceFactor],['Antigravity Ultra 5x',argon.multiplier,.5]);
assert.ok(carbon.sourceNote.includes('User-directed') && carbon.sourceNote.includes('subscription availability are not verified'));
assert.equal(byId('luna-low').benchmarkCost,.0051);
assert.deepEqual(data.filter(m => m.id.startsWith('terra-')).map(m => m.benchmarkCost),[.07,.17,.26,.40,.96]);
for(const [id,fixed,extras,cost,reliable] of [['terra-low',6,5,.30,4],['terra-medium',7.3,7.3,.31,6],['terra-high',9.7,6.7,.56,7],['terra-xhigh',11.3,17,.75,5],['terra-max',40.7,48,3.88,25]]){
  const model = byId(id), bug = model.bugHunt;
  assert.deepEqual([bug.fixed,bug.extras,bug.cost_usd,bug.n_runs,bug.coverage_runs],[fixed,extras,cost,3,3]);
  assert.equal(create().reliableBugs(model).length,reliable);
}
for(const model of data){
  if(model.model === 'Claude Fable 5.1') assert.equal(model.multiplier,24.8);
  else if(model.model === 'GPT-6 Astra') assert.equal(model.multiplier,29);
  else if(model.provider === 'Claude') assert.equal(model.multiplier,58.9);
  else if(model.provider === 'ChatGPT') assert.equal(model.multiplier,21.2);
}
assert.deepEqual(byId('go-kimi-k3-1-pro-max').bugHunt,byId('kimi-k3-1-pro-max').bugHunt);
assert.deepEqual(byId('muse-standard-max').bugHunt,byId('muse-contributor-max').bugHunt);
assert.ok(byId('go-mimo-v2-6-pro').taskPriceFactor > 1 && byId('go-qwen3-8-max-0902').taskPriceFactor > 1);
for(const [basis,facts] of Object.entries(expected.bases)){
  const api = create(data,basis), {context,calibration,reliableBugs,bugCredit,bugPenalty,bugScore,metricValue,rating,pareto} = api;
  assert.equal(api.defaultIntelligenceFloor(),facts.defaultFloor);
  assert.equal(data.filter(m => rating(m) >= facts.defaultFloor).length,facts.defaultTaskCount);
  assert.deepEqual(plain(calibration().weights),facts.weights);
  assert.equal(calibration().minimumWeight,facts.minimumWeight);
  assert.equal(Object.keys(calibration().missWeights).length,facts.ratedBugs);
  assert.deepEqual(plain(pareto(data).map(m => m.id)),facts.allTaskFrontier);
  assert.deepEqual(plain(pareto(data.filter(m => rating(m) >= facts.defaultFloor)).map(m => m.id)),facts.defaultTaskFrontier);
  assert.deepEqual(plain(pareto(data.filter(m => metricValue(m,'bugs') !== null),'bugs').map(m => m.id)),facts.allBugFrontier);
  assert.equal(data.filter(m => bugScore(m) !== null).length,facts.bugCount);
  assert.equal(data.filter(m => bugScore(m) !== null && bugScore(m) < 0).length,facts.negativeRatings);
  assert.deepEqual(plain(api.intelligenceFloors()),[...new Set(data.map(m => m[basis]))].sort((a,b) => a-b));
  for(const model of data){
    assert.equal(rating(model),model[basis]);
    assert.equal(metricValue(model),expectedTasks(model));
    if(!model.bugHunt){assert.equal(bugScore(model),null);assert.equal(metricValue(model,'bugs'),null);continue;}
    near(bugScore(model),facts.scores[model.id]);
    const fixes = reliableBugs(model), missed = Object.entries(facts.weights).filter(([id,w]) => w !== null && !fixes.includes(id));
    near(bugCredit(model),fixes.reduce((sum,id) => sum + (facts.weights[id] ?? 0),0));
    near(bugPenalty(model),2 * missed.reduce((sum,[,w]) => sum + facts.minimumWeight ** 2 / w,0));
    near(metricValue(model,'bugs'),model.bugHunt.cost_usd * (model.bugHunt.price_factor ?? 1) / expectedMultiplier(model) / (model.bugHunt.fixed + model.bugHunt.extras));
  }
  assert.equal(api.defaultBugFloor,-Infinity);
  const probe = byId('sol-medium'), basePenalty = bugPenalty(probe) / 2, baseCost = metricValue(probe,'bugs');
  for(const strength of [0,.25,1,2,4,1e6]){
    context.penaltyStrength = strength;
    near(bugPenalty(probe),strength * basePenalty);
    near(bugScore(probe),bugCredit(probe) - strength * basePenalty);
    assert.equal(metricValue(probe,'bugs'),baseCost);
    assert.ok(api.bugFloorSteps().length <= 21);
  }
  context.penaltyStrength = 2;
  context.controls['early-resets'].checked = true;
  for(const model of data){
    const factor = model.provider === 'ChatGPT' ? 3/7 : 1;
    assert.equal(api.resetCostFactor(model),factor);
    assert.equal(api.effectiveMultiplier(model),expectedMultiplier(model) / factor);
    assert.equal(metricValue(model),expectedTasks(model) / factor);
    if(model.bugHunt) near(metricValue(model,'bugs'),model.bugHunt.cost_usd * (model.bugHunt.price_factor ?? 1) / expectedMultiplier(model) / (model.bugHunt.fixed + model.bugHunt.extras) * factor);
    if(model.bugHunt) near(bugScore(model),facts.scores[model.id]);
  }
  context.controls['early-resets'].checked = false;
  assert.equal(metricValue(probe),probe.tasks20);
  assert.equal(pareto([]).length,0);
  const tied = {intelligence:40,engineering:50,tasks20:100,multiplier:5,benchmarkCost:1};
  assert.equal(pareto([tied,{...tied}]).length,2);
  assert.equal(pareto([tied,{...tied,tasks20:102,multiplier:5.1}]).length,1);
  const costly = {...probe,bugHunt:{...probe.bugHunt,cost_usd:probe.bugHunt.cost_usd * 2}};
  assert.ok(api.dominates(probe,costly,'bugs'));
  assert.ok(!api.dominates(costly,probe,'bugs'));
  assert.equal(pareto([probe,costly],'bugs').length,1);
}
const withFixes = ids => ({bugHunt:{n_runs:2,coverage_runs:2,bug_hits:Object.fromEntries(ids.map(id => [id,2]))}});
const synthetic = [20,40,80].map((intelligence,i) => ({...withFixes([String(i+1)]),intelligence,engineering:intelligence + 10}));
const sample = create(synthetic,'intelligence',1);
assert.deepEqual(plain(sample.calibration().missWeights),{'1':20,'2':10,'3':5});
for(const [fixes,score] of [[['1'],5],[['2'],15],[['3'],50],[['1','2'],55],[['1','2','3'],140]]) assert.equal(sample.bugScore(withFixes(fixes)),score);
assert.equal(sample.bugPenalty(withFixes(['1','2','3'])),0);
for(const candidate of [withFixes(['104']),withFixes([]),{bugHunt:{n_runs:2,coverage_runs:1,bug_hits:{1:1}}}]) assert.equal(sample.bugScore(candidate),null);
assert.ok(sample.bugScore(withFixes(['2','3'])) > sample.bugScore(withFixes(['1','3'])));
assert.ok(sample.bugPenalty(withFixes(['2','3'])) > sample.bugPenalty(withFixes(['1','2'])));
sample.context.controls['intelligence-basis'].value = 'engineering';
assert.equal(sample.calibration().minimumWeight,30);
assert.notEqual(sample.bugScore(withFixes(['1'])),5);
const zero = create([20,20].map((intelligence,i) => ({...withFixes([String(i+1)]),intelligence,engineering:20})),'intelligence',1);
assert.equal(zero.bugScore(withFixes(['1'])),0);
assert.equal(zero.reliableBugs({bugHunt:{n_runs:1,coverage_runs:1,bug_hits:{1:1}}}).join(','),'1');
assert.equal(zero.reliableBugs({bugHunt:{n_runs:1,coverage_runs:0,bug_hits:{}}}),null);
assert.equal(zero.reliableBugs({bugHunt:{n_runs:3,coverage_runs:3,bug_hits:{1:3,2:2}}}).join(','),'1');
const {chartX,chartY,labelPosition,shapes,effortOrder,markerPath} = runInNewContext(['chartX','chartY','labelPosition','shapes','effortOrder','polygon','markerPath'].map(declaration).join('\n') + '\n({chartX,chartY,labelPosition,shapes,effortOrder,markerPath})');
assert.equal(chartX(100,100,1100,true),82);assert.equal(chartX(1100,100,1100,true),940);assert.equal(chartX(600,100,1100,false),511);
assert.ok(chartX(600,100,1100,true) < 511);
assert.ok(chartX(1100,100,1100,true)-chartX(1000,100,1100,true) > chartX(200,100,1100,true)-chartX(100,100,1100,true));
assert.equal(chartY(1,1000,1,true),458);assert.equal(chartY(1000,1000,1,true),38);assert.equal(chartY(0,1000,1,false),458);
assert.equal(chartY(.001,.1,.001,true,true),38);assert.equal(chartY(.1,.1,.001,true,true),458);
for(const [px,py,width,height] of [[82,458,120,14],[940,38,160,14],[400,250,100,14],[90,42,300,16]]){
  const [lx,ly] = labelPosition(px,py,width,height);assert.ok(lx >= 90 && lx + width <= 932 && ly-height >= 38 && ly <= 450);
}
assert.ok(labelPosition(200,200,150,14,true)[1]-14 > 200);
assert.deepEqual(plain(Object.keys(shapes).sort()),[...new Set(data.map(m => m.provider))].sort());
assert.equal(new Set(Object.values(shapes)).size,Object.keys(shapes).length);
assert.equal(new Set(Object.values(shapes).map(shape => markerPath(shape,0,0,5))).size,Object.keys(shapes).length);
assert.deepEqual(plain(effortOrder),['Default','Low','Medium','High','XHigh','Max']);
assert.ok(code.includes('label.getBBox()') && html.includes('.chart-point[aria-pressed="true"] .chart-label'));
assert.ok(!html.includes('id="provider"') && !html.includes('id="scale"'));
assert.ok(readme.includes('https://nishimura-katsuo.github.io/subscription-value/'));
assert.ok(readme.includes('https://artificialanalysis.ai/indexes/engineering'));
assert.ok(readme.includes('v5') && readme.includes('55') && readme.includes('51'));
console.log('Report checks passed: 55 exact v5 inputs, both calibration bases and full frontiers, 51 evidence records, signed/zero ratings, inverse penalties, cost direction, task conversion, resets, search, and chart geometry.');

// Tier boundaries change value, never multiply it by the entered budget.
const tierAPI = create(data,'intelligence',2), sol = byId('sol-medium'), astra = byId('astra-low');
for(const amount of [1,20,50,99.99]){
  tierAPI.context.budget = amount;
  assert.equal(tierAPI.tierMultiplier(sol),10.6);
  assert.equal(tierAPI.tierMultiplier(astra),14.5);
}
for(const amount of [100,199.99,200,499.99,500,1000]){
  tierAPI.context.budget = amount;
  assert.equal(tierAPI.tierMultiplier(sol),21.2);
  assert.equal(tierAPI.tierMultiplier(astra),29);
}
for(const [id,values] of [['muse-standard-max',[5.6,9.3,11.1,11.1]],['muse-contributor-max',[68.4,114,137,137]]]){
  const model = byId(id);
  for(const [i,amount] of [5,15,50,200].entries()){
    tierAPI.context.budget = amount;
    assert.equal(tierAPI.tierMultiplier(model),values[i]);
    near(tierAPI.metricValue(model),20 * Math.round(values[i] / model.benchmarkCost * 10) / 10);
    near(tierAPI.costPerBug(model),model.bugHunt.cost_usd / values[i] / (model.bugHunt.fixed + model.bugHunt.extras));
    tierAPI.context.budget = amount - .01;
    assert.equal(tierAPI.tierMultiplier(model),values[Math.max(0,i-1)]);
  }
}
tierAPI.context.budget = 20;
const lowCost = tierAPI.costPerBug(sol), lowTasks = tierAPI.metricValue(sol), ratingBefore = tierAPI.bugScore(sol);
tierAPI.context.budget = 99.99;
assert.equal(tierAPI.metricValue(sol),lowTasks);
tierAPI.context.budget = 100;
near(tierAPI.costPerBug(sol),lowCost / 2);
assert.equal(tierAPI.bugScore(sol),ratingBefore);
tierAPI.context.controls['early-resets'].checked = true;
near(tierAPI.effectiveMultiplier(sol),21.2 * 7 / 3);
near(tierAPI.costPerBug(sol),lowCost / 2 * 3 / 7);
assert.equal(tierAPI.selectedTier(byId('kimi-k3-1-pro-max')),undefined);
console.log('Tier checks passed: boundaries, task rounding, bug costs, reset composition, unchanged ratings, and fixed unknown tiers.');

for(const model of data.filter(model => model.provider === 'OpenCode Go')){
  tierAPI.context.budget = 39.99;
  assert.equal(tierAPI.tierMultiplier(model),model.multiplier);
  tierAPI.context.budget = 40;
  const expected = model.id === 'deepseek-flash-1017-max' ? 4 : model.id === 'go-glm-5-3-max' ? 3 : model.multiplier;
  assert.equal(tierAPI.tierMultiplier(model),expected);
}

const grok = byId('grok-high');
for(const [amount,price,multiplier] of [[1,8,20.7],[8,8,20.7],[29.99,8,20.7],[30,30,22.08],[99.99,30,22.08],[100,100,24.84],[199.99,100,24.84],[200,200,41.4],[1000,200,41.4]]){
  tierAPI.context.budget = amount;
  near(tierAPI.tierMultiplier(grok),multiplier);
  assert.equal(tierAPI.selectedTier(grok).price,price);
  assert.ok(tierAPI.tierLabel(grok).includes('provisional'));
  near(tierAPI.metricValue(grok),20 * Math.round(multiplier / grok.benchmarkCost * 10) / 10);
  near(tierAPI.costPerBug(grok),grok.bugHunt.cost_usd / multiplier / (grok.bugHunt.fixed + grok.bugHunt.extras));
  assert.ok(matchesSearch(grok,'cursor') && matchesSearch(grok,'xai'));
}
console.log('X Subscription checks passed: inferred tier boundaries, normalized tasks, bug costs, labels, and legacy search alias.');

const costOptions = [...html.match(/<select[^>]*id="budget"[^>]*>([\s\S]*?)<\/select>/)[1].matchAll(/<option value="(\d+)"( selected)?>([^<]+)<\/option>/g)];
assert.deepEqual(costOptions.map(option => +option[1]),[5,15,30,60,100,500]);
assert.equal(costOptions.find(option => option[2])[1],'30');
const rangeAPI = create();
for(const [ceiling,chat,muse,contributor,x,deepseek,glm] of [[5,10.6,5.6,68.4,20.7,8,1.5],[15,10.6,9.3,114,20.7,8,1.5],[30,10.6,9.3,114,22.08,8,1.5],[60,10.6,11.1,137,22.08,4,3],[100,21.2,11.1,137,24.84,4,3],[500,21.2,11.1,137,41.4,4,3]]){
  rangeAPI.context.budget = ceiling;
  for(const [id,multiplier] of [['sol-medium',chat],['muse-standard-max',muse],['muse-contributor-max',contributor],['grok-high',x],['deepseek-flash-1017-max',deepseek],['go-glm-5-3-max',glm]]){
    const model = byId(id);
    near(rangeAPI.tierMultiplier(model),multiplier);
    near(rangeAPI.metricValue(model),20 * Math.round(multiplier / model.benchmarkCost * 10) / 10);
    near(rangeAPI.costPerBug(model),model.bugHunt.cost_usd * (model.bugHunt.price_factor ?? 1) / multiplier / (model.bugHunt.fixed + model.bugHunt.extras));
  }
}
console.log('Cost range checks passed: six actionable options and expected subscription multipliers in both metrics.');
