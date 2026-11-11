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
  "count": 67,
  "noBugIds": [
    "muse-wonder-standard-high",
    "muse-wonder-contributor-high",
    "muse-ember-standard-max",
    "muse-ember-standard-xhigh",
    "go-minimax-m3-1-flash",
    "go-step-5-preview",
    "go-qwen3-8-max-0902",
    "antigravity-ultra-5x-carbon-high",
    "antigravity-ultra-5x-carbon-low",
    "antigravity-ultra-5x-carbon-medium",
    "go-glm-5-3-low"
  ],
  "firstTenTasks": [894, 1178.0, 598, 718.0, 424, 358, 558.0, 242, 66.0, 54.0],
  "bases": {
    "intelligence": {
      "defaultFloor": 42,
      "defaultTaskCount": 32,
      "allTaskFrontier": ["luna-low", "haiku-low", "haiku-medium", "haiku-high", "haiku-xhigh", "haiku-max", "terra-medium", "sol-medium", "sol-high", "sol-xhigh", "sol-max", "opus-xhigh", "opus-max", "fable-high", "fable-max"],
      "defaultTaskFrontier": ["sol-medium", "sol-high", "sol-xhigh", "sol-max", "opus-xhigh", "opus-max", "fable-high", "fable-max"],
      "bugCount": 56,
      "ratedBugs": 62,
      "minimumWeight": 10,
      "weights": { "1": null, "2": null, "3": null, "4": null, "5": null, "6": null, "7": null, "8": null, "9": null, "10": null, "11": null, "12": null, "13": 28, "14": null, "15": null, "16": 25, "17": 52, "18": null, "19": null, "20": 18, "21": 52, "22": 35, "23": 28, "24": null, "25": 19, "26": 29, "27": 29, "28": 42, "29": 29, "30": 10, "31": null, "32": 65, "33": 30, "34": 30, "35": 43, "36": 43, "37": 31, "38": null, "39": 26, "40": 32, "41": 43, "42": null, "43": 19, "44": 27, "45": 19, "46": 48, "47": 23, "48": null, "49": 10, "50": 23, "51": 52, "52": null, "53": null, "54": null, "55": null, "56": null, "57": null, "58": null, "59": 65, "60": 35, "61": 42, "62": 23, "63": null, "64": 50, "65": null, "66": null, "67": null, "68": 35, "69": 50, "70": 30, "71": 19, "72": null, "73": 52, "74": 52, "75": null, "76": 19, "77": 18, "78": 65, "79": 50, "80": 51, "81": null, "82": 33, "83": 21, "84": 19, "85": null, "86": null, "87": null, "88": null, "89": null, "90": 50, "91": 50, "92": 23, "93": 50, "94": 50, "95": 52, "96": 50, "97": 19, "98": 19, "99": 10, "100": 10, "101": null, "102": 32, "103": null, "104": null, "105": 50 }, "allBugFrontier": [ "luna-high", "luna-max", "luna-xhigh", "deepseek-flash-1017-high", "deepseek-flash-1017-max", "sol-medium", "sol-high", "sol-xhigh", "sol-max", "astra-xhigh", "fable-max" ], "negativeRatings": 20, "scoreRange": [ -332.6203306974959, 1205.9205383511296 ], "scores": { "sonnet-high": 546.1279312459842, "sol-medium": 380.4900786655037, "opus-medium": 344.05077237155956, "sol-high": 522.689495961107, "opus-high": 413.29090028331217, "sonnet-xhigh": 395.9907206305128, "sol-xhigh": 793.880816869549, "opus-xhigh": 498.4021399208676, "grok-high": -102.46028003320072, "grok-xhigh": 52.676801801821625, "sonnet-low": -28.378823920520006, "sonnet-medium": 2.1449856032895696, "sonnet-max": 835.4814660554014, "opus-low": -5.534649516493914, "opus-max": 759.9843993392944, "sol-low": 12.445413372824873, "sol-max": 850.3125753500982, "astra-low": 489.95546298296733, "astra-medium": 771.1155577630842, "astra-high": 793.3091044125132, "astra-xhigh": 1109.9154277095454, "astra-max": 813.4210361572887, "luna-low": -330.8425529197181, "luna-medium": -332.6203306974959, "luna-high": -182.62868491637641, "luna-xhigh": -27.208649320139443, "luna-max": -179.2373805685503, "haiku-low": -124.63202660392864, "haiku-medium": -89.87789489785183, "haiku-high": -93.63453286959276, "haiku-xhigh": -124.98875175012745, "haiku-max": 107.79323695476822, "grok-low": -260.063711689264, "fable-low": 531.8172379225367, "fable-medium": 268.914705705269, "fable-high": 698.1063219902869, "fable-xhigh": 519.7585008416568, "fable-max": 1205.9205383511296, "muse-standard-max": 42.09063777720257, "muse-contributor-max": 42.09063777720257, "muse-wonder-standard-max": 295.11417362832464, "muse-wonder-contributor-max": 295.11417362832464, "kimi-k3-1-pro-max": 364.5098819616228, "deepseek-flash-1017-max": 218.42993145724037, "go-mimo-v2-6-pro": -11.406716952989655, "go-kimi-k3-1-pro-max": 364.5098819616228, "go-glm-5-3-max": 158.2478671199247, "terra-low": -331.3162371302444, "terra-medium": -258.87179268579996, "terra-high": -228.87179268579996, "terra-xhigh": -299.62058495633136, "terra-max": 425.85807008052524, "antigravity-ultra-5x-argon-high": 729.3180165690097, "go-glm-5-3-flash": -70.85195118312095, "go-mimo-v2-6-flash": -86.16864593002163, "deepseek-flash-1017-high": 47.861885587845165 }
    },
    "engineering": {
      "defaultFloor": 46,
      "defaultTaskCount": 34,
      "allTaskFrontier": ["luna-low", "haiku-low", "haiku-medium", "haiku-high", "haiku-xhigh", "haiku-max", "sol-medium", "sol-high", "sol-xhigh", "opus-high", "sol-max", "opus-xhigh", "fable-medium", "fable-high", "fable-max"],
      "defaultTaskFrontier": ["sol-medium", "sol-high", "sol-xhigh", "opus-high", "sol-max", "opus-xhigh", "fable-medium", "fable-high", "fable-max"],
      "bugCount": 56,
      "ratedBugs": 62,
      "minimumWeight": 19,
      "weights": { "1": null, "2": null, "3": null, "4": null, "5": null, "6": null, "7": null, "8": null, "9": null, "10": null, "11": null, "12": null, "13": 34, "14": null, "15": null, "16": 31, "17": 57, "18": null, "19": null, "20": 25, "21": 57, "22": 43, "23": 34, "24": null, "25": 27, "26": 34, "27": 34, "28": 46, "29": 34, "30": 19, "31": null, "32": 73, "33": 34, "34": 34, "35": 50, "36": 50, "37": 38, "38": null, "39": 33, "40": 38, "41": 50, "42": null, "43": 27, "44": 31, "45": 27, "46": 54, "47": 29, "48": null, "49": 19, "50": 29, "51": 57, "52": null, "53": null, "54": null, "55": null, "56": null, "57": null, "58": null, "59": 73, "60": 42, "61": 46, "62": 29, "63": null, "64": 57, "65": null, "66": null, "67": null, "68": 43, "69": 55, "70": 34, "71": 27, "72": null, "73": 57, "74": 57, "75": null, "76": 27, "77": 25, "78": 73, "79": 57, "80": 55, "81": null, "82": 38, "83": 27, "84": 27, "85": null, "86": null, "87": null, "88": null, "89": null, "90": 57, "91": 55, "92": 29, "93": 57, "94": 57, "95": 58, "96": 57, "97": 27, "98": 27, "99": 19, "100": 19, "101": null, "102": 38, "103": null, "104": null, "105": 57 }, "allBugFrontier": [ "luna-high", "luna-xhigh", "deepseek-flash-1017-high", "deepseek-flash-1017-max", "sol-medium", "sol-high", "sol-xhigh", "sol-max", "astra-xhigh", "fable-max" ], "negativeRatings": 30, "scoreRange": [ -1014.9495327225825, 1301.055799415909 ], "scores": { "sonnet-high": 424.56944482011573, "sol-medium": 151.78006309596367, "opus-medium": 101.09948197512085, "sol-high": 372.37573338915934, "opus-high": 212.12630189849256, "sonnet-xhigh": 201.29735036118927, "sol-xhigh": 750.0800130140528, "opus-xhigh": 366.09045380946515, "grok-high": -626.385770988498, "grok-xhigh": -357.2146343346028, "sonnet-low": -472.8331969510742, "sonnet-medium": -419.09245621033347, "sonnet-max": 810.2831617902291, "opus-low": -464.83576596384796, "opus-max": 699.1369793286426, "sol-low": -457.13315849379865, "sol-max": 818.5608814687143, "astra-low": 288.18802168240995, "astra-medium": 708.1773555608424, "astra-high": 753.7619926292004, "astra-xhigh": 1220.163138461513, "astra-max": 800.7748416057816, "luna-low": -1008.7095327225825, "luna-medium": -1014.9495327225825, "luna-high": -739.8665697596194, "luna-xhigh": -473.65962212232694, "luna-max": -746.0734663113435, "haiku-low": -635.7836067966565, "haiku-medium": -581.1982139733549, "haiku-high": -578.7836067966565, "haiku-xhigh": -632.2458290188787, "haiku-max": -246.8657691628058, "grok-low": -903.2100041030537, "fable-low": 383.1524206038457, "fable-medium": -56.19453721738603, "fable-high": 622.9310223071533, "fable-xhigh": 374.72083960629595, "fable-max": 1301.055799415909, "muse-standard-max": -365.19590448619556, "muse-contributor-max": -365.19590448619556, "muse-wonder-standard-max": 33.901474312285586, "muse-wonder-contributor-max": 33.901474312285586, "kimi-k3-1-pro-max": 145.67095634215104, "deepseek-flash-1017-max": -91.04863623122333, "go-mimo-v2-6-pro": -466.52339494179955, "go-kimi-k3-1-pro-max": 145.67095634215104, "go-glm-5-3-max": -189.6135437416258, "terra-low": -1011.9687919818416, "terra-medium": -904.6182037465476, "terra-high": -847.6182037465476, "terra-xhigh": -958.0722402577037, "terra-max": 184.86918371836532, "antigravity-ultra-5x-argon-high": 584.1147850103022, "go-glm-5-3-flash": -583.4337676166164, "go-mimo-v2-6-flash": -580.8044431168477, "deepseek-flash-1017-high": -365.01085013893214 }
    }
  }
};
// Published v5 inputs and converted task costs from the 2026-11-04 and 2026-11-09 AA snapshots.
const inputs = [
  ["sonnet-high",42,46,1.64,894.0,41.515109087048,46.1934013528139,1.6361294399784785,1],
  ["sol-medium",46,52,0.36,1178.0,46.3468797067114,52.0526137445887,0.3593898648025732,1],
  ["opus-medium",48,54,2.45,598.0,48.2081024960691,53.7490511363636,2.4510894376611723,1],
  ["sol-high",50,55,0.59,718.0,50.3291231936536,55.3761563311688,0.5909853515780825,1],
  ["opus-high",52,58,3.46,424.0,51.8359958227294,57.8455251623377,3.4646622820973185,1],
  ["sonnet-xhigh",50,54,4.09,358.0,49.9240327787242,53.829033495671,4.091984916321919,1],
  ["sol-xhigh",52,57,0.76,558.0,52.458219253291,57.4506561688312,0.7639949356156494,1],
  ["opus-xhigh",57,63,6.05,242.0,57.4447060170507,62.9215042207792,6.047194490848774,1],
  ["grok-high",35,42,6.18,66.0,35.2122962959703,41.6663142857143,6.18359556537658,1],
  ["grok-xhigh",35,42,7.77,54.0,35.4850117067196,41.7679916125541,7.771539401587139,1],
  ["sonnet-low",26,33,0.51,2874.0,25.649704549789,33.3704561688312,0.5113424463897498,1],
  ["sonnet-medium",31,37,0.78,1880.0,30.8195522148431,37.2916567099567,0.7806560352024481,1],
  ["sonnet-max",55,58,10.02,146.0,54.54133407109,58.4996613636364,10.020621343395753,1],
  ["opus-low",35,43,0.98,1496.0,34.752785007759,43.2168683982684,0.9755293224458845,1],
  ["opus-max",59,65,10.04,146.0,59.1060336078904,65.2760308441558,10.036409719512749,1],
  ["sol-low",35,43,0.16,2650.0,34.8029244314559,42.5704755952381,0.16147357831822573,1],
  ["sol-max",55,59,1.27,334.0,54.6087338138148,59.3526158549784,1.2720632679446995,1],
  ["astra-low",43,50,1.42,362.0,43.3349823228524,49.8239466991342,1.4237229635663595,1],
  ["astra-medium",52,57,2.73,188.0,51.5548393864113,56.7978924242424,2.732438933013427,1],
  ["astra-high",55,60,3.24,158.0,54.849838322506,59.9769976190476,3.2385719685518306,1],
  ["astra-xhigh",55,60,3.66,140.0,55.3057468569681,60.3787090367965,3.6589264906126227,1],
  ["astra-max",57,62,6.24,82.0,56.8538559596797,61.7947113636364,6.244666943602518,1],
  ["luna-low",10,19,0.0051,65490.0,9.66610812336462,18.7273721861472,0.005115255188520391,1],
  ["luna-medium",18,25,0.04,8350.0,18.4542156192416,24.9270749458874,0.042201836106537785,1],
  ["luna-high",21,27,0.07,4772.0,21.4290170864582,27.257087012987,0.07294776473194697,1],
  ["luna-xhigh",23,29,0.1,3340.0,23.4508728089378,28.9893617965368,0.10409320921120957,1],
  ["luna-max",28,33,0.15,2226.0,27.8552004938153,33.298545508658,0.15195575732105837,1],
  ["haiku-low",19,27,0.04,36650.0,18.6180055310996,26.8470458874459,0.043757686381988486,1],
  ["haiku-medium",25,32,0.09,16288.0,24.6013254343023,31.8447239718615,0.0917645584066771,1],
  ["haiku-high",30,37,0.16,9162.0,29.874315467743,36.5029166666667,0.15856031956679498,1],
  ["haiku-xhigh",35,41,0.25,5864.0,34.6387759486628,40.5600491883117,0.24836110126596478,1],
  ["haiku-max",36,43,0.41,3576.0,36.4845435880142,42.5384125,0.41100741536816304,1],
  ["grok-low",31,38,2.92,142.0,31.132077602567,37.6871954004329,2.9222013011913153,1],
  ["fable-low",54,62,3.1,194.0,53.9249388799182,61.5679425324675,3.097241904274546,1],
  ["fable-medium",56,65,3.8,158.0,56.4083157101519,64.7613626082251,3.8026050641787634,1],
  ["fable-high",62,70,9.08,66.0,61.8218785440284,69.6450651515152,9.078414777860381,1],
  ["fable-xhigh",62,70,14.83,40.0,62.2167392403357,70.2200483225108,14.828587632511116,1],
  ["fable-max",65,73,26.54,22.0,64.563595756626,72.638859469697,26.53855780398091,1],
  ["muse-standard-max",37,44,2.39,92.0,36.6172039139368,44.0583411255411,2.3857813858107244,1],
  ["muse-contributor-max",37,44,2.39,1146.0,36.6172039139368,44.0583411255411,2.3857813858107244,1],
  ["muse-wonder-standard-max",44,50,6.95,32.0,43.5748225998431,49.5534664502164,6.9520364786062245,1],
  ["muse-wonder-standard-high",41,47,4.56,48.0,40.5266079185604,46.5172061147186,4.560546278670271,1],
  ["muse-wonder-contributor-max",44,50,6.95,394.0,43.5748225998431,49.5534664502164,6.9520364786062245,1],
  ["muse-wonder-contributor-high",41,47,4.56,600.0,40.5266079185604,46.5172061147186,4.560546278670271,1],
  ["muse-ember-standard-max",36,42,0.14,1586.0,36.0212987864912,41.7630534090909,0.1359356168986363,1],
  ["muse-ember-standard-xhigh",34,41,0.12,1850.0,34.1149608609788,40.9369623376623,0.1162277983030469,1],
  ["kimi-k3-1-pro-max",46,51,3.68,60.0,46.4526236744189,50.8937710497836,3.6812002895742055,1],
  ["deepseek-flash-1017-max",33,38,0.6,334.0,32.5896393532027,37.5970801948052,0.60210514783598,1],
  ["go-mimo-v2-6-pro",30,34,0.26,116.0,29.8897833093321,34.2701744047619,0.25718036275876155,1.0011543841255415],
  ["go-minimax-m3-1-flash",29,34,0.49,82.0,29.0595214290458,34.2839878787879,0.49097067348453205,1],
  ["go-step-5-preview",29,37,2.35,12.0,28.5283090216016,36.972620995671,2.3452525606205166,1],
  ["go-kimi-k3-1-pro-max",46,51,3.68,8.0,46.4526236744189,50.8937710497836,3.6812002895742055,1],
  ["go-glm-5-3-max",32,38,5.01,6.0,31.653381843882,37.59005254329,5.009264601719954,1],
  ["go-qwen3-8-max-0902",34,39,10.85,2.0,33.6545627367888,39.2803852813853,10.023891571541945,1.0827208279785372],
  ["terra-low",29,35,0.07,3914.0,29.4169280792131,35.2157104437229,0.07133756205169729,1],
  ["terra-medium",38,43,0.17,1612.0,38.1652076677975,42.6120279761905,0.16880458238389412,1],
  ["terra-high",42,46,0.26,1054.0,42.4344508712563,46.424690530303,0.2592796466169722,1],
  ["terra-xhigh",45,49,0.4,684.0,45.250051789066,49.4166886904762,0.40068900166662513,1],
  ["terra-max",51,55,0.96,286.0,51.3265188577015,54.7359752164502,0.961108031081634,1],
  ["antigravity-ultra-5x-argon-high",50,57,3.84,46.0,50.4121935905389,57.3015892857143,7.682671372515551,0.5],
  ["antigravity-ultra-5x-carbon-high",60,65,3.88,44.0,60.025738829526,65.3103995670996,7.755545745286556,0.5],
  ["antigravity-ultra-5x-carbon-low",54,60,3.59,48.0,54.2206114502924,60.2151701298701,7.186577262951972,0.5],
  ["antigravity-ultra-5x-carbon-medium",58,64,3.29,52.0,58.2587824022788,63.889674025974,6.585776867225546,0.5],
  ["go-glm-5-3-flash",28,34,0.58,206.0,27.803889160883,34.4534900974026,0.5833103440014082,1],
  ["go-glm-5-3-low",23,28,1.57,20.0,23.1079373025379,28.3489622294372,1.5749301149593384,1],
  ["go-mimo-v2-6-flash",27,31,0.13,924.0,26.7276981444568,30.9836839285714,0.12852987084014672,1],
  ["deepseek-flash-1017-high",29,34,0.46,434.0,28.6437391540402,34.3511940476191,0.45619449806633267,1]
];
const plain = value => JSON.parse(JSON.stringify(value));
const near = (actual,wanted) => assert.ok(Math.abs(actual - wanted) < 1e-9,`${actual} != ${wanted}`);
const declaration = name => {const match = code.match(new RegExp('^    const ' + name + ' = .+$','m'));assert.ok(match, name + ' declaration');return match[0];};
const names = ['intelligenceScore','reliableBugs','bugCalibrations','calibration','bugCredit','bugPenalty','bugScore','totalFixes','resetCostFactor','subscriptionTiers','costRanges','multiplierForTier','selectedTier','matchesCostRange','tierMultiplier','tierLabel','effectiveMultiplier','costPerBug','metricValue','rating','bugFloors','defaultBugFloor','bugFloorSteps','defaultIntelligenceFloor','intelligenceFloors','dominates','pareto'];
const valueCode = names.map(declaration).join('\n');
const create = (models = data,basis = 'intelligence',strength = 2) => {
  const context = {models,budget:'best',penaltyStrength:strength,controls:{'intelligence-basis':{value:basis},'early-resets':{checked:false}}};
  return {context,...runInNewContext(valueCode + '\n({' + names.join(',') + '})',context)};
};
assert.equal(Number(html.match(/id="penalty"[^>]*value="([^"]+)"/)[1]),2);
assert.equal(data.length,expected.count);
assert.equal(new Set(data.map(model => model.id)).size,expected.count);
assert.deepEqual(data.map(m => ['id','intelligence','engineering','benchmarkCost','tasks20','aaIntelligenceExact','aaEngineeringExact','aaTaskCostExact','taskPriceFactor'].map(key => m[key])),inputs);
assert.deepEqual(data.slice(0,10).map(m => m.tasks20),expected.firstTenTasks);
assert.deepEqual(data.filter(m => !m.bugHunt).map(m => m.id),expected.noBugIds);
assert.ok(!data.some(m => /sol-5-6|kimi-k3-(low|max)|muse-(standard|contributor)-(low|medium|high|xhigh)|grok-medium/.test(m.id)));
const matchesSearch = runInNewContext(declaration('matchesSearch') + '\nmatchesSearch');
for(const model of data){
  assert.equal(model.aaIndexVersion,'5.0.1');
  assert.equal(model.intelligence,Math.round(model.aaIntelligenceExact));
  assert.equal(model.engineering,Math.round(model.aaEngineeringExact));
  assert.ok(model.benchmarkCost > 0 && model.multiplier > 0 && model.aaSource && model.sourceDate === (/^(fable-|muse-(wonder|ember)-)/.test(model.id) ? '2026-11-09' : '2026-11-04'));
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
// Best uses Go for DeepSeek, Go Plus for GLM, and Ultra for X.
const expectedMultiplier = model => model.provider === 'X Subscription' ? 41.4 : ['go-glm-5-3-max','go-glm-5-3-low'].includes(model.id) ? 3 : model.multiplier;
const expectedTasks = model => 20 * Math.round(expectedMultiplier(model) / model.benchmarkCost * 10) / 10;
const argon = byId('antigravity-ultra-5x-argon-high');
assert.deepEqual([argon.provider,argon.reasoning,argon.multiplier,argon.taskPriceFactor,argon.benchmarkCost,argon.tasks20],['Antigravity Ultra 5x','High',8.7,.5,3.84,46]);
assert.equal(argon.multiplier,Math.round(200 * (30.4375 / 7) / 99.99 * 10) / 10);
assert.ok(!data.some(model => model.model.startsWith('Gemini') && model.provider === 'OpenCode Go'));
near(argon.benchmarkCost,Math.round(argon.aaTaskCostExact * argon.taskPriceFactor * 100) / 100);
assert.deepEqual([argon.bugHunt.id,argon.bugHunt.fixed,argon.bugHunt.extras,argon.bugHunt.cost_usd,argon.bugHunt.n_runs,argon.bugHunt.coverage_runs,argon.bugHunt.date],['Gemini 4 Argon (high effort, Antigravity CLI) - mean of 3',40.7,7.3,7.16,3,3,'2026-10-14']);
assert.equal(create().reliableBugs(argon).length,31);
near(create().metricValue(argon,'bugs'),7.16 / 8.7 / 48);
const refreshedGo = create();
for(const [id,go,plus,runs] of [['deepseek-flash-1017-max',10,5,5],['deepseek-flash-1017-high',10,5,5],['go-glm-5-3-flash',6,4.5,3],['go-glm-5-3-low',1.5,3,0],['go-mimo-v2-6-flash',6,3,3]]){
  const model = byId(id);
  assert.equal(model.multiplier,go);
  assert.equal(model.bugHunt?.n_runs ?? 0,runs);
  for(const [range,multiplier,price] of [[15,go,10],[60,plus,40],['best',Math.max(go,plus),go >= plus ? 10 : 40]]){
    refreshedGo.context.budget = range;
    near(refreshedGo.tierMultiplier(model),multiplier);
    assert.equal(refreshedGo.selectedTier(model).price,price);
    near(refreshedGo.metricValue(model),20 * Math.round(multiplier / model.benchmarkCost * 10) / 10);
  }
}
for(const [effort,general,engineering,cost,tasks] of [['Low',54,60,3.59,48],['Medium',58,64,3.29,52],['High',60,65,3.88,44]]){
  const model = byId('antigravity-ultra-5x-carbon-' + effort.toLowerCase());
  assert.deepEqual([model.reasoning,model.intelligence,model.engineering,model.benchmarkCost,model.tasks20,model.bugHunt],[effort,general,engineering,cost,tasks,undefined]);
}
const carbon = byId('antigravity-ultra-5x-carbon-high');
assert.deepEqual([carbon.reasoning,carbon.benchmarkCost,carbon.tasks20,carbon.bugHunt],['High',3.88,44,undefined]);
near(carbon.benchmarkCost,Math.round(carbon.aaTaskCostExact * carbon.taskPriceFactor * 100) / 100);
for(const model of data.filter(model => /^Gemini 4 (Argon|Carbon)$/.test(model.model))) assert.deepEqual([model.provider,model.multiplier,model.taskPriceFactor],['Antigravity Ultra 5x',argon.multiplier,.5]);
assert.ok(carbon.sourceNote.includes('User-directed') && carbon.sourceNote.includes('subscription availability are not verified'));
assert.equal(byId('go-minimax-m3-1-flash').reasoning,'Max');
assert.equal(byId('go-qwen3-8-max-0902').reasoning,'XHigh');
assert.equal(create().selectedTier(byId('fable-max')).name,'Max $100');
assert.equal(byId('luna-low').benchmarkCost,.0051);
assert.deepEqual(data.filter(m => m.id.startsWith('terra-')).map(m => m.benchmarkCost),[.07,.17,.26,.40,.96]);
for(const [id,fixed,extras,cost,reliable] of [['terra-low',6,5,.30,4],['terra-medium',7.3,7.3,.31,6],['terra-high',9.7,6.7,.56,7],['terra-xhigh',11.3,17,.75,5],['terra-max',40.7,48,3.88,25]]){
  const model = byId(id), bug = model.bugHunt;
  assert.deepEqual([bug.fixed,bug.extras,bug.cost_usd,bug.n_runs,bug.coverage_runs],[fixed,extras,cost,3,3]);
  assert.equal(create().reliableBugs(model).length,reliable);
}
for(const model of data){
  if(model.model === 'Claude Fable 5.2') assert.equal(model.multiplier,30.2);
  else if(model.model === 'GPT-6 Astra') assert.equal(model.multiplier,25.7);
  else if(model.model === 'GPT-6.1 Terra') assert.equal(model.multiplier,13.7);
  else if(model.model === 'GPT-6 Luna') assert.equal(model.multiplier,16.7);
  else if(model.model === 'Claude Opus 5.5') assert.equal(model.multiplier,73.3);
  else if(model.provider === 'Claude') assert.equal(model.multiplier,73.3);
  else if(model.provider === 'ChatGPT') assert.equal(model.multiplier,21.2);
}
for(const model of data.filter(model => ['Claude Opus 5.5','Claude Fable 5.2'].includes(model.model))){
  assert.ok(model.sourceNote.includes('10 November 2026') && model.sourceNote.includes('2119960608816988596'));
  assert.ok(model.sourceNote.includes('not separate') || model.sourceNote.includes('not separately measured'));
}
assert.deepEqual(byId('go-kimi-k3-1-pro-max').bugHunt,byId('kimi-k3-1-pro-max').bugHunt);
assert.deepEqual(byId('muse-standard-max').bugHunt,byId('muse-contributor-max').bugHunt);
// Fable 5.2 replaces every Fable 5.1 row. By user direction each row keeps its Fable 5.1 Bug Hunt result as a placeholder until Bug Hunt publishes Fable 5.2 runs.
const fableRows = data.filter(m => m.model.startsWith('Claude Fable'));
assert.deepEqual(fableRows.map(m => [m.model,m.reasoning,m.aaSource.replace('https://artificialanalysis.ai/models/',''),m.bugHunt.id]),[['Low','claude-fable-5-2-low','Fable 5.1 (low effort)'],['Medium','claude-fable-5-2-medium','Fable 5.1 (medium effort)'],['High','claude-fable-5-2-high','Fable 5.1'],['XHigh','claude-fable-5-2-xhigh','Fable 5.1 (xhigh effort)'],['Max','claude-fable-5-2','Fable 5.1 (max effort)']].map(([effort,slug,run]) => ['Claude Fable 5.2',effort,slug,run]));
for(const model of fableRows) assert.ok(model.sourceNote.includes('keeps the Fable 5.1 result (' + model.bugHunt.id + ') as a placeholder'));
// Muse Wonder and Ember inherit Spark's plan multipliers by inference. Ember is Standard-only; Wonder Full has no API task cost.
assert.deepEqual(byId('muse-wonder-standard-max').bugHunt,byId('muse-wonder-contributor-max').bugHunt);
assert.deepEqual([byId('muse-wonder-standard-max').bugHunt.id,byId('muse-wonder-standard-max').bugHunt.fixed,byId('muse-wonder-standard-max').bugHunt.extras,byId('muse-wonder-standard-max').bugHunt.cost_usd,byId('muse-wonder-standard-max').bugHunt.n_runs],['Muse Wonder 1.0 (max effort, Muse Code, Meta API) - mean of 3',31.7,13.3,27.87,3]);
const newMuse = data.filter(m => /^Muse (Wonder|Ember) /.test(m.model));
assert.deepEqual(newMuse.map(m => [m.id,m.provider,m.reasoning,m.multiplier]),[['muse-wonder-standard-max','Muse Standard','Max',11.1],['muse-wonder-standard-high','Muse Standard','High',11.1],['muse-wonder-contributor-max','Muse Contributor','Max',137],['muse-wonder-contributor-high','Muse Contributor','High',137],['muse-ember-standard-max','Muse Standard','Max',11.1],['muse-ember-standard-xhigh','Muse Standard','XHigh',11.1]]);
assert.ok(!data.some(m => m.model.includes('Wonder Full')));
assert.ok(byId('go-mimo-v2-6-pro').taskPriceFactor > 1 && byId('go-qwen3-8-max-0902').taskPriceFactor > 1);
for(const [basis,facts] of Object.entries(expected.bases)){
  const api = create(data,basis), {context,calibration,reliableBugs,bugCredit,bugPenalty,bugScore,metricValue,rating,pareto} = api;
  assert.equal(api.defaultIntelligenceFloor(),facts.defaultFloor);
  assert.equal(api.defaultIntelligenceFloor(),byId('terra-high')[basis]);
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
assert.ok(readme.includes('v5') && readme.includes('**67 configurations**') && readme.includes('**56 configurations have complete Bug Hunt evidence; 11 are tasks-only'));
console.log('Report checks passed: 67 exact v5.0.1 inputs, both calibration bases and full frontiers, 56 evidence records, signed/zero ratings, inverse penalties, cost direction, task conversion, resets, search, and chart geometry.');

// Cost ranges filter known plan prices and choose the best multiplier per configuration.
const tierAPI = create(), sol = byId('sol-medium'), astra = byId('astra-low');
const grok = byId('grok-high'), deepseek = byId('deepseek-flash-1017-max'), glm = byId('go-glm-5-3-max');
const standard = byId('muse-standard-max'), contributor = byId('muse-contributor-max');
const fable = byId('fable-max'), kimi = byId('kimi-k3-1-pro-max'), sonnet = byId('sonnet-high');
const costOptions = [...html.match(/<select[^>]*id="budget"[^>]*>([\s\S]*?)<\/select>/)[1].matchAll(/<option value="([^" ]+)"( selected)?>([^<]+)<\/option>/g)];
assert.deepEqual(costOptions.map(option => option[1]),['best','5','15','30','60','100','500']);
assert.equal(costOptions.find(option => option[2])[1],'best');
assert.deepEqual(costOptions.map(option => option[3]),['Best','$5','$8–$15','$19–$30','$39–$60','$99–$100','$199–$500']);
assert.ok(tierAPI.matchesCostRange(kimi));
assert.equal(tierAPI.selectedTier(kimi).price,19);
for(const [model,price,multiplier] of [[sol,100,21.2],[astra,100,25.7],[grok,200,41.4],[deepseek,10,10],[glm,40,3],[standard,50,11.1],[contributor,50,137],[argon,99.99,8.7],[fable,100,30.2],[sonnet,20,73.3],[byId('opus-medium'),20,73.3],[kimi,19,11]]){
  assert.equal(tierAPI.selectedTier(model).price,price);
  near(tierAPI.tierMultiplier(model),multiplier);
}
tierAPI.context.budget = 15;
assert.equal(tierAPI.selectedTier(grok),undefined);
assert.equal(tierAPI.matchesCostRange(grok),false);
// Plus only admits its documented fixed Medium effort; no such source configuration is ranked.
const mediumScenario = {...grok,reasoning:'Medium'};
assert.equal(tierAPI.selectedTier(mediumScenario).price,8);
near(tierAPI.tierMultiplier(mediumScenario),20.7);
// Pro API value scales with the fee; per-dollar multipliers remain twice Plus.
for(const [id,plus,pro] of [['terra-low',6.85,13.7],['luna-low',8.35,16.7],['astra-low',12.85,25.7],['sol-medium',10.6,21.2]]){
  const model = byId(id);
  for(const fee of [20,100,200,500]){
    const tier = tierAPI.subscriptionTiers.ChatGPT.find(tier => tier.price === fee);
    const multiplier = tierAPI.multiplierForTier(model,tier);
    near(multiplier,fee === 20 ? plus : pro);
    near(multiplier * fee,plus * 20 * (fee === 20 ? 1 : 2 * fee / 20));
  }
  if(id !== 'sol-medium') assert.ok(model.sourceNote.includes('six windows per week') && model.sourceNote.includes('1xhhrxs'));
}
for(const model of data.filter(model => /Claude (Sonnet|Haiku)/.test(model.model))){
  assert.ok(model.sourceNote.includes('73.3× inferred') && model.sourceNote.includes('not a measured Sonnet/Haiku allowance'));
}
const expectedRanges = [
  [5,[[standard,5,5.6],[contributor,5,68.4]]],
  [15,[[standard,15,9.3],[contributor,15,114],[deepseek,10,10],[glm,10,1.5]]],
  [30,[[sol,20,10.6],[astra,20,12.85],[grok,30,22.08],[sonnet,20,73.3],[byId('opus-medium'),20,73.3],[kimi,19,11]]],
  [60,[[standard,50,11.1],[contributor,50,137],[deepseek,40,5],[glm,40,3],[kimi,39,418/39]]],
  [100,[[sol,100,21.2],[astra,100,25.7],[grok,100,24.84],[argon,99.99,8.7],[sonnet,100,73.3],[byId('opus-medium'),100,73.3],[fable,100,30.2],[kimi,99,1045/99]]],
  [500,[[sol,200,21.2],[astra,200,25.7],[grok,200,41.4],[standard,200,11.1],[contributor,200,137],[sonnet,200,73.3],[byId('opus-medium'),200,73.3],[fable,200,30.2],[kimi,199,2090/199]]]
];
for(const [range,entries] of expectedRanges){
  tierAPI.context.budget = range;
  const allowed = new Set(entries.map(([model]) => model.provider));
  const matching = data.filter(tierAPI.matchesCostRange);
  assert.ok(matching.length && matching.every(model => allowed.has(model.provider)));
  assert.equal(tierAPI.matchesCostRange(kimi),range >= 30);
  for(const [model,price,multiplier] of entries){
    assert.ok(tierAPI.matchesCostRange(model));
    assert.equal(tierAPI.selectedTier(model).price,price);
    near(tierAPI.tierMultiplier(model),multiplier);
    near(tierAPI.metricValue(model),20 * Math.round(multiplier / model.benchmarkCost * 10) / 10);
    if(model.bugHunt) near(tierAPI.costPerBug(model),model.bugHunt.cost_usd * (model.bugHunt.price_factor ?? 1) / multiplier / (model.bugHunt.fixed + model.bugHunt.extras));
  }
  assert.ok(data.filter(model => !allowed.has(model.provider)).every(model => !tierAPI.matchesCostRange(model)));
  assert.equal(tierAPI.matchesCostRange(sonnet),[30,100,500].includes(range));
  for(const model of matching){
    const price = tierAPI.selectedTier(model).price, [low,high] = tierAPI.costRanges[range];
    assert.ok(price >= low && price <= high);
    assert.ok(!tierAPI.tierLabel(model).includes('above cost range'));
  }
}
for(const [range,price] of [[30,20],[100,100],[500,200]]){
  tierAPI.context.budget = range;
  for(const model of data.filter(model => model.provider === 'Claude')){
    if(price === 20 && model.model === 'Claude Fable 5.2'){assert.equal(tierAPI.matchesCostRange(model),false);continue;}
    assert.equal(tierAPI.selectedTier(model).price,price);
    assert.equal(tierAPI.tierMultiplier(model),model.multiplier);
  }
}
// Multiple prices in one range must maximize value rather than prefer the highest price.
tierAPI.subscriptionTiers.ChatGPT.push({price:300,name:'Test',factor:1.5});
tierAPI.context.budget = 500;
assert.equal(tierAPI.selectedTier(sol).price,300);
near(tierAPI.tierMultiplier(sol),31.8);
tierAPI.subscriptionTiers.ChatGPT.pop();
assert.equal(tierAPI.selectedTier(sol).price,200);
tierAPI.context.budget = 30;
const lowCost = tierAPI.costPerBug(sol), ratingBefore = tierAPI.bugScore(sol);
tierAPI.context.budget = 100;
near(tierAPI.costPerBug(sol),lowCost / 2);
assert.equal(tierAPI.bugScore(sol),ratingBefore);
tierAPI.context.controls['early-resets'].checked = true;
near(tierAPI.effectiveMultiplier(sol),21.2 * 7 / 3);
near(tierAPI.costPerBug(sol),lowCost / 2 * 3 / 7);
assert.ok(matchesSearch(grok,'cursor') && matchesSearch(grok,'xai'));
console.log('Cost range checks passed: Best, strict range eligibility, per-model maxima, ties, within-range maxima, task rounding, bug costs, and reset composition.');
