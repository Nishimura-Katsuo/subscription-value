# Real-world Gemini 4 Neon usage economics in Google Antigravity (Nov 2026)

Conventions: Neon API list price $3 input / $0.15 cached read / $15 output per 1M tokens, with thinking billed as output. "Pool" means the shared Antigravity Gemini quota pool. Unless stated otherwise, dollar conversions use the per-call measurement on [subvalue.app (Ultra 5x)](https://subvalue.app/plans/google-ai-ultra-5x/): Ultra 5x holds $600/week, or $150 per five-hour window with 4 windows per week. Neon draws on it at 1x API price, and Argon and Carbon at 3x. Evidence labels: **[receipt]** means per-call telemetry or logs were published; **[anecdote]** means a user's statement with no token or quota receipts; **[derived]** means my own arithmetic.

## Q1. How much Neon use do Ultra 5x / Ultra 20x / Pro users report before hitting five-hour and weekly limits? (every report that pairs volume with quota, converted to API dollars)

### Takeaway
Only four public reports pair Neon volume with quota, and none is a clean measurement.

| Report | Plan | Usage | Quota hit |
|---|---|---|---|
| t/202481 | Ultra 5x | 50 minutes, single agent, Extra effort | ~15% of the week, about $90 of API value |
| OmniRoute issue #20832 | Pro | 61 Neon requests | ~15% of a five-hour window, ~4.8% of the week, about $5 |
| t/203267 | $199.99 Ultra | ~2.6 days of "normal" use | Whole weekly pool drained. Volume not given |
| Bug Hunt Bench | Ultra (tier not stated) | 6+ parallel xhigh legs | Five-hour window ran out after 22–27 minutes |

At a 1x rate, the Ultra 5x week ($600) works out to roughly:
- 16–20 agent-hours of long-context Neon agentic coding at Bug Hunt rates (~$30–38/hour).
- About 35–50 hours at Artificial Analysis rates.
- Only about 5.5 hours at the cache-miss-heavy pace in t/202481.

### Cited Findings
**Report A: t/202481, Ultra 5x, Neon "Extra", 19 Nov 2026 [receipt for tokens; quota % is the user's reading]**
- Plan "Google AI Ultra (5x)", Antigravity v2.33.0 (Windows) / v2.32.2 (Linux), Gemini 4 Neon at "Extra" thinking. A single-threaded coding session of about 50 minutes "consumed ~15% of my weekly Ultra 5x quota". — [discuss.ai.google.dev/t/202481](https://discuss.ai.google.dev/t/202481)
- The poster audited 150 consecutive model calls: 100 cache hits and 48 server-side evictions (`cache_read_tokens = 0`). The 48 misses re-sent 16,850,279 tokens, of which 16,657,578 were redundant history. That was about 95% of the session's ~17.5M uncached input. Without the evictions, the poster expected about 850K uncached input. — [t/202481](https://discuss.ai.google.dev/t/202481)
- Context sizes ran from 100K to 512K. One step shows `in=5,357 cache=511,722 (hit 512K limit`. Turns "routinely take 15–60 seconds". No output-token total was given. — [t/202481](https://discuss.ai.google.dev/t/202481)
- No five-hour-limit figure is given. — [t/202481](https://discuss.ai.google.dev/t/202481)

**Report B: t/202481 reply (Manuel3), Google AI Pro, 20 Nov 2026 [token receipt, no quota %]**
- 8 Neon sessions (Medium, High, XHigh and Orchestrator, plus some Hydrogen): 430 calls and 70.6M input tokens at 35K–380K contexts. Cache hit rate was 88.4% overall (94.9% on warm calls), with ~30.6% partial prefix drops. Antigravity 1.5.12 on Fedora. No quota percentage was given. — [t/202481](https://discuss.ai.google.dev/t/202481)

**Report C: OmniRoute GitHub issue #20832, Google AI Pro (`g1-pro-tier`), around 20 Nov 2026 [quota receipt, no tokens]**
- The quota API snapshot shows `gemini_session` 84.58% remaining and `gemini_weekly` 95.17% remaining. `gemini-4-neon-*` and `gemini-4-hydrogen-*` sit in the same group as `gemini-3-flash`. The separate `gemini_4_argon_weekly` pool showed 99.994%. — [OmniRoute #20832](https://github.com/cheaper-inference/OmniRoute/issues/20832)
- "Over the same window the shared Gemini pool fell about 15%, while the Argon pool moved about 0.006%." The session included 61 successful Neon requests (`gemini-4-neon-medium` / `-xhigh`). — [OmniRoute #20832](https://github.com/cheaper-inference/OmniRoute/issues/20832)

**Report D: t/203267, Google AI Ultra ($199.99/mo), 20 Nov 2026 [screenshot-style quota readout, no volume]**
- The weekly pool drained after "~3 days of normal agy use". The readout says "GEMINI MODELS weekly: 0.00% remaining, refreshing in 98h 16m", and the lockout was "105h 41m 26s at initial trigger". — [discuss.ai.google.dev/t/203267](https://discuss.ai.google.dev/t/203267)
- The readout also says "Disabled: You have hit your weekly limit, the 5-hour limit does not currently apply." The Claude/GPT weekly pool still had 45.48% left. The error read "Individual quota reached. Please upgrade your subscription". The user had subscribed about 2 weeks earlier. The page gives no session count, hours, tokens or effort level. It does not explicitly say the usage was all Neon. — [t/203267](https://discuss.ai.google.dev/t/203267)

**Report E: Bug Hunt Bench Neon xhigh, Ultra subscription [benchmark receipt; see Q2]**
- In 5 of 6 legs, "22 to 27 minutes in, the subscription's five-hour usage window ran out". The wait until reset was about 4.5 hours. — [bughunt benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)

**Pool calibration used for conversions**
- Ultra 5x: "One Gemini pool, worth $600 of use a week at API list prices, $150 in a five-hour window", with 4 windows per week. Measured 19 Nov 2026 from 109 calls through Antigravity CLI 1.5.12. Neon, Hydrogen and Flash are charged at 1x API price, and Carbon and Argon at 3x. — [subvalue.app Ultra 5x](https://subvalue.app/plans/google-ai-ultra-5x/)
- Relation to the other tiers:
  - The Ultra 5x five-hour allowance is 5x Pro's.
  - Its week is 5.7x Pro's, "because it holds 4 five-hour allowances where Pro's holds 3.5".
  - Ultra 20x ($199.99) was "Valued as 4× this plan" and was not measured.
  — [subvalue.app Ultra 5x](https://subvalue.app/plans/google-ai-ultra-5x/)

### Inferences
[derived] Pool sizes implied by subvalue: Pro ≈ $600 / 5.7 ≈ **$105/week** and $150 / 5 = **$30 per five-hour window**. Ultra 20x ≈ **$2,400/week** (assumed, not measured).

**Report A converted (Ultra 5x)**
- Quota side: 15% × $600 = **$90** of Neon list value in 50 minutes.
- Token side:
  - Uncached input: 17.5M × $3 = $52.5.
  - Cached reads: assume ~20–35M tokens over 100 hits at ~200–350K context, × $0.15 = $3–5.
  - Output: not reported. Assume 0.75–1.5M (5–10K per call at Extra; Bug Hunt's xhigh probe thought ~7.8K tokens per call), × $15 = $11–22.
  - Total ≈ **$67–80**.
- Fit: the quota reading ($90) is 1.1–1.35x the token estimate. Given that "~15%" is a rounded reading, this fits a 1x Neon rate.
- Weekly equivalent: 100% / 15% ≈ 6.7 such sessions ≈ **5.6 hours/week of single-agent Neon Extra** at this cache-miss rate. That is ≈ $108/hour, or $90 / 150 calls ≈ $0.60 per call.
- Five-hour window: $150 is 25% of the week, so ~1.7 sessions (≈ 83 minutes) at this pace would exhaust one window.
- Counterfactual with healthy caching: 16.66M tokens move from $3 to $0.15, which saves about $47.5. The session would cost about $20–32 (≈ 3.5–5.5% of the week), or about 18–28 such sessions per week.

**Report B converted (Pro), with no quota reading**
- Input: 62.4M cached × $0.15 = $9.4, plus 8.2M uncached × $3 = $24.6, giving $33.9. This assumes the 88.4% hit rate is token-weighted.
- Output: assume 3–8K per call × 430 calls = 1.3–3.4M × $15 = $19.5–51.
- Total ≈ **$53–85**. That is ≈ 50–80% of a $105 Pro week, or 1.8–2.8 five-hour windows of $30. This is a prediction only: the user posted no quota figure.

**Report C converted (Pro)**
- Five-hour window: a 15.42% drop × $30 = **$4.63**.
- Weekly: a 4.83% drop × $105 = **$5.07**.
- Consistency: the two estimates agree. The session/weekly drop ratio of 3.19 is close to Pro's measured 3.5 windows per week.
- Cost per request: about $0.076–0.083 per Neon request.
- Implied capacity: ≈ **395 Neon requests per Pro five-hour window**, ≈ 1,260 per week.
- Caveat: these were short calls, far cheaper than Report A's $0.60/call at 300–500K context, so the request counts don't transfer to long-context agent work.

**Report D converted ($199.99 Ultra)**
- Timing: the pool was exhausted 168 − 105.7 = **62.3 hours (2.6 days)** into the weekly cycle.
- If this is Ultra 20x at $2,400/week, that is ≈ $38.5 of Neon list value per calendar hour around the clock. At Bug Hunt agent rates (~$30–38/hour per agent) that means ≈ 63–80 agent-hours in 2.6 days, which implies several parallel agents or swarms.
- If the account were metered like Ultra 5x ($600), "3 days of normal use" (~16–20 agent-hours) would be unremarkable.
- I cannot tell which: the post has no volume data, its 20x tier is inferred only from the price, and Ultra 20x has never been measured.

**Hours, days and tasks per week (Ultra 5x, 1x rate, $600)**
- At Bug Hunt rates: xhigh $36.6/hour, high $38.5/hour, medium $31.4/hour, low $29.4/hour, which gives ≈ 16–20 agent-hours per week. One agent would use ≈ 4–5 hours per five-hour window, so a single agent rarely hits the five-hour cap. Four parallel agents would hit it in about an hour.
- At Artificial Analysis rates ($12–17/hour): 35–50 agent-hours per week.
- At Report A's cache-miss rate: ~5.6 hours per week.
- Pro ($105/week): divide all of these by 5.7, giving ≈ 3 hours per week at Bug Hunt rates.

### Gaps
- No user reported an Ultra 20x Neon session with volume and quota together, or a Pro user hitting the weekly limit with volume given.
- No report gives Neon output tokens alongside a quota delta, so every conversion assumes output tokens.
- Reddit (r/google_antigravity, r/Bard) and X posts could not be retrieved. Searches returned no Neon-specific Reddit thread, and Reddit blocks the fetch tool. Reddit anecdotes are therefore missing.
- t/203267 does not confirm that the drained usage was Neon-only or what effort level was used.

## Q2. Does Bug Hunt Bench's data/method say how much subscription quota its Neon runs consumed, and can it give a quota-rate or window-size estimate?

### Takeaway
Bug Hunt does not report quota percentages or per-run token counts in `benchmark.json`. It gives only list-price cost estimates (from the CLI's per-step token counts, sub-agents included), wall times and turns.

The one quota event is at xhigh: with all six xhigh legs launched at once (sharing the laptop, and evidently the account, with another arm), the Ultra five-hour window ran out 22–27 minutes in.

Back-solving puts the window at roughly $45–150 of Neon list value. That is consistent with subvalue's $150 Ultra 5x window at 1x, which suggests the Bug Hunt account is Ultra 5x rather than 20x. The cost figures may also read low.

### Cited Findings
- All four Neon rows (low, medium, high, xhigh) are means of 3 runs, dated 2026-11-19. They used Antigravity CLI 1.5.11 "signed in with a Google AI Ultra subscription instead of an API key". The sign-in lists `gemini-4-neon-low, -medium, -high and -xhigh`. The Ultra tier (5x or 20x) is not stated. — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- The xhigh row (fixed 63/105; runs 65, 63, 61) says "All three runs launched at once, six legs on the laptop." It continues: "FIVE OF THE SIX LEGS WERE RESUMED (run 1 repo 1, run 1 repo 2, run 2 repo 1, run 2 repo 2 and run 3 repo 2): 22 to 27 minutes in, the subscription's five-hour usage window ran out and they stopped before writing a report. After the window reset each continued its own conversation… Wall is working time only… with the 4.5-hour wait removed." — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- xhigh cost and effort figures:
  - Walls were 84.4, 84.2 and 59.1 minutes, and turns were 775, 967 and 689.
  - Cost was "$67.01, $32.39 and $39.62 per run (mean $46.34), a list estimate, not a bill: the runs used subscription quota". It was priced at "$3 input / $0.15 cached input / $15 output… thinking billed as output… SUB-AGENTS INCLUDED". Adding the sub-agents "raised the estimate from the $21.60 first published".
  - "On the Gemini 4 Argon rows the CLI's counts read 10 to 38% below Google's per-call usage, so these may still read low."
  - A probe found that xhigh "thought 7,815 to 7,916 tokens against high's 3,484 to 5,117".
  — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- The high row (57 fixed; walls 50.5/43.2/42.5; turns 488/434/414) cost $30.72, $31.24 and $25.36, a mean of $29.11 (first published as $9.96 before sub-agents were added). "Runs 1 and 2 launched at once (four legs on the laptop); run 3's two legs launched together two hours later". No window exhaustion is noted. — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- The medium row (47.7 fixed; walls 23.8/25.9/23.8; turns 273/277/319) cost $12.40, $11.55 and $14.59, a mean of $12.84. All six legs ran at once, with no window exhaustion noted. Medium thought 3,194–3,246 tokens per probe call, against high's 4,289–4,465. — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- The low row (29.7 fixed; walls 10.6/11.8/10.2; turns 125/140/120) cost $5.54, $5.35 and $4.98, a mean of $5.29. Low thought 1,959–2,400 tokens per probe call. — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- Every Neon row says "Every leg shared the laptop with another arm" and "the Antigravity CLI reports no context accounting". — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- Comparison rows:
  - Carbon high (57.3 fixed, $31.32 mean) and Carbon medium (56, $24.95) ran on an API key through the enterprise gateway, at the $2/$0.10/$10 introductory rate.
  - Carbon low (46 fixed, $7.67) ran on the Ultra subscription.
  - Argon high (40.7, $7.16), medium (39.3, $7.50) and low (35.3, $6.47) ran on an API key at the $2/$10 launch rate. On the high row, "89% of prompt tokens were cache reads".
  — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- The method page text did not expose run details beyond pointing to `data/benchmark.json` and the GitHub `results` folder. — [bughunt method](https://bughunt.productcompass.pm/method); [GitHub results](https://github.com/phuryn/bug-hunt-bench/tree/main/results)

### Inferences
**Window back-solve [derived]**
- Total xhigh list cost is 3 × $46.34 = $139.0.
- If each run's wall is the sum of its two legs (227.7 leg-minutes in total), the work done before the cutoff is about (5 legs × ~24.5 minutes + 1 leg finished in under 25 minutes) / 227.7 ≈ 65%. That is ≈ **$90** drawn by the xhigh legs before the window ran out.
- If wall is the longer leg's time instead, the pre-cutoff share is ≈ 32%, or ≈ **$45**.
- The CLI's possible 10–38% undercount raises this to ≈ $50–125.
- Concurrent arms on the same account (for example, Neon high runs 1–2 were $62 for four legs) would add to the same window.
- The total plausibly reached $85–150 when the window ran out. That matches subvalue's **$150 Ultra 5x window at 1x**.

**What this implies**
- An Ultra 20x window (~$600, assumed) is hard to square with exhaustion at $45–150 unless Neon were charged at about 4x or more.
- Most likely either the account is Ultra 5x or Neon is charged at more than 1x. Given subvalue's measured 1x, Ultra 5x is the likelier reading. The tier is unconfirmed.
- The 4.5-hour wait after a ~25-minute cutoff is consistent with a five-hour window that began roughly when the legs launched.

**Bug Hunt runs per week on Ultra 5x [derived, $600/week at 1x]**

| Effort | Runs/week | Bugs fixed/week | Runs per five-hour window | Fixes per list $ |
|---|---|---|---|---|
| xhigh | 600 / 46.34 = **12.9** | ≈ 816 | 3.2 | 1.36 |
| high | **20.6** | ≈ 1,175 | 5.2 | 1.96 |
| medium | **46.7** | ≈ 2,229 | 11.7 | 3.71 |
| low | **113** | ≈ 3,369 | 28 | 5.6 |

- If the CLI counts read 10–38% low, divide these by 1.1–1.6.

**Same benchmark, Argon and Carbon at 3x on Ultra (launch price) [derived]**
- Carbon high: $31.32 × 3 = $94 per run, or **6.4 runs/week** (366 fixes).
- Carbon medium: $74.85 per run, or 8.0 runs/week (449 fixes).
- Argon high: $21.5 per run, or 27.9 runs/week (1,137 fixes).
- At equal score, Neon high (57 fixed, 20.6 runs/week) delivers **about 3.2x more weekly work than Carbon high (57.3, 6.4 runs/week)**.
- Neon medium beats Carbon medium by about 5.8x per week, with 47.7 vs 56 fixed per run.
- These Carbon/Argon costs assume API-key cache rates (89% cache reads for Argon). In Antigravity they reportedly get 0% cache hits (Q4), so their in-quota cost would be higher still.

### Gaps
- `benchmark.json` has no per-run input, cached, output or reasoning token fields, and no quota-percentage readings.
- The Ultra tier and the account's quota state at launch are not stated.
- Leg-level timing (which arms overlapped in the same window) is not published, which is why the window estimate spans $45–150.
- The GitHub `results` folder might hold per-step token transcripts. I did not fetch it.

## Q3. Do Artificial Analysis pages give tokens/cost per task that, combined with user reports, allow a value estimate?

### Takeaway
Yes. Artificial Analysis embeds `intelligenceIndexCostPerTask` and token counts for every Neon effort level.

- Neon costs $0.75 (Low), $1.91 (Medium), $3.74 (High) and $6.44 (XHigh) per index task.
- At a 1x quota rate, the Ultra 5x $600 week buys ≈ 93 (XHigh), 160 (High), 315 (Medium) or 805 (Low) index tasks.
- Carbon High gets ≈ 52 and Argon High ≈ 40 at their 3x rate.
- Artificial Analysis tasks are cheaper per hour ($12–17/hour) than Bug Hunt's long-context agentic legs ($29–38/hour). Treat them as an upper bound on quota stretch.

### Cited Findings
Embedded JSON on the model pages, read 21 Nov 2026 (`intelligenceIndexCostPerTask.cost.total`, `canonicalIntelligenceIndexTokenCount`, `intelligenceIndexOutputTokensPerTask`, `intelligenceIndexTimePerTask`, `terminalBench40` and the per-evaluation `weightedCostPerTask`) — [AA Gemini 4 Neon](https://artificialanalysis.ai/models/gemini-4-neon); [AA Gemini 4 Carbon](https://artificialanalysis.ai/models/gemini-4-carbon); [AA Gemini 4 Argon](https://artificialanalysis.ai/models/gemini-4-argon):

| Variant | Intelligence Index | $/task (AA price) | Min/task | Output tokens/task (reasoning) | Total index tokens in / out | Terminal-Bench 4.0 score / $ per task |
|---|---|---|---|---|---|---|
| Neon XHigh | 61.4 | 6.445 | 22.3 | 141.6K (80.5K) | 8.12B / 282.7M | 0.636 / 0.670 |
| Neon High | 59.6 | 3.743 | 14.3 | 90.2K (46.3K) | 4.39B / 123.0M | 0.616 / 0.492 |
| Neon Medium | 54.9 | 1.905 | 8.4 | 50.0K (23.9K) | 2.08B / 62.9M | 0.545 / 0.292 |
| Neon Low | 44.1 | 0.745 | 3.7 | 21.7K (8.9K) | 0.77B / 28.3M | 0.328 / 0.128 |
| Carbon High | 60.0 | 7.756 | 36.6 | 122.8K (72.2K) | 7.62B / 204.8M | 0.652 / 1.005 |
| Carbon Medium | 58.3 | 6.586 | 25.5 | 103.0K (56.2K) | 6.45B / 124.0M | 0.606 / 0.882 |
| Carbon Low | 54.2 | 7.187 | 27.0 | 86.2K (32.4K) | 8.23B / 83.9M | 0.626 / 0.857 |
| Argon High | 50.4 | 9.947 | 26.4 | 116.4K (68.3K) | 7.55B / 113.3M | 0.571 / 1.356 |
| Argon Medium | 47.6 | 8.629 | 27.1 | 100.4K (55.1K) | 6.48B / 81.7M | 0.551 / 1.285 |
| Hydrogen High | 50.8 | 1.873 | 9.2 | 85.0K | 5.34B / 110.4M | 0.540 / 0.280 |
| Hydrogen XHigh | 53.9 | 3.160 | 15.9 | 154.4K | 11.27B / 303.6M | 0.535 / 0.366 |

- Artificial Analysis prices Neon at $3/$15 with cacheHitPrice $0.15 (a "95%" cache discount). It prices Carbon and Argon at $4/$20/$0.20, the standard rather than the launch price, and Hydrogen at $1.50/$7.50/$0.075. — [AA Gemini 4 Neon](https://artificialanalysis.ai/models/gemini-4-neon)
- Neon XHigh's per-task cost breakdown is input $4.32: non-cached $0.064, cache read $1.66, cache write $2.59. Output is $2.12 (reasoning $1.21). Artificial Analysis therefore bills cache writes, and most input tokens are cache reads. — [AA Gemini 4 Neon](https://artificialanalysis.ai/models/gemini-4-neon)
- Artificial Analysis lists Neon's release `defaultEffort` as "high". — [AA Gemini 4 Neon](https://artificialanalysis.ai/models/gemini-4-neon)

### Inferences
**Quota dollars per task on Ultra [derived]**
- Neon is charged at 1x, so its quota cost equals the Artificial Analysis cost.
- Carbon and Argon are charged at 3x the $2/$10 launch price, which equals 1.5x the Artificial Analysis figure at $4/$20.
- Per task: Neon XHigh $6.45, High $3.74, Medium $1.91, Low $0.74. Carbon High $11.63, Medium $9.88, Low $10.78. Argon High $14.92, Medium $12.94. Hydrogen High $1.87.

**Tasks per Ultra 5x week ($600)**

| Model | Tasks per week | Per five-hour window |
|---|---|---|
| Neon XHigh | 93 | 23 |
| Neon High | 160 | 40 |
| Neon Medium | 315 | 79 |
| Neon Low | 805 | — |
| Carbon High | 52 | — |
| Carbon Medium | 61 | — |
| Argon High | 40 | — |
| Hydrogen High | 320 | — |

- At near-equal intelligence (Neon High 59.6 vs Carbon High 60.0), Neon fits **≈ 3.1x as many tasks** in the quota.

**Agent-hours per week from Artificial Analysis time per task**
- Neon XHigh $17.3/hour → 34.6 hours; High $15.7/hour → 38.2 hours; Medium $13.6/hour → 44.1 hours; Low $12.1/hour → 49.7 hours.
- Carbon High at 3x quota (≈ $19.1/hour) → 31.5 hours.
- These are about 2x the Bug Hunt hours (Q2), because index tasks carry smaller contexts than 88K-line repo hunts.
- Real long-context Antigravity sessions (Report A) run 3–6x the Artificial Analysis rate when cache evictions hit.

**Value estimate**
- Report A's 15% ($90) equals ≈ 14 Neon XHigh index tasks' worth of quota spent in 50 minutes. Its token-derived cost ($67–80) fits that.
- Report C's $4.6 equals ≈ 2.4 Neon Medium index tasks.
- Monthly value: Ultra 5x is $600 × 4.348 ≈ **$2,609/month of Neon list value**, 26x its $99.99 price. Pro is $105 × 4.348 ≈ $457, 22.8x $19.99. Both assume the full pool is used on Neon at 1x.

### Gaps
- Artificial Analysis gives no Antigravity-harness numbers. Its cache read/write mix reflects its own harness, not Antigravity's implicit caching.
- No Artificial Analysis "coding agent" token count specific to Antigravity exists.
- Carbon/Argon per-task costs at the launch price are my rescaling (half of Artificial Analysis's $4/$20 figure), not published values.

## Q4. Are cached tokens charged against Antigravity quota at the cached price, so that Neon's caching stretches quota?

### Takeaway
Yes, on the best receipt available. subvalue's per-call measurement found Neon cached-input calls charged consistently with the $0.15/M cached rate, and "fresh input, cached reads, output, and thinking all bill consistently at each model's rate". So a cache hit costs Neon 5% of a miss.

That makes cache behaviour the dominant variable in real sessions. Reported Neon hit rates vary widely:
- ~98% (t/203048)
- 88.4% token-level, or 94.9% on warm calls (Pro user)
- 100/148 calls, with 49% misses above 300K context (Ultra 5x)

Google's cache-pool expansion (around 20 Nov) was described as giving "22% more" work per quota.

### Cited Findings
- subvalue, Ultra 5x, 19 Nov 2026. A Neon "Cached input" call cost $0.0153 at API price and used 0.0026% of the week. Neon cached-read calls average $599.2/week (range $599.03–$599.39). "Fresh input, cached reads, output, and thinking all bill consistently at each model's rate." "Every call on the Gemini models is within 1% of its model's figure." — [subvalue.app Ultra 5x](https://subvalue.app/plans/google-ai-ultra-5x/)
- t/203048 (20 Nov): the poster reports Neon at "a ~98% cache hit rate" in the same workflow where `gemini-4-carbon-high` and `gemini-4-argon-high` got 0.00% hits up to 154,080-token contexts. It says cold prefills burn Ultra's 5-hour and weekly quotas "within a few turns". The post gives no quota percentages. — [discuss.ai.google.dev/t/203048](https://discuss.ai.google.dev/t/203048)
- t/202481 (Ultra 5x, Extra) miss rate by context size and by interval between calls (above 300K context). After a miss, the cache re-hit only 38% of the time. The poster calls long contexts "a massive quota trap". — [t/202481](https://discuss.ai.google.dev/t/202481)

| Context | Miss rate |
|---|---|
| 100–200K | 8.6% |
| 200–300K | 30.4% |
| 300–400K | 40.6% |
| 400–500K | 64.5% |

| Interval (above 300K) | Miss rate |
|---|---|
| under 15s | 14% |
| under 40s | 34% |
| under 60s | 42% |
| all intervals | 49% |

- A Pro user in t/202481 saw an 88.4% hit rate (94.9% warm) and 17 of 422 non-cold calls dropping to 0 cache, at 4–31 s gaps. — [t/202481](https://discuss.ai.google.dev/t/202481)
- Digg summary of an X post by @_mohansolo (linked to Varun Mohan; role not stated on the page), ~20 Nov. Gemini quotas were reset, and "caching improvements let users get 22% more done within their quota on Antigravity". "The rollout expanded Neon's cache pool." The hit rate had been "particularly bad for workloads where there was more time between model invocations". A reply from Jack Wotherspoon: "a reset on the way so you can enjoy more Gemini 4 Neon this weekend!" — [Digg](https://digg.com/ai/do6njmen)

### Inferences
- [derived] In Neon at 300K context, a hit costs 300K × $0.15 = $0.045 of quota and a miss costs 300K × $3 = $0.90, 20x as much. At Report A's 1/3 miss rate, input cost is ~8x the all-hit case. That is why Report A burned ~$90 in 50 minutes, against an estimated $20–32 with healthy caching.
- [derived] With 0% hits, Argon and Carbon pay full input at 3x quota rate, so each 150K-context turn costs 150K × $2 × 3 = $0.90 of quota. A cached Neon turn at the same size costs $0.0225, 40x less. This, more than list price, explains why Neon is perceived to stretch quota further.
- The "22% more" figure is a fleet-average claim relayed through Digg, not a receipt. Whether Report A (19 Nov) predates the fix is unknown.

### Gaps
- No receipt shows how cache writes (if any) are charged in Antigravity quota. Artificial Analysis bills Neon cache writes via the API, but Antigravity's implicit caching may not.
- The primary X post was not read directly (Digg summary only).
- No post-fix (after ~20 Nov) Neon cache audit with quota deltas was found.

## Q5. How do caching, token efficiency (tokens per task vs Argon/Carbon) and effort level affect how much Neon work fits in quota?

### Takeaway
Effort is the biggest controllable lever:

- Per Artificial Analysis, each step up roughly doubles Neon's cost per task (Low $0.75, Medium $1.91, High $3.74, XHigh $6.44) for diminishing score gains (44, 55, 60, 61).
- Bug Hunt shows the same pattern: $5.29, $12.84, $29.11 and $46.34 per run for 29.7, 47.7, 57 and 63 bugs fixed.

Neon Medium uses about half the output tokens and a third of the input tokens of Carbon/Argon Medium per Artificial Analysis task. Neon XHigh uses ~15% more output than Carbon High. Combined with the 1x vs 3x quota rate and caching, Neon fits roughly 3–6x more equal-quality work per week than Carbon.

### Cited Findings
- Artificial Analysis per-task output tokens: Neon XHigh 141.6K, High 90.2K, Medium 50.0K, Low 21.7K. Carbon High 122.8K, Medium 103.0K, Low 86.2K. Argon High 116.4K, Medium 100.4K. — [AA Gemini 4 Neon](https://artificialanalysis.ai/models/gemini-4-neon)
- Total Artificial Analysis index input tokens: Neon Medium 2.08B vs Carbon Medium 6.45B and Argon Medium 6.48B. Neon XHigh 8.12B vs Carbon High 7.62B. — [AA Gemini 4 Neon](https://artificialanalysis.ai/models/gemini-4-neon)
- Bug Hunt thinking per probe call through the Ultra sign-in: low 1,959–2,400, medium 3,194–3,246, high 3,484–5,117 (another probe 4,289–4,465), xhigh 7,815–7,916. — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- Bug Hunt turns per run: Neon low 128, medium 290, high 445, xhigh 810, against Carbon high 817 and medium 757. Neon high matched Carbon high's score (57 vs 57.3) in 445 vs 817 turns. — [benchmark.json](https://bughunt.productcompass.pm/data/benchmark.json)
- The launch announcement says: "At its default High thinking level, about 32% lower cost per task than Carbon, so your quota goes further." It lists "Four thinking levels: Low, Medium, High (default), and Extra." — [Neon launch thread t/202301](https://discuss.ai.google.dev/t/gemini-4-neon-and-orchestrator-neon-are-now-available-in-google-antigravity/202301). This **conflicts with the brief's statement that the app defaults to Medium**. Artificial Analysis also lists `defaultEffort: high`. — [AA](https://artificialanalysis.ai/models/gemini-4-neon)
- Neon draws the shared `gemini` pool (with Flash and Hydrogen), not the Argon pool. — [OmniRoute #20832](https://github.com/cheaper-inference/OmniRoute/issues/20832); Neon at 1x, Carbon and Argon at 3x — [subvalue.app](https://subvalue.app/plans/google-ai-ultra-5x/)

### Inferences
- [derived] Weekly Ultra 5x capacity by effort, from Bug Hunt: XHigh 12.9 runs, High 20.6, Medium 46.7, Low 113. Dropping from XHigh to High costs 6 bugs per run (63 to 57) but adds 60% more runs per week. Medium gives 2.7x the bugs fixed per quota dollar of XHigh (3.71 vs 1.36 per $).
- [derived] Google's "32% lower per task than Carbon" roughly matches Artificial Analysis at Carbon's launch price: Neon High $3.74 vs Carbon High $3.88 at $2/$10 is about 4% lower, and vs $7.76 at $4/$20 it is 52% lower. Neither matches exactly. In quota terms (Carbon at 3x launch price, $11.63), Neon High is ~68% cheaper per task, so the in-app saving is larger than Google's API-price claim.
- [derived] Extra and XHigh compounds two costs: about 2x the thinking per call, and longer, deeper contexts (810 turns) where Neon's eviction rate climbs to 40–65% above 300K (t/202481). The Bug Hunt xhigh window exhaustion and Report A both involved the top effort.
- Practical rule from the evidence: use Medium or High, keep contexts under ~200K (miss rate 8.6%), and avoid long idle gaps between calls. These choices stretch quota most.

### Gaps
- No same-task Neon-vs-Argon/Carbon token comparison exists inside the Antigravity harness with cache stats. The Bug Hunt Carbon high/medium and Argon rows ran on API keys, not the subscription.
- How Orchestrator (Neon) sub-agent fan-out affects quota is not quantified, beyond Bug Hunt noting that sub-agents ran in 5–6 of 6 legs and roughly doubled to tripled cost estimates.

## Q6. User sentiment: is Neon seen as "generously subsidized" compared with Argon/Carbon?

### Takeaway
I found no public posts describing Neon as "generous" or "subsidized". Sentiment in the sources I could read runs from complaints about quota drain to cache-bug reports:

- "what am I paying $100/mo for", from an Ultra 5x user
- an Ultra $199.99 user drained in ~3 days
- complaints that Pro users can't access Gemini 4 models

Google's own messaging is more positive: "quota goes further" vs Carbon, a quota reset, and "enjoy more Gemini 4 Neon this weekend". The evidence-based case that Neon is relatively better value (1x vs 3x, caching that works vs 0%) comes from telemetry posts, not sentiment.

### Cited Findings
- Lind (20 Nov) in t/202481: "Need fix now >:c what am I paying $100/mo for >:c". — [t/202481](https://discuss.ai.google.dev/t/202481)
- The t/202481 OP calls long Neon contexts "a massive quota trap rather than an advantage". — [t/202481](https://discuss.ai.google.dev/t/202481)
- t/203267 says the $199.99 Ultra Gemini pool collapsed "prematurely" after ~3 days of normal use, while the Claude/GPT pool stayed at 45%. — [t/203267](https://discuss.ai.google.dev/t/203267)
- t/203048 contrasts Neon's ~98% cache hits with Carbon and Argon's 0%, which "burn through" Ultra quotas. — [t/203048](https://discuss.ai.google.dev/t/203048)
- In the launch thread, no user or staff reply calls Neon generous or quota-hungry. Devjay wrote "Our Ultra plans are just sitting there unused" about access problems. — [t/202301](https://discuss.ai.google.dev/t/gemini-4-neon-and-orchestrator-neon-are-now-available-in-google-antigravity/202301)
- A "Master Evidence Dossier" thread reports Gemini 4 models, "Now Blocking Neon", as unavailable for some paid (Jio Google AI Pro) subscribers. — [t/202461](https://discuss.ai.google.dev/t/master-evidence-dossier-0-4-gemini-4-models-now-blocking-neon-reversed-staff-promises-retroactive-doc-edits-data-training-on-jio-google-ai-pro/202461) (title only, not read in full)
- Google-side messaging: "your quota goes further" (launch post), a quota reset with "22% more" work from caching, and "enjoy more Gemini 4 Neon this weekend". — [t/202301](https://discuss.ai.google.dev/t/gemini-4-neon-and-orchestrator-neon-are-now-available-in-google-antigravity/202301); [Digg](https://digg.com/ai/do6njmen)

### Inferences
- Measured economics favour Neon. It is charged at 1x vs 3x and gets cache hits, and an Ultra 5x week is ≈ $600 of Neon (≈ 26x the subscription price). Even so, the user-visible experience in the first three days is dominated by cache-eviction drain and a ~3-day weekly lockout. The "generously subsidized" framing is therefore not reflected in the forum posts found.
- Subsidy relative to API price is large on paper (Ultra 5x ≈ 26x, Pro ≈ 23x at 1x). It is the same rate as Flash and Hydrogen, though, so Neon is not specially subsidized. Argon and Carbon are specially penalized (3x).

### Gaps
- Reddit (r/google_antigravity, r/Bard), Hacker News and X sentiment on Neon specifically could not be retrieved. Searches returned no relevant threads, and Reddit blocks fetching. This section is therefore based on forum and Digg sources only and may under-represent positive sentiment.
- No YouTube or blog review that reports Neon quota consumption was found. The blogs returned (apidog, evolink, torchtree, aiupdate-kaizen) discuss features and pricing without quota measurements.
