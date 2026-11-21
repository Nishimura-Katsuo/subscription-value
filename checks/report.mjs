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
  "count": 82,
  "noBugIds": [
    "muse-wonder-standard-high",
    "muse-wonder-contributor-high",
    "muse-ember-standard-max",
    "muse-ember-standard-xhigh",
    "go-minimax-m3-1-flash",
    "go-step-5-preview",
    "go-qwen3-8-max-0902",
    "go-glm-5-3-low",
    "sol-6-2-low",
    "sol-6-2-medium",
    "sol-6-2-high",
    "sol-6-2-xhigh",
    "sol-6-2-max",
    "astra-6-2-low",
    "astra-6-2-medium",
    "astra-6-2-high",
    "astra-6-2-xhigh",
    "astra-6-2-max"
  ],
  "firstTenTasks": [894, 1178.0, 598, 718.0, 424, 358, 558.0, 242, 66.0, 54.0],
  "bases": {
    "intelligence": {
      "defaultFloor": 42,
      "defaultTaskCount": 46,
      "allTaskFrontier": ["luna-low", "haiku-low", "haiku-medium", "haiku-high", "haiku-xhigh", "haiku-max", "sol-6-2-low", "sol-6-2-medium", "sol-6-2-high", "sol-6-2-xhigh", "sol-6-2-max", "astra-6-2-high", "astra-6-2-xhigh", "fable-max"],
      "defaultTaskFrontier": ["sol-6-2-medium", "sol-6-2-high", "sol-6-2-xhigh", "sol-6-2-max", "astra-6-2-high", "astra-6-2-xhigh", "fable-max"]
    },
    "engineering": {
      "defaultFloor": 46,
      "defaultTaskCount": 48,
      "allTaskFrontier": ["luna-low", "haiku-low", "haiku-medium", "haiku-high", "haiku-xhigh", "haiku-max", "sol-6-2-low", "sol-6-2-medium", "sol-6-2-high", "sol-6-2-xhigh", "sol-6-2-max", "opus-xhigh", "astra-6-2-high", "fable-medium", "astra-6-2-max", "fable-high", "fable-max"],
      "defaultTaskFrontier": ["sol-6-2-medium", "sol-6-2-high", "sol-6-2-xhigh", "sol-6-2-max", "opus-xhigh", "astra-6-2-high", "fable-medium", "astra-6-2-max", "fable-high", "fable-max"]
    }
  },
  "bugs": {
    "bugCount": 64,
    "evidenceSets": 61,
    "neverFixed": 27,
    "fieldRates": {"1": 0.0, "2": 0.0, "3": 0.0, "4": 0.0, "5": 0.0, "6": 0.0, "7": 0.0, "8": 0.0, "9": 0.0, "10": 0.0, "11": 0.0, "12": 0.0, "13": 0.653551912568306, "14": 0.0, "15": 0.0, "16": 0.7398907103825136, "17": 0.1251366120218579, "18": 0.0, "19": 0.0, "20": 0.8879781420765027, "21": 0.3797814207650273, "22": 0.6666666666666666, "23": 0.35355191256830604, "24": 0.060109289617486336, "25": 0.7344262295081967, "26": 0.3770491803278688, "27": 0.5153005464480874, "28": 0.3628415300546448, "29": 0.6409836065573771, "30": 0.9863387978142076, "31": 0.01092896174863388, "32": 0.10273224043715846, "33": 0.6808743169398908, "34": 0.6786885245901639, "35": 0.21311475409836064, "36": 0.1721311475409836, "37": 0.3262295081967213, "38": 0.13224043715846995, "39": 0.739344262295082, "40": 0.4961748633879781, "41": 0.32295081967213113, "42": 0.060655737704918035, "43": 0.8497267759562842, "44": 0.48415300546448087, "45": 0.7912568306010929, "46": 0.17868852459016393, "47": 0.7027322404371584, "48": 0.0, "49": 0.8349726775956284, "50": 0.7939890710382513, "51": 0.26612021857923496, "52": 0.01092896174863388, "53": 0.06885245901639345, "54": 0.0, "55": 0.07431693989071038, "56": 0.1087431693989071, "57": 0.006557377049180328, "58": 0.0, "59": 0.16775956284153004, "60": 0.5049180327868853, "61": 0.24207650273224043, "62": 0.6038251366120219, "63": 0.0, "64": 0.16721311475409836, "65": 0.0, "66": 0.15245901639344261, "67": 0.01366120218579235, "68": 0.16393442622950818, "69": 0.2825136612021858, "70": 0.4273224043715847, "71": 0.7103825136612022, "72": 0.0, "73": 0.06885245901639345, "74": 0.20327868852459016, "75": 0.00546448087431694, "76": 0.8715846994535519, "77": 0.7721311475409836, "78": 0.1923497267759563, "79": 0.22459016393442624, "80": 0.3726775956284153, "81": 0.04262295081967213, "82": 0.5459016393442623, "83": 0.8415300546448088, "84": 0.8819672131147541, "85": 0.0, "86": 0.0, "87": 0.03825136612021858, "88": 0.08196721311475409, "89": 0.003278688524590164, "90": 0.03278688524590164, "91": 0.30601092896174864, "92": 0.6579234972677596, "93": 0.14207650273224043, "94": 0.12896174863387977, "95": 0.29508196721311475, "96": 0.22295081967213115, "97": 0.5907103825136611, "98": 0.7475409836065574, "99": 0.9316939890710383, "100": 0.8721311475409836, "101": 0.0, "102": 0.5775956284153005, "103": 0.0, "104": 0.0, "105": 0.1092896174863388},
    "scores": {"sonnet-high": 11.409471766848815, "sol-medium": 8.670218579234973, "opus-medium": 9.198542805100182, "sol-high": 13.931420765027323, "opus-high": 9.739708561020036, "sonnet-xhigh": 12.604189435336977, "sol-xhigh": 17.33151183970856, "opus-xhigh": 12.065027322404372, "grok-high": 5.010564663023679, "grok-xhigh": 9.67672131147541, "sonnet-low": 4.4673952641165755, "sonnet-medium": 6.718943533697632, "sonnet-max": 24.563387978142078, "opus-low": 5.621311475409836, "opus-max": 16.276138433515484, "sol-low": 6.752185792349727, "sol-max": 18.860109289617487, "astra-low": 9.349180327868853, "astra-medium": 12.547540983606558, "astra-high": 12.277049180327868, "astra-xhigh": 17.055737704918034, "astra-max": 18.981056466302366, "luna-low": 0.37486338797814206, "luna-medium": 0.42185792349726775, "luna-high": 1.2163934426229508, "luna-xhigh": 2.5923497267759563, "luna-max": 4.7265938069216755, "haiku-low": 2.069398907103825, "haiku-medium": 2.101639344262295, "haiku-high": 3.3866120218579234, "haiku-xhigh": 4.512932604735884, "haiku-max": 5.610109289617486, "grok-low": 4.489981785063752, "fable-low": 15.844535519125683, "fable-medium": 16.033060109289618, "fable-high": 17.412841530054646, "fable-xhigh": 22.31402550091075, "fable-max": 29.282331511839708, "muse-standard-max": 10.94207650273224, "muse-contributor-max": 10.94207650273224, "muse-wonder-standard-max": 10.967941712204007, "muse-wonder-contributor-max": 10.967941712204007, "kimi-k3-1-pro-max": 13.0408014571949, "deepseek-flash-1017-max": 15.295300546448088, "go-mimo-v2-6-pro": 6.71183970856102, "go-kimi-k3-1-pro-max": 13.0408014571949, "go-glm-5-3-max": 4.718579234972678, "terra-low": 0.941712204007286, "terra-medium": 1.6870673952641166, "terra-high": 2.0367941712204005, "terra-xhigh": 2.468306010928962, "terra-max": 17.387795992714025, "antigravity-ultra-5x-argon-high": 18.29471766848816, "antigravity-ultra-5x-argon-medium": 16.290346083788705, "antigravity-ultra-5x-carbon-high": 29.00837887067395, "antigravity-ultra-5x-carbon-low": 20.250273224043717, "antigravity-ultra-5x-carbon-medium": 27.508925318761385, "antigravity-ultra-5x-neon-low": 9.961566484517304, "antigravity-ultra-5x-neon-medium": 21.78087431693989, "antigravity-ultra-5x-neon-high": 28.13752276867031, "antigravity-ultra-5x-neon-xhigh": 33.369945355191255, "go-glm-5-3-flash": 4.989435336976321, "go-mimo-v2-6-flash": 7.745719489981785, "deepseek-flash-1017-high": 15.20360655737705},
    "negativeAtOne": 29,
    "allBugFrontier": ["luna-high", "luna-xhigh", "luna-max", "deepseek-flash-1017-high", "deepseek-flash-1017-max", "sol-xhigh", "sol-max", "antigravity-ultra-5x-carbon-low", "antigravity-ultra-5x-neon-medium", "sonnet-max", "antigravity-ultra-5x-carbon-medium", "antigravity-ultra-5x-neon-high", "antigravity-ultra-5x-carbon-high", "fable-max", "antigravity-ultra-5x-neon-xhigh"],
    "allBugFrontierWithExtras": ["luna-high", "luna-max", "deepseek-flash-1017-high", "deepseek-flash-1017-max", "sol-xhigh", "sol-max", "astra-max", "antigravity-ultra-5x-carbon-low", "antigravity-ultra-5x-neon-medium", "sonnet-max", "antigravity-ultra-5x-carbon-medium", "antigravity-ultra-5x-neon-high", "antigravity-ultra-5x-neon-xhigh"]
  }
};
// Published v5 inputs and converted task costs from the 2026-11-04, 2026-11-09, 2026-11-17, 2026-11-18 and 2026-11-20 AA snapshots.
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
  ["antigravity-ultra-5x-argon-high",50,57,4.97,36.0,50.4121935905389,57.3015892857143,9.946608711550533,0.5],
  ["antigravity-ultra-5x-argon-medium",48,53,4.31,40.0,47.6040598289046,52.7261420995671,8.629243138175465,0.5],
  ["antigravity-ultra-5x-carbon-high",60,65,3.88,44.0,60.025738829526,65.3103995670996,7.755545745286556,0.5],
  ["antigravity-ultra-5x-carbon-low",54,60,3.59,48.0,54.2206114502924,60.2151701298701,7.186577262951972,0.5],
  ["antigravity-ultra-5x-carbon-medium",58,64,3.29,52.0,58.2587824022788,63.889674025974,6.585776867225546,0.5],
  ["antigravity-ultra-5x-neon-low",44,52,0.75,232.0,44.0831506204565,51.9587830627706,0.7452280945089245,1],
  ["antigravity-ultra-5x-neon-medium",55,61,1.9,92.0,54.8622945007349,60.9146628246753,1.9045555241044152,1],
  ["antigravity-ultra-5x-neon-high",60,65,3.74,46.0,59.6189441875232,64.9085861471861,3.7427499092845027,1],
  ["antigravity-ultra-5x-neon-xhigh",61,67,6.44,28.0,61.3982491392674,66.8388920454545,6.444838101104699,1],
  ["go-glm-5-3-flash",28,34,0.58,206.0,27.803889160883,34.4534900974026,0.5833103440014082,1],
  ["go-glm-5-3-low",23,28,1.57,20.0,23.1079373025379,28.3489622294372,1.5749301149593384,1],
  ["go-mimo-v2-6-flash",27,31,0.13,924.0,26.7276981444568,30.9836839285714,0.12852987084014672,1],
  ["deepseek-flash-1017-high",29,34,0.46,434.0,28.6437391540402,34.3511940476191,0.45619449806633267,1],
  ["sol-6-2-low",41,44,0.18,2856,40.552508943285,44.4074372294372,0.18358471526572703,1],
  ["sol-6-2-medium",53,56,0.41,1254,52.6777305876603,56.2089258658009,0.40605590960076604,1],
  ["sol-6-2-high",55,59,0.56,918,54.8898658241942,58.7055365800866,0.563644652221075,1],
  ["sol-6-2-xhigh",56,60,0.65,790,55.7351067246438,59.9179132575758,0.6479676730055945,1],
  ["sol-6-2-max",57,61,1.01,508,57.2576209885477,61.164913474026,1.014379970300768,1],
  ["astra-6-2-low",46,51,0.66,554,45.6504174923967,50.5458653679654,0.661705400010306,1],
  ["astra-6-2-medium",57,60,1.62,226,56.9986252138657,59.9074647186147,1.6176877362867854,1],
  ["astra-6-2-high",60,64,2.07,176,60.0882280338247,63.5706061147186,2.073874957362806,1],
  ["astra-6-2-xhigh",62,65,2.52,146,61.5602325371388,65.1001242965368,2.5211433764120375,1],
  ["astra-6-2-max",62,67,4,92,62.1387990593969,66.6162431277056,3.9979061566801852,1]
];
const plain = value => JSON.parse(JSON.stringify(value));
const near = (actual,wanted) => assert.ok(Math.abs(actual - wanted) < 1e-9,`${actual} != ${wanted}`);
const declaration = name => {const match = code.match(new RegExp('^    const ' + name + ' = .+$','m'));assert.ok(match, name + ' declaration');return match[0];};
const names = ['intelligenceScore','reliableBugs','hasBugCoverage','fixRate','bugIds','bugCalibration','calibration','bugCredit','bugPenalty','bugScore','countExtras','fixLabel','totalFixes','resetCostFactor','subscriptionTiers','costRanges','multiplierForTier','selectedTier','matchesCostRange','tierMultiplier','tierLabel','effectiveMultiplier','costPerBug','metricValue','rating','bugFloors','defaultBugFloor','bugFloorSteps','defaultIntelligenceFloor','intelligenceFloors','dominates','pareto'];
const valueCode = names.map(declaration).join('\n');
const create = (models = data,basis = 'intelligence',strength = 0,extras = false) => {
  const context = {models,budget:'best',penaltyStrength:strength,controls:{'intelligence-basis':{value:basis},'early-resets':{checked:false},'include-extras':{checked:extras}}};
  return {context,...runInNewContext(valueCode + '\n({' + names.join(',') + '})',context)};
};
assert.equal(Number(html.match(/id="penalty"[^>]*value="([^"]+)"/)[1]),0);
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
  const sourceDate = model.model.startsWith('Gemini 4 ') ? '2026-11-20' : model.id.startsWith('astra-6-2-') ? '2026-11-18' : model.id.startsWith('sol-6-2-') ? '2026-11-17' : /^(fable-|muse-(wonder|ember)-)/.test(model.id) ? '2026-11-09' : '2026-11-04';
  assert.ok(model.benchmarkCost > 0 && model.multiplier > 0 && model.aaSource && model.sourceDate === sourceDate);
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
assert.deepEqual([argon.provider,argon.reasoning,argon.multiplier,argon.taskPriceFactor,argon.benchmarkCost,argon.tasks20],['Antigravity Ultra 5x','High',8.7,.5,4.97,36]);
assert.equal(argon.multiplier,Math.round(200 * (30.4375 / 7) / 99.99 * 10) / 10);
assert.ok(!data.some(model => model.model.startsWith('Gemini') && model.provider === 'OpenCode Go'));
near(argon.benchmarkCost,Math.round(argon.aaTaskCostExact * argon.taskPriceFactor * 100) / 100);
assert.deepEqual([argon.bugHunt.id,argon.bugHunt.fixed,argon.bugHunt.extras,argon.bugHunt.cost_usd,argon.bugHunt.n_runs,argon.bugHunt.coverage_runs,argon.bugHunt.date],['Gemini 4 Argon (high effort, Antigravity CLI) - mean of 3',40.7,7.3,7.16,3,3,'2026-10-14']);
assert.equal(create().reliableBugs(argon).length,31);
near(create().metricValue(argon,'bugs'),7.16 / 8.7 / 40.7);
near(create(data,'intelligence',0,true).metricValue(argon,'bugs'),7.16 / 8.7 / 48);
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
// Gemini rows: AA values checked 20 November; Bug Hunt means of three, each already at the multiplier's price basis.
for(const [id,effort,general,engineering,cost,tasks,runId,fixed,extras,runCost,date,reliable] of [
  ['argon-medium','Medium',48,53,4.31,40,'Gemini 4 Argon (medium effort, Antigravity CLI) - mean of 3',39.3,11.3,7.5,'2026-10-14',31],
  ['carbon-low','Low',54,60,3.59,48,'Gemini 4 Carbon (low effort, Antigravity CLI) - mean of 3',46,18,7.67,'2026-11-13',35],
  ['carbon-medium','Medium',58,64,3.29,52,'Gemini 4 Carbon (medium effort, Antigravity CLI) - mean of 3',56,46.7,24.95,'2026-11-10',48],
  ['carbon-high','High',60,65,3.88,44,'Gemini 4 Carbon (high effort, Antigravity CLI) - mean of 3',57.3,25,31.32,'2026-11-10',47],
  ['neon-low','Low',44,52,.75,232,'Gemini 4 Neon (low effort, Antigravity CLI) - mean of 3',29.7,6.3,5.29,'2026-11-19',23],
  ['neon-medium','Medium',55,61,1.9,92,'Gemini 4 Neon (medium effort, Antigravity CLI) - mean of 3',47.7,23,12.84,'2026-11-19',42],
  ['neon-high','High',60,65,3.74,46,'Gemini 4 Neon (high effort, Antigravity CLI) - mean of 3',57,43.7,29.11,'2026-11-19',52],
  ['neon-xhigh','XHigh',61,67,6.44,28,'Gemini 4 Neon (xhigh effort, Antigravity CLI) - mean of 3',63,60.3,46.34,'2026-11-19',56]
]){
  const model = byId('antigravity-ultra-5x-' + id), bug = model.bugHunt;
  assert.deepEqual([model.reasoning,model.intelligence,model.engineering,model.benchmarkCost,model.tasks20],[effort,general,engineering,cost,tasks]);
  near(model.benchmarkCost,Math.round(model.aaTaskCostExact * model.taskPriceFactor * 100) / 100);
  assert.deepEqual([bug.id,bug.fixed,bug.extras,bug.cost_usd,bug.cost_kind,bug.n_runs,bug.coverage_runs,bug.date,bug.price_factor],[runId,fixed,extras,runCost,'list',3,3,date,undefined]);
  assert.equal(create().reliableBugs(model).length,reliable);
  near(create().metricValue(model,'bugs'),runCost / 8.7 / fixed);
  near(create(data,'intelligence',0,true).metricValue(model,'bugs'),runCost / 8.7 / (fixed + extras));
}
const carbon = byId('antigravity-ultra-5x-carbon-high');
assert.deepEqual(data.filter(model => model.model.startsWith('Gemini')).map(model => model.id.replace('antigravity-ultra-5x-','')),['argon-high','argon-medium','carbon-high','carbon-low','carbon-medium','neon-low','neon-medium','neon-high','neon-xhigh']);
// Argon and Carbon reprice AA's standard rates to launch prices; Neon's API price has no launch discount.
for(const model of data.filter(model => model.model.startsWith('Gemini'))) assert.deepEqual([model.provider,model.multiplier,model.taskPriceFactor],['Antigravity Ultra 5x',argon.multiplier,model.model === 'Gemini 4 Neon' ? 1 : .5]);
assert.ok(carbon.sourceNote.includes('Measured quota rate') && carbon.sourceNote.includes('3.00×') && carbon.sourceNote.includes('1 December'));
for(const model of data.filter(model => model.model === 'Gemini 4 Neon')) assert.ok(model.sourceNote.includes('User-directed') && model.sourceNote.includes('No Neon quota measurement exists') && model.sourceNote.includes('likely a lower bound'));
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
  else if(['GPT-6 Astra','GPT-6.2 Sol'].includes(model.model)) assert.equal(model.multiplier,25.7);
  else if(model.model === 'GPT-6.2 Astra') assert.equal(model.multiplier,2 * (Math.round(12.85 * Math.min(6/5,50/45) * 4/6.24 * 100) / 100));
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
const fableRows = data.filter(m => m.model.startsWith('Claude Fable'));
assert.deepEqual(fableRows.map(m => m.reasoning),['Low','Medium','High','XHigh','Max']);
for(const [index, [fixed,extras,cost,runs,reliable]] of [
  [41,14.5,24.32,2,36],
  [41.5,17.5,26.55,2,36],
  [43,16.5,46.67,2,38],
  [49,16.7,61.01,3,37],
  [58,24.7,139.65,3,47]
].entries()){
  const model = fableRows[index], bug = model.bugHunt, effort = model.reasoning.toLowerCase();
  const slug = effort === 'max' ? 'claude-fable-5-2' : 'claude-fable-5-2-' + effort;
  assert.equal(model.model,'Claude Fable 5.2');
  assert.equal(model.aaSource,'https://artificialanalysis.ai/models/' + slug);
  assert.equal(bug.id,'Fable 5.2 (' + effort + ' effort) - mean of ' + runs);
  assert.deepEqual([bug.fixed,bug.extras,bug.cost_usd,bug.n_runs,bug.coverage_runs,bug.cost_kind],[fixed,extras,cost,runs,runs,'list']);
  assert.equal(create().reliableBugs(model).length,reliable);
}
// Muse Wonder and Ember inherit Spark's plan multipliers by inference. Ember is Standard-only; Wonder Full has no API task cost.
assert.deepEqual(byId('muse-wonder-standard-max').bugHunt,byId('muse-wonder-contributor-max').bugHunt);
assert.deepEqual([byId('muse-wonder-standard-max').bugHunt.id,byId('muse-wonder-standard-max').bugHunt.fixed,byId('muse-wonder-standard-max').bugHunt.extras,byId('muse-wonder-standard-max').bugHunt.cost_usd,byId('muse-wonder-standard-max').bugHunt.n_runs],['Muse Wonder 1.0 (max effort, Muse Code, Meta API) - mean of 3',31.7,13.3,27.87,3]);
const newMuse = data.filter(m => /^Muse (Wonder|Ember) /.test(m.model));
assert.deepEqual(newMuse.map(m => [m.id,m.provider,m.reasoning,m.multiplier]),[['muse-wonder-standard-max','Muse Standard','Max',11.1],['muse-wonder-standard-high','Muse Standard','High',11.1],['muse-wonder-contributor-max','Muse Contributor','Max',137],['muse-wonder-contributor-high','Muse Contributor','High',137],['muse-ember-standard-max','Muse Standard','Max',11.1],['muse-ember-standard-xhigh','Muse Standard','XHigh',11.1]]);
assert.ok(!data.some(m => m.model.includes('Wonder Full')));
assert.ok(byId('go-mimo-v2-6-pro').taskPriceFactor > 1 && byId('go-qwen3-8-max-0902').taskPriceFactor > 1);
for(const [basis,facts] of Object.entries(expected.bases)){
  const api = create(data,basis), {context,calibration,bugIds,fixRate,bugCredit,bugPenalty,bugScore,metricValue,rating,pareto} = api;
  assert.equal(api.defaultIntelligenceFloor(),facts.defaultFloor);
  assert.equal(api.defaultIntelligenceFloor(),byId('terra-high')[basis]);
  assert.equal(data.filter(m => rating(m) >= facts.defaultFloor).length,facts.defaultTaskCount);
  assert.deepEqual(plain(pareto(data).map(m => m.id)),facts.allTaskFrontier);
  assert.deepEqual(plain(pareto(data.filter(m => rating(m) >= facts.defaultFloor)).map(m => m.id)),facts.defaultTaskFrontier);
  assert.deepEqual(plain(pareto(data.filter(m => metricValue(m,'bugs') !== null),'bugs').map(m => m.id)),expected.bugs.allBugFrontier);
  assert.equal(data.filter(m => bugScore(m) !== null).length,expected.bugs.bugCount);
  assert.equal(data.filter(m => bugScore(m) !== null && bugScore(m) < 0).length,0);
  assert.equal(calibration().evidenceSets,expected.bugs.evidenceSets);
  for(const id of bugIds) near(calibration().fieldRates[id],expected.bugs.fieldRates[id]);
  assert.equal(bugIds.filter(id => calibration().fieldRates[id] === 0).length,expected.bugs.neverFixed);
  assert.deepEqual(plain(api.intelligenceFloors()),[...new Set(data.map(m => m[basis]))].sort((a,b) => a-b));
  for(const model of data){
    assert.equal(rating(model),model[basis]);
    assert.equal(metricValue(model),expectedTasks(model));
    if(!model.bugHunt){assert.equal(bugScore(model),null);assert.equal(metricValue(model,'bugs'),null);continue;}
    near(bugScore(model),expected.bugs.scores[model.id]);
    near(bugCredit(model),bugIds.reduce((sum,id) => sum + (model.bugHunt.bug_hits[id] ?? 0) / model.bugHunt.n_runs * (1 - expected.bugs.fieldRates[id]),0));
    assert.equal(bugPenalty(model),0);
    near(metricValue(model,'bugs'),model.bugHunt.cost_usd * (model.bugHunt.price_factor ?? 1) / expectedMultiplier(model) / model.bugHunt.fixed);
  }
  assert.equal(api.defaultBugFloor,-Infinity);
  const probe = byId('sol-medium'), baseCost = metricValue(probe,'bugs');
  context.penaltyStrength = 1;
  const basePenalty = bugPenalty(probe);
  near(basePenalty,bugIds.reduce((sum,id) => sum + (1 - fixRate(probe,id)) * expected.bugs.fieldRates[id],0));
  // At strength 1 the difficulty bonus cancels: rating = mean planted fixes - field mean fixes.
  for(const model of data.filter(m => m.bugHunt)){
    const meanFixes = bugIds.reduce((sum,id) => sum + fixRate(model,id),0), fieldFixes = bugIds.reduce((sum,id) => sum + expected.bugs.fieldRates[id],0);
    near(bugScore(model),meanFixes - fieldFixes);
    assert.ok(Math.abs(meanFixes - model.bugHunt.fixed) <= .05);
  }
  assert.equal(data.filter(m => bugScore(m) !== null && bugScore(m) < 0).length,expected.bugs.negativeAtOne);
  for(const strength of [0,.25,1,2,4,1e6]){
    context.penaltyStrength = strength;
    near(bugPenalty(probe),strength * basePenalty);
    near(bugScore(probe),bugCredit(probe) - strength * basePenalty);
    assert.equal(metricValue(probe,'bugs'),baseCost);
    assert.ok(api.bugFloorSteps().length <= 21);
  }
  context.penaltyStrength = 0;
  context.controls['early-resets'].checked = true;
  for(const model of data){
    const factor = model.provider === 'ChatGPT' ? 3/7 : 1;
    assert.equal(api.resetCostFactor(model),factor);
    assert.equal(api.effectiveMultiplier(model),expectedMultiplier(model) / factor);
    assert.equal(metricValue(model),expectedTasks(model) / factor);
    if(model.bugHunt) near(metricValue(model,'bugs'),model.bugHunt.cost_usd * (model.bugHunt.price_factor ?? 1) / expectedMultiplier(model) / model.bugHunt.fixed * factor);
    if(model.bugHunt) near(bugScore(model),expected.bugs.scores[model.id]);
  }
  context.controls['early-resets'].checked = false;
  context.controls['include-extras'].checked = true;
  for(const model of data.filter(m => m.bugHunt)){
    near(metricValue(model,'bugs'),model.bugHunt.cost_usd * (model.bugHunt.price_factor ?? 1) / expectedMultiplier(model) / (model.bugHunt.fixed + model.bugHunt.extras));
    near(bugScore(model),expected.bugs.scores[model.id]);
  }
  assert.deepEqual(plain(pareto(data.filter(m => metricValue(m,'bugs') !== null),'bugs').map(m => m.id)),expected.bugs.allBugFrontierWithExtras);
  assert.equal(api.fixLabel(),'bug fixed');
  context.controls['include-extras'].checked = false;
  assert.equal(api.fixLabel(),'planted bug fixed');
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
const runs = (n,hits,id) => ({bugHunt:{id,n_runs:n,coverage_runs:n,bug_hits:hits}});
// Field fix rates: bug 1 = (1 + 1 + 1/2) / 3, bug 2 = 1/3, bug 3 = 0. Shared evidence ids count once.
const synthetic = [runs(2,{1:2,2:2},'a'),runs(2,{1:2},'b'),runs(2,{1:1},'c'),runs(2,{1:1},'c')];
const sample = create(synthetic);
assert.equal(sample.calibration().evidenceSets,3);
near(sample.calibration().fieldRates['1'],5 / 6);near(sample.calibration().fieldRates['2'],1 / 3);assert.equal(sample.calibration().fieldRates['3'],0);
near(sample.calibration().weights['1'],1 / 6);near(sample.calibration().weights['2'],2 / 3);assert.equal(sample.calibration().weights['3'],1);
for(const [hits,score] of [[{1:2},1 / 6],[{2:2},2 / 3],[{1:2,2:2},5 / 6],[{2:1},1 / 3],[{3:2},1],[{},0]]) near(sample.bugScore(runs(2,hits,'x')),score);
assert.equal(sample.bugPenalty(runs(2,{1:2},'x')),0);
sample.context.penaltyStrength = 1;
near(sample.bugPenalty(runs(2,{1:2},'x')),1 / 3);
near(sample.bugScore(runs(2,{1:2},'x')),1 - (5 / 6 + 1 / 3));
near(sample.bugScore(runs(2,{2:1},'x')),1 / 3 - (5 / 6 + 1 / 2 * 1 / 3));
assert.ok(sample.bugScore(runs(2,{2:2},'x')) > sample.bugScore(runs(2,{2:1},'x')));
sample.context.penaltyStrength = 2;
assert.ok(sample.bugScore(runs(2,{1:2},'x')) > sample.bugScore(runs(2,{2:2},'x')));
for(const candidate of [{bugHunt:{n_runs:2,coverage_runs:1,bug_hits:{1:1}}},{bugHunt:{n_runs:0,coverage_runs:0,bug_hits:{}}}]) assert.equal(sample.bugScore(candidate),null);
sample.context.controls['intelligence-basis'].value = 'engineering';
near(sample.calibration().fieldRates['1'],5 / 6);
assert.equal(sample.reliableBugs(runs(1,{1:1},'x')).join(','),'1');
assert.equal(sample.reliableBugs({bugHunt:{n_runs:1,coverage_runs:0,bug_hits:{}}}),null);
assert.equal(sample.reliableBugs(runs(3,{1:3,2:2},'x')).join(','),'1');
const {chartX,chartY,labelPosition,shapes,effortOrder,markerPath} = runInNewContext(['chartX','chartY','labelPosition','shapes','effortOrder','polygon','markerPath'].map(declaration).join('\n') + '\n({chartX,chartY,labelPosition,shapes,effortOrder,markerPath})');
assert.equal(chartX(100,100,1100),82);assert.equal(chartX(1100,100,1100),940);assert.equal(chartX(600,100,1100),511);
near(chartX(1100,100,1100)-chartX(1000,100,1100),chartX(200,100,1100)-chartX(100,100,1100));
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
assert.ok(readme.includes('v5') && readme.includes('**82 configurations**') && readme.includes('**64 configurations have complete Bug Hunt evidence in this snapshot and 18 are tasks-only'));
console.log('Report checks passed: 82 exact v5.0.1 inputs, both bases and full frontiers, 64 evidence records, hit-rate bug weights, penalty identities, planted and extras costs, task conversion, resets, search, and chart geometry.');

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
for(const [id,plus,pro] of [['sol-6-2-medium',12.85,25.7],['astra-6-2-max',9.15,18.3],['terra-low',6.85,13.7],['luna-low',8.35,16.7],['astra-low',12.85,25.7],['sol-medium',10.6,21.2]]){
  const model = byId(id);
  for(const fee of [20,100,200,500]){
    const tier = tierAPI.subscriptionTiers.ChatGPT.find(tier => tier.price === fee);
    const multiplier = tierAPI.multiplierForTier(model,tier);
    near(multiplier,fee === 20 ? plus : pro);
    near(multiplier * fee,plus * 20 * (fee === 20 ? 1 : 2 * fee / 20));
  }
  if(id !== 'sol-medium' && id !== 'astra-6-2-max') assert.ok(model.sourceNote.includes('six windows per week') && model.sourceNote.includes('1xhhrxs'));
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
    if(model.bugHunt) near(tierAPI.costPerBug(model),model.bugHunt.cost_usd * (model.bugHunt.price_factor ?? 1) / multiplier / model.bugHunt.fixed);
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
