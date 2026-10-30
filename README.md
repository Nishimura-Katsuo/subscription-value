# Subscription Value

[Open the interactive comparison](https://nishimura-katsuo.github.io/subscription-value/).

This project compares model configurations using subscription spending, benchmark task costs, and observed bug-fixing results. The app contains the recorded inputs, calculated results, interactive graphs, and filtered CSV exports. It is a self-contained HTML file hosted through GitHub Pages, with no installation, build step, or external packages.

## Current input snapshot — 27–28 October 2026

The comparison contains **55 configurations**, each with a current **AA Intelligence Index v5.0** score and **AA Engineering Index** score matched to its recorded model, effort, and fallback/routing definition. Gemini 4 Argon High and Carbon High were added on 28 October; other inputs retain their 27 October snapshot. Configurations without v5.0 evidence are omitted rather than carried forward with an older index. This removes 17 previous entries, including GPT-5.6 Sol, Kimi K3, GLM Flash, Grok Medium, and all Muse efforts except Max on both subscriptions. Older commits retain the earlier snapshots.

**51 configurations have complete Bug Hunt evidence; four are tasks-only:** MiniMax M3.1 Flash, Step 5 Preview, Qwen3.8 Max (0902), and Gemini 4 Carbon High. The Bug Hunt source was checked on 28 October against its 27 October update. Previously matched evidence is retained unchanged; Terra Low and Medium now have complete three-run means. Their planted fixes / extras / mean run costs are `6 / 5 / $0.30` and `7.3 / 7.3 / $0.31`, with 4 and 6 planted bugs fixed in every run respectively. All five Terra efforts now have bug results. Input-check dates describe this refresh; `bugHunt.date` remains the original run date.

The embedded JSON in [docs/index.html](docs/index.html), configuration details, and CSV exports are the current value record. Each configuration links its exact AA source. Scores are rounded to whole numbers. Task costs are rounded to cents, except subcent costs retain four decimals: Luna Low uses `$0.0051` from AA's exact `$0.005115255…`. Exact source scores and task costs are retained separately for provenance.

## General and Engineering intelligence

The **General / Engineering** selector chooses the score used for task comparisons and bug difficulty calibration. General uses `intelligence` (AA Intelligence Index v5.0); Engineering uses `engineering` (AA Engineering Index). Changing the basis updates task ratings, rating sorting and filters, bug weights and minimum penalty anchor, bug ratings, rankings, Pareto frontiers, details, and CSV exports.

General is the default. The default task floors are **38 General** and **43 Engineering**, selected as comparison thresholds. Each metric/basis combination remembers its own floor. Bugs mode defaults to **No floor** in both bases. Reset all restores General, the default floors, and penalty strength `2`.

**Task throughput always uses AA's General Intelligence Index workload cost**, including when Engineering is selected. The Engineering setting changes the capability comparison and bug calibration; it does not turn that cost into an engineering-specific task cost.

## What a subscription dollar means

Dollar amounts represent **subscription fees**, excluding API credits and on-demand charges. Fable's figures use dollars allocated to its half-plan share, expressed as a full-plan equivalent. API-equivalent costs normalize subscription value; they are not the spending being compared.

A multiplier estimates how much API-equivalent usage a subscription dollar buys. The following are recorded baseline estimates, shared across reasoning levels. The monthly budget selects the tier overrides below; it never multiplies graph values:

| Subscription | Multiplier used | Basis |
| --- | ---: | --- |
| Claude, except Fable | 58.9× | Supplied estimate derived from SemiAnalysis |
| Claude Fable 5.1 | 24.8× | SemiAnalysis's rounded 12.4× for Max $200/month, divided by Fable's 50% plan allocation |
| ChatGPT, except Astra | 21.2× | Original 10.6× SemiAnalysis estimate ×2 for the user-reported limit increase |
| GPT-6 Astra | 29× | Original 14.5× agentic value for ChatGPT Pro $200/month ×2 |
| OpenCode Go · DeepSeek Flash 1017 Max | 8× | Published $80 monthly model allowance / $10 subscription |
| OpenCode Go · MiniMax M3.1 Flash | 2× | $20 monthly model allowance / $10 subscription |
| Antigravity Ultra 5x · all Argon and Carbon variants | 8.7× | Argon weekly estimate transferred to all variants by user direction until better evidence is available |
| OpenCode Go · MiMo Pro, Step 5, Kimi K3.1 Pro, GLM Max, Qwen Max 0902 | 1.5× | $15 monthly model allowance / $10 subscription |
| Kimi | 11× | User estimate based on legacy-plan reports; not a measured current allowance |
| X Subscription (provisional) | Tier-dependent; legacy anchor 20.7× | Author's $60 Cursor Pro+ exports, transferred using Cursor's minimum 2× allowance claim |
| Muse Standard | 11.1× ±0.5 | Derived Power Usage value at Standard API prices |
| Muse Contributor | 137× ±39 | Same plan and derivation, valued at Standard API prices |
| Muse Wonder Full | 6.6× (future lead) | Preliminary user estimate; not applied in the app |

On **29 October 2026**, the recorded OpenAI baseline multipliers were doubled by user direction following the reported usage-limit increase for the **$100/$200/$500 tiers**. Only budgets of **$100 and above** select those doubled multipliers. Below $100, ChatGPT uses **10.6×**, or **14.5× for Astra**. Task throughput is recalculated from the selected multiplier before rounding; subscription cost per bug fixed uses the same tier. The optional early-reset scenario applies on top of these updated baselines. Benchmark scores and recorded run costs retain their original snapshots.

These remain **supplied assumptions**, not separate current measurements for every model. The public [SemiAnalysis study of 5 October](https://newsletter.semianalysis.com/p/anthropic-subscriptions-offer-5x) is paywalled; the repository does not contain a complete derivation or the private Cursor exports. The X Subscription allowance is inferred below rather than independently measured; Kimi retains its legacy estimate. Cursor's observed usage mixed Claude and Grok; applying its full multiplier to Grok assumes both available usage pools can be allocated to it. Fable's allocation normalization does not increase its allowance or include the remaining half-plan's value. Model availability and actual account limits still apply.

For a verified model sub-limit with spending allocation fraction `f`, use the same normalization as Fable: divide the model's full-fee multiplier by `f`, and describe spending as allocated subscription dollars. A separate quota pool or higher per-token quota weight alone does not establish `f`; do not invent an allocation uplift. Antigravity's estimate uses weekly usage extrapolated to monthly value, with five-hour windows excluded as requested.

### OpenCode Go routes and prices

Recorded Go baselines use the **$10/month Go plan** and its [current published terms](https://opencode.ai/v2/docs/console/go/). Allowance multipliers are derived, not measured consumption. Five-hour and weekly limits are 20% and 50% of monthly allowance; Go Plus $40 overrides apply when selected by the monthly budget; see the tier table below. Source benchmark performance transfers to the Go route by assumption, requiring the same model revision, reasoning behavior, and applicable context limits.

MiMo and Qwen task costs are conditionally repriced from AA's weighted token-cost breakdown to current Go rates at identical token usage and cache behavior. AA's cache-write rate is inferred as the input rate from complete token/cost accounting, rather than an explicit rate quote. MiMo's exact AA cost is about `$0.25718036`, the Go-matched cost about `$0.25747725`, and the stored rounded task cost `$0.26`. Qwen's corresponding values are `$10.02389157`, `$10.85307618`, and `$10.85`. Their conversion factors are retained in `taskPriceFactor`. **`benchmarkCost` already includes this conversion; never multiply by the factor again.** DeepSeek Flash uses AA peak rates for tasks and the corresponding off-peak basis for Bug Hunt bills.

Raw historical Bug Hunt bills remain source evidence. Do not reprice them without a supported token-price basis. Kimi subscription and Go rows reuse the same performance evidence across different subscription scenarios, rather than representing independent replications. Kimi K3.1 Pro's AA configuration is mapped to Max using its documented default. One failed repo-2 Bug Hunt attempt was rerun; counting it as zero lowers mean planted fixes from 36 to 32. MiMo retains its source Default effort and mixed-judge caveat. GLM Max's single complete run is admitted with a repeatability warning; the accepted effort was not independently measured. Qwen's AA revision is explicitly **0902**, while Go uses an undated alias. Alias equivalence is assumed, and the undated Bug Hunt model cannot establish the same revision, so Qwen remains tasks-only. MiniMax and Step have no matching Bug Hunt runs.

### Gemini Argon and Carbon

**Use the same provisional 8.7× multiplier for all Argon and Carbon variants until better evidence is available.** This is the user's comparison assumption, including Carbon's subscription route and quota transfer. Benchmark scores and costs still require evidence for each exact model and effort; currently AA publishes only High for each, so no Low/Medium scores are invented.

[Gemini 4 Argon High](https://artificialanalysis.ai/models/gemini-4-argon) now uses **Antigravity Ultra 5x**, replacing its OpenCode Go scenario. Its rounded General / Engineering scores remain **50 / 57**. A [26 October Ultra 5x measurement](https://www.reddit.com/r/google_antigravity/comments/1xfnvds/measured_antigravity_bills_gemini_4_argon_at_3x/) implies **$200/week of Argon API-equivalent usage at launch prices**. Using a mean calendar month gives `$200 × (30.4375 / 7) / $99.99 = 8.6973×`, stored as **8.7×**. The [monthly subscription price](https://one.google.com/intl/en/about/google-ai-plans/?gl=US) is $99.99. This is an estimate from sampled token/quota deltas, not a published Google allowance or a measured full-month depletion. Only weekly usage enters this calculation; five-hour windows are excluded.

The report observes Argon and Flash sharing the Gemini weekly pool, calibrated at about $600/week using Flash's API prices. Argon's inferred internal quota rates are `$6 / $30 / $0.30` per million input / output / cached-read tokens, three times its launch API prices. That yields `$600 / 3 = $200/week` of Argon API value. The 3× burn rate is **not a one-third maximum allocation**. No verified Fable-like fractional Argon cap was found, so the app uses the full subscription fee without an allocation uplift. All Gemini weekly usage is assumed available for Argon; the separate Claude/GPT pool and other bundle benefits are not valued. The experiment did not exhaust the pool to rule out an undisclosed additional cap. Its quota observations include Medium, with a [separate High cross-check](https://discuss.ai.google.dev/t/gemini-4-argon-draws-antigravity-quota-at-3x-gemini-3-8-flash-per-published-dollar-clean-a-b-same-bucket/196351); transferring quota behavior across efforts remains an assumption.

AA's exact standard-price task cost is `$7.682671372515551`. To match the multiplier's launch-price basis of `$2 / $10 / $0.10`, half AA's `$4 / $20 / $0.20`, `taskPriceFactor = 0.5` gives `$3.84` per task after rounding. The recorded baseline is **tasks20 = 46**, or **2.3 tasks per subscription dollar**, after throughput rounding. Do not apply an additional quota-weight or allocation multiplier. Launch API prices run through **30 November 2026**; refresh both pricing and quota evidence thereafter.

Argon uses the current **Antigravity CLI High mean of three** in [Bug Hunt's source data](https://bughunt.productcompass.pm/data/benchmark.json): **40.7 planted fixes, 7.3 extras, $7.16**, with **31 planted bugs fixed in every run**. The raw source cost already uses launch rates and is **not halved again**. This is a list estimate; one run resumed after a billing limit, and possible long-context premiums remain a source caveat. The separate Gemini CLI run is not combined with it. Transfer of model revision, High reasoning, harness performance, and cache behavior from the source's Antigravity CLI/API gateway to the subscription route is assumed. Argon supplies reliable coverage for six previously unrated bugs, increasing calibration from 56 to **62 bugs** and changing existing ratings in both bases. Low and Medium have Bug Hunt runs but no matching published AA v5.0 configurations, so they remain excluded.

[Gemini 4 Carbon High](https://artificialanalysis.ai/models/gemini-4-carbon) is included in **tasks mode as a user-directed Antigravity Ultra 5x scenario** with Argon's **8.7× multiplier**. Its own AA v5.0 scores are rounded **59 / 65**. Its exact standard-price task cost `$7.755545745286556` becomes `$3.88` after applying `taskPriceFactor = 0.5` to match the multiplier's launch API price basis. That gives recorded **tasks20 = 44**, or **2.2 tasks per subscription dollar**, after throughput rounding. Carbon has no matching Bug Hunt run, so it remains excluded from bugs mode and does not alter bug calibration. No end date for Carbon's launch discount was confirmed; Argon's 30 November expiry is not assumed to apply to Carbon.

**Carbon's subscription availability and quota behavior are unverified.** [Google's launch announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) describes phased access through Fairwind, with wider product access coming later; Carbon is absent from Antigravity's [published model list](https://antigravity.google/docs/models). Its inclusion is a comparison assumption, not a claim of current access. [Antigravity's published quota terms](https://antigravity.google/docs/plans) give no API-dollar allowance. Pro's dedicated Argon weekly pool has a [rough $12/week estimate from one task](https://discuss.ai.google.dev/t/estimating-updated-quota-for-claude-gemini-4-argon/191879), which is too weak to rank here. No spending allocation fraction is verified for a Fable-style normalization. Ultra 20x remains unranked because no equally supported measurement was found; its allowance is not inferred by scaling the plan name.

### Muse Standard and Contributor

Only Muse Spark 1.3 **Max** has current matching v5.0 evidence. Standard and Contributor share its AA scores, Standard API task cost, and Bug Hunt evidence. Contributor performance transfers from Standard by assumption, including availability; these are not independent benchmark runs.

The recorded baseline is the **$50/month Power** plan. The [original experiment](https://github.com/phuryn/experiments/tree/main/subscription-multipliers/04-muse-code) measured High ($15) on 1 October 2026. Current [official plans](https://dev.meta.ai/products/muse-code) list Everyday / High / Power / Maximum at $5 / $15 / $50 / $200 with allowance ratios 1 / 5 / 20 / 80. Only High was measured; the other tiers are derived from its measurement, using `High multiplier × (tier quota / 5) × (15 / tier fee)`. The recorded Power values retain the experiment's rounding from its less-rounded measurements.

| Monthly tier | Standard multiplier | Contributor multiplier |
| --- | ---: | ---: |
| Everyday $5 | 5.6× | 68.4× |
| High $15 | 9.3× | 114× |
| Power $50 | 11.1× | 137× |
| Maximum $200 | 11.1× | 137× |

High's original uncertainties are ±0.4 / ±33; Power's are approximately ±0.5 / ±39. Derived ratios do not eliminate measurement uncertainty. Weekly measurements are extrapolated to monthly value, and five-hour limits can bind sooner. Wonder Full is a **different model**, available on Power/Maximum with no API endpoint; Spark's tier ratios do not establish its API-dollar multiplier. The preliminary 6.6× Wonder Full estimate remains unapplied. [Model availability](https://dev.meta.ai/docs/models).

The input basis remains Standard API prices. Do not additionally apply Contributor's discounted API rates: that counts the discount twice. The experiment's multipliers against Contributor API prices use a different price basis. **Contributor allows Meta to train on submitted content.** Muse Max's five-run Bug Hunt mean spans different Muse Code builds, including split-version runs; replication configuration is explicitly unverified.

### Optional ChatGPT early-reset scenario

**Assume ChatGPT limits reset every 3 days** is off by default. It uses the supplied assumption that limits reset every 3 days on average instead of 7. Enabling it multiplies ChatGPT subscription costs by `3/7`, throughput by `7/3` after task rounding, and effective multipliers by `7/3`. Charts, sorting, frontiers, details, and CSVs reflect it; benchmark ratings do not change. Reset turns it off. This is a scenario assumption, not a verified reset schedule.

## Tasks mode

Inputs are the selected AA intelligence score and the General Intelligence Index cost per task for the exact model/effort configuration:

```text
Tasks / subscription $ = multiplier / benchmarkCost
Displayed tasks / subscription $ = round(selected multiplier / benchmarkCost, 1 decimal)
tasks20 = 20 × round(recorded baseline multiplier / benchmarkCost, 1 decimal)
```

**Default monthly cost range is $20–$30.** The dropdown offers **$5, $8–$15, $20–$30, $40–$60, $100, and $200–$500**. These groups follow the researched multiplier changes rather than arbitrary dollar increments. The separate $5 option preserves Muse Everyday, while $8–$15 includes Muse High and OpenCode Go. $40–$60 includes Go Plus and Muse Power. $100 introduces ChatGPT Pro and X Super; $200–$500 combines X Ultra, Muse Maximum, and the ChatGPT Pro tiers that share the same value multiplier.

Each range selects the highest researched tier whose monthly fee is at or below the **upper end**, without multiplying graph values. Thus $20–$30 uses ChatGPT Plus $20 and X Premium $30. Lower-priced plans remain alternatives; below the cheapest researched tier, its estimate stays visible with an **above cost range** label. This is a value comparison, not an affordability filter. The control stays visible in bugs mode because tiers affect both metrics. Task charts, tables, details, and exports always show tasks per **$1**, and bug charts show subscription dollars per fix. Fixed estimates remain where tier differences are unverified.

The embedded `multiplier` and `tasks20` remain baseline evidence snapshots. Runtime calculations use `tierMultiplier` and recalculate throughput from the selected multiplier and the matched rounded task cost. Early resets apply after throughput rounding. The active multiplier, cost range, numeric range ceiling, tier name, and tier fee are exported to CSV. Intelligence scores and bug difficulty calibration are independent of tiers.

For example, Terra Low at the $20 ChatGPT tier uses `10.6 / $0.07`, rounded to **151.4 tasks per subscription dollar**. At $100, it uses `21.2 / $0.07`, rounded to **302.9**. The $200–$500 range retains the same ChatGPT value as the $100 option.

### Other researched tiers and limits

[Official OpenAI pricing](https://learn.chatgpt.com/docs/pricing) confirms Plus $20 and Pro $100/$200/$500. The October 29 doubling and its scope remain the user's supplied assumption; the public pricing page does not establish that measured API-dollar value. Both lower and higher tier estimates transfer across the recorded model configurations; this does not verify every model's availability on each tier.

[OpenCode Go's current allowance table](https://opencode.ai/v2/docs/console/go/) supports model-specific overrides at **$40**:

| Model group | Go $10 multiplier | Go Plus $40 multiplier |
| --- | ---: | ---: |
| DeepSeek Flash | 8× | 4× |
| MiniMax Flash | 2× | 2× |
| GLM Max | 1.5× | 3× |
| Other included Go models | 1.5× | 1.5× |

Monthly allowances are divided by the actual tier fee; a larger total quota does not necessarily improve value per dollar. Go Teams is a separate per-seat product, so the personal budget does not select it. Independent model pools and five-hour/weekly limits still apply.

For the following subscriptions, the app explicitly labels **fixed estimates; tier differences unverified**, rather than inventing dollar multipliers:

- **Claude:** [Max terms](https://support.claude.com/en/articles/11049741-what-is-the-max-plan) define $100/$200 plans as 5×/20× Pro's **session** allowance. Weekly caps can also bind; these ratios do not verify monthly scaling from the supplied 58.9× baseline. Fable retains its separate allocation-normalized baseline.
- **Kimi:** current Plus/Pro/Max/Ultra prices are $19/$39/$99/$199, with advertised Agent-credit ratios 1/2/5/10. Those are not established Code quota ratios. [Dedicated Code membership rules](https://www.kimi.com/code/docs/en/kimi-code/membership.html) distinguish new and legacy caps and exclude coding quota from Go; the 11× legacy estimate is not transferred to current tiers. [Pricing resource](https://www.kimi.ai/resources/kimi-k2-7-code-pricing).
- **Antigravity:** the [May plan announcement](https://antigravity.google/blog/changes-to-antigravity-plans/) gives broad 1/5/20 token ratios, but predates Argon. [Current quota terms](https://antigravity.google/docs/plans) do not verify these ratios for Argon's separate weekly pools. The sampled Ultra 5x 8.7× estimate stays fixed; Pro/Ultra 20x are not inferred from old ratios.


### Provisional X Subscription value — researched 29 October 2026

[Cursor's current legacy-plan comparison](https://prod.cursor.com/docs/account/pricing/legacy-cursor-plans) maps **Pro+ $60 → Super $100**, and says each comparable new paid plan includes **at least twice the coding usage with Cursor models**. This establishes a conditional bridge that the launch-day forum answers did not quantify for Pro+. It does not establish identical model pricing, cache treatment, or consumption across products.

Using **exactly 2× as the provisional scenario anchor**, Super's multiplier is `20.7 × 60 × 2 / 100 = 24.84`. Other tiers follow [xAI's official quota ratios](https://docs.x.ai/x-subscription/pricing), 1 / 4 / 15 / 50:

| Monthly tier | Quota relative to Plus | Provisional API-dollar multiplier |
| --- | ---: | ---: |
| Plus $8 | 1 | 20.7× |
| Premium $30 | 4 | 22.08× |
| Super $100 | 15 | 24.84× |
| Ultra $200 | 50 | 41.4× |

For tier fee `P` and relative quota `q`, `M = 20.7 × 60 × 2 × (q / 15) / P`. The app uses the full values before normal task rounding, across all recorded Grok efforts. These are **provisional estimates, not measured new-plan allowances or guaranteed lower bounds**. The minimum provider claim does not make the historical allocation assumption a guaranteed floor.

The old 20.7× combined Claude and Grok API-equivalent usage. The scenario retains the existing assumption that this entire value can be assigned to the first-party pool. If fraction `f` of that old dollar value belonged to first-party usage, **multiply every new multiplier by `f`**. The repository preserves the aggregate multiplier, not the raw exports needed to establish `f`; dividing by the $60 fee alone cannot recover it. Claude and other third-party usage are excluded from the new included pool and billed separately. Plus has fixed model settings, so the displayed effort configurations are transfer scenarios rather than verified Plus configurations.

[Usage terms](https://docs.x.ai/x-subscription/usage-limits) say the pool is shared across Cursor, Grok and Grok Bot, with product-dependent consumption. Monthly extrapolation assumes using the available weekly pools; unused usage does not roll over. No value is assigned to X benefits or third-party top-ups. Annual discounts and temporary promotions are excluded.

A [public Ultra usage-meter thread](https://forum.cursor.com/t/usage-meter-after-plan-change-doesnt-match-token-usage-same-model-same-cache-rate/175736) contains token receipts, but does not establish a reliable new-plan dollar allowance. Its 22 October opening post reports 148.2M cached / 2.8M input / 0.8M output tokens for 2.8% of an Ultra allowance; the comparison to legacy 3×/20× plans leaves the plan identity and reset interval unclear. A separate 27 October reply explicitly names the new Ultra/X weekly pool, but lacks a full token-price breakdown. Neither is used to calibrate this scenario.

Legacy subscriptions are closed to new signups, but the [current official policy](https://docs.x.ai/x-subscription/do-i-have-to-switch) permits existing plans to continue; no firm mandatory migration date was found. Cursor staff have said future migration would receive advance notice. This distinction matters when comparing an existing $60 account with a new purchase.

## Bugs mode

Bug Hunt supplies per-bug coverage, aggregate planted and unplanted fix counts, run counts, and source run costs. Match exact model and effort, omit superseded rows, and select the published current mean when available.

### 1. Select qualifying planted fixes

A planted bug qualifies only if fixed in **every recorded run**, with at least one run and complete per-bug coverage. Partial fixes and claimed-only bugs receive no credit. **Single-run results are allowed for every model**, including Luna Low/Medium/High/XHigh, Haiku Low/Medium, and GLM Max. Their source `fixed_bugs` lists provide coverage, but a single run does not establish repeatability. A 100% observed success rate over a few runs is not a guarantee.

### 2. Calibrate difficulty using the selected basis

```text
Bug weight = lowest selected-basis AA score among qualifying recorded solvers
```

All eligible configurations in the embedded dataset participate, including complete single-run results. Calibration is global and independent of text and floor filters. General and Engineering compute separate weights and minimum anchors. Bugs with no qualifying solver remain unrated.

This is an empirical difficulty proxy, not a proven minimum intelligence requirement, official Bug Hunt score, or calibrated difficulty scale. Adding models, changing the basis, or updating evidence can change weights and existing ratings.

### 3. Calculate the bug-fix rating

```text
Difficulty credit = sum of weights of qualifying planted fixes
Minimum difficulty = lowest calibrated weight across all planted bugs
Miss penalty per bug = strength × Minimum difficulty² / that bug's weight
Bug-fix rating = Difficulty credit − penalties for missed rated bugs
```

The rating rewards qualifying fixes and deducts points for each rated planted bug not fixed in every run. Easier misses cost more; there is no arbitrary easy-bug cutoff. **Miss penalty (×)** defaults to `2`; `0` turns deductions off. Fractional nonnegative values are valid. Invalid or overflowing values retain the last valid setting. Reset all restores `2`. Strength affects bug ratings, sorting, frontiers, floor choices, details, per-bug penalties, and CSVs; task scores and cost per fix are unaffected.

At strength `1`, the easiest bug's miss penalty equals its fix credit. Harder fixes provide more effective credit at strengths up to `1`; strengths above `1` increasingly favor easy-bug coverage. Every additional qualifying fix improves the rating at every supported strength. All models receive the same active-basis weights and penalties.

Ratings can be negative when penalties exceed credit. Bugs with no calibrated weight receive neither credit nor penalty; unplanted extras also receive neither because they lack the withheld answer key. Configurations without qualifying calibrated fixes remain unrated. No floor includes signed ratings by default. Details show credit, penalty, and rating rounded for display. CSVs expose these values, minimum calibrated difficulty, calibration size, and strength at full precision.

For a fictional three-bug set with weights `20`, `40`, `80`, a three-run result with hit counts `3`, `3`, `2` earns `60` credit. At strength `2`, its miss penalty is `2 × 20² / 80 = 10`, giving a rating of `50`. Each weight must first be calibrated across the full eligible dataset in the selected basis.

### 4. Estimate subscription cost per total bug fixed

```text
Total fixes = source planted fixes + source unplanted extra fixes
Subscription $ / bug fixed
  = source run cost × supported token-price conversion factor
    / subscription multiplier / total fixes
```

Repeated-run results use the source's published mean fix counts and mean cost: a ratio of means, not a mean of per-run ratios. Single-run results use that run's values. Preserve the source's published precision.

**The axes use different fix sets.** Rating requires qualifying planted fixes. Cost includes all source-reported completed planted fixes and genuine unplanted extras, including fixes not achieved in every run. Partial fixes and claimed-only bugs are excluded. Extras are not checked against the planted answer key, and aggregate counts cannot establish their repeatability.

For example, Sol Medium's source mean has `29` planted fixes, `30.5` extras, and `$1.76` run cost. At `21.2×`, cost per total fix is `1.76 / 21.2 / 59.5 ≈ $0.00139527`, displayed near `$0.0014`. The denominator is `59.5`, not its `25` qualifying planted fixes. Costs have no intermediate rounding.

The horizontal axis is bug-fix rating with exponential spacing: `(10^t − 1) / 9`, where `t = (rating − minimum) / (maximum − minimum)`. It supports negative ratings and changes spacing only. The vertical cost axis is inverted and logarithmic, so higher points cost less. Bug-floor steps are 250, widening for large strengths while preserving the selected cutoff. Changing the cost range leaves ratings fixed and applies the selected plan multipliers to unit costs.

## Pareto frontier and graph lines

A configuration is dominated when another matching configuration is at least as good on both axes and strictly better on one:

| Mode | Better horizontal value | Better vertical value |
| --- | --- | --- |
| Tasks | Higher selected-basis intelligence | More tasks at the same spend |
| Bugs | Higher selected-basis bug-fix rating | Lower subscription cost per bug |

Equal values on both axes do not dominate one another. The frontier normally recalculates within active filters. The `pareto` search term instead includes the full-dataset frontier for the active metric and basis before text/floor filtering. The selected floor still limits displayed points and the solid line without recalculating membership; other search terms combine with it using OR. The early-reset scenario still applies. **Upper-right is better in both graphs.** Solid lines join frontier points; dotted lines join visible efforts in effort order (only for the selected model in bugs mode). Lines do not imply intermediate configurations exist.

## Cost and execution assumptions

- First-party harnesses are assumed. There is no adjustment between Grok Build and Cursor.
- Most Bug Hunt costs are token-based list-rate estimates. Grok's reconstructed costs are lower bounds, so its subscription cost per bug is also a lower bound, marked **≥**. Verified API bills retain their cost kind.
- Benchmarks and API-equivalent usage are proxies. Context, task success, caps, latency, tools, account availability, and product features also affect value.
- Single runs, run variance, route equivalence, fallback definitions, changing prices, and replication caveats limit interpretation. Read each configuration's notes.
- Inputs are recorded snapshots rather than live feeds. Source run dates and input-check dates have different meanings.

## Sources

- [Artificial Analysis intelligence methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking) and [Engineering Index](https://artificialanalysis.ai/indexes/engineering); each embedded `aaSource` links the exact configuration used.
- [Bug Hunt Bench](https://bughunt.productcompass.pm/), [source JSON](https://bughunt.productcompass.pm/data/benchmark.json), and [method](https://bughunt.productcompass.pm/method); 27 October source update checked 28 October 2026.
- [OpenCode Go terms](https://opencode.ai/v2/docs/console/go/) and [Meta Muse subscriptions](https://dev.meta.ai/docs/muse-code/subscriptions).
- [SemiAnalysis study](https://newsletter.semianalysis.com/p/anthropic-subscriptions-offer-5x), [Muse multiplier experiment](https://github.com/phuryn/experiments/tree/main/subscription-multipliers/04-muse-code), and author's private Cursor exports for the supplied multiplier assumptions.

## Input field map

The dataset is JSON inside `<script id="comparison-data">` in [docs/index.html](docs/index.html). The app does not fetch inputs at runtime.

| App field | Source or derivation | Notes |
| --- | --- | --- |
| `id`, `model`, `short` | Local identifiers and names | IDs remain unique and stable. |
| `provider` | Subscription used for normalization | Grok uses the provisional X Subscription route through Cursor; duplicate subscription scenarios can share benchmark evidence. |
| `country` | Model developer's country | Origin remains the developer's even through another subscription; full names support filtering. |
| `reasoning` | Recorded effort | Default, Low, Medium, High, XHigh, or Max. Default preserves an unnamed AA configuration. Document inferred effort mappings. |
| `intelligence`, `engineering` | Rounded AA General v5.0 and Engineering scores | Match version, exact effort, and routing/fallback definition. |
| `aaIndexVersion` | `5.0` | Configurations without matching v5.0 evidence are excluded. |
| `aaIntelligenceExact`, `aaEngineeringExact` | Unrounded source scores | Provenance; calculations use the rounded active score. |
| `aaTaskCostExact` | Unrounded AA General workload cost | Before any Go repricing. |
| `taskPriceFactor` | General workload token-price conversion | Provenance; `benchmarkCost` already includes it. Defaults to 1. |
| `benchmarkCost` | Rounded matched General workload cost per task | USD per task, not token price or total index cost; cents except four decimals below one cent. |
| `multiplier` | Recorded baseline assumption above | Apply across reasoning levels; Fable is per allocated subscription dollar. |
| `tasks20` | `20 × round(multiplier / benchmarkCost, 1 decimal)` | Recompute when either input changes. |
| `aaSource`, `sourceDate`, `sourceNote` | Exact AA URL, input-check date, caveats | Preserve route, inferred mapping, pricing, and subscription assumptions. |
| `bugHunt.id` | Selected source `runs[].id` | Preserve exact row identity. |
| `bugHunt.fixed`, `extras` | Source planted and genuine unplanted fixes | May be published means with decimals. Missing extras is not automatically zero. |
| `bugHunt.cost_usd`, `cost_kind` | Raw source cost and type | Preserve bills, list estimates, and lower bounds without silently repricing. |
| `bugHunt.price_factor` | Optional supported token-price conversion | Defaults to 1; separate from task-price conversion. |
| `bugHunt.n_runs`, `date` | Source run count and recorded date | Do not replace run date with input-check date. |
| `bugHunt.coverage_runs`, `bug_hits` | Coverage count and per-bug run hits | Complete coverage must equal `n_runs`; qualifying hits equal `n_runs`. |
| `bugHunt.source_effort` | Original effort when mapping is inferred | Preserve the source label and explain the inference. |

## Selecting and validating source rows

1. **Match identity before values.** Match model revision, effort, and route/fallback definition. Do not substitute a nearby model or its family's highest score. For unspecified Bug Hunt effort, the user-directed rule maps to the highest published effort for that exact model; retain and disclose the source effort. An unverified revision such as Qwen 0902 stays omitted from bugs mode.
2. **Select current Bug Hunt rows.** Omit nonempty `superseded` rows. Use the published current exact-configuration mean when available, without also counting its component runs or selecting the best run. Resolve differing routes/conditions explicitly.
3. **Keep evidence together.** Fix counts, extras, cost, run count, date, and coverage must come from the same selected row. Retain published precision and historical cost basis.
4. **Validate coverage.** Require complete per-bug coverage, `coverage_runs == n_runs`, and integer hits between zero and `n_runs`. A mean row's `fixed_bugs` list need not be the intersection. For a single run, verify unique `fixed_bugs` IDs match its planted count, then set `coverage_runs = 1` and each hit to `1`; retain its repeatability warning.
5. **Do not guess missing evidence.** No v5.0 score means exclusion from this snapshot. Missing coverage, cost, extras, or a matching run prevents a bug result until verified. Validate finite positive costs and multipliers and finite nonnegative fix counts.
6. **Keep bug IDs consistent.** The implementation assumes the source's 105 planted bugs. A changed bug set requires updating the weighting range and checks as well as the data.

## Reproducing a recorded table

1. Use the embedded dataset from the desired Git commit. Live sources can change; private exports are unnecessary if you accept the supplied multipliers.
2. Select General or Engineering and the monthly budget. Resolve its researched tier multiplier and recompute tasks per dollar from the already matched rounded `benchmarkCost`. For bugs, calibrate weights globally in that basis, sum qualifying credit, subtract inverse-difficulty miss penalties, and calculate cost separately from all completed fixes.
3. Apply scenario, mode, search, and floor settings. Search is case-insensitive and comma-separated terms use OR across model, effort, subscription, and country. For example, `opencode go,chatgpt` or `china,haiku`; `us` and `usa` exactly alias United States. Empty terms and surrounding spaces are ignored. Query carries across modes and affects tables, graphs, and exports. `pareto` includes the full-dataset active-basis frontier while preserving the displayed floor.
4. Recompute filtered Pareto membership unless `pareto` requests full-dataset membership. Default task sorting is descending throughput; default bug sorting is ascending cost. Equal numeric sort values retain dataset order. Frontier only limits displayed rows afterward.
5. Compare with filtered CSV output at full precision until formatting. Task screen values use up to one decimal and bug costs up to four; CSV task values use one decimal and bug costs six. Display rounding can hide differences used in dominance comparisons.

## Maintaining the comparison

1. Collect exact-configuration AA v5.0 and Engineering evidence, task-cost price basis, and Bug Hunt dates, superseded status, cost kinds, and complete coverage. Verify allowance assumptions separately from performance evidence.
2. Update embedded data in [docs/index.html](docs/index.html), exact provenance, rounded costs/scores, and `tasks20`. Do not apply `taskPriceFactor` twice. Preserve aggregate fixes versus qualifying coverage and run dates versus check dates.
3. Run `node checks/report.mjs`. Preserve method checks for identities, rounding, eligibility, calibration minima, signed penalties, axes, ties, empty sets, and dominance. Independently recalculate snapshot expectations for counts, frontiers, source values, and derived throughput when inputs change.
4. Preview both metrics and both intelligence bases, defaults, remembered floors, penalty input, search, configuration details, early-reset scenario, and CSV exports. Calculation checks do not fully test the browser or downloaded source accuracy.

The README records the current method and assumptions; rankings and full per-configuration values live in the app and its exports.
