# Subscription Value

[Open the interactive comparison](https://nishimura-katsuo.github.io/subscription-value/).

This project compares model configurations using subscription spending, benchmark task costs, and observed bug-fixing results. The app contains the recorded inputs, calculated results, interactive graphs, and filtered CSV exports. It is a self-contained HTML file hosted through GitHub Pages, with no installation, build step, or external packages.

## Current input snapshot — 27 October 2026

The comparison contains **53 configurations**, each with a current **AA Intelligence Index v5.0** score and **AA Engineering Index** score matched to its recorded model, effort, and fallback/routing definition. Configurations without v5.0 evidence are omitted rather than carried forward with an older index. This removes 17 previous entries, including GPT-5.6 Sol, Kimi K3, GLM Flash, Grok Medium, and all Muse efforts except Max on both subscriptions. Older commits retain the earlier snapshots.

**50 configurations have complete Bug Hunt evidence; three are tasks-only:** MiniMax M3.1 Flash, Step 5 Preview, and Qwen3.8 Max (0902). The Bug Hunt source was checked against its 27 October update. Previously matched evidence is retained unchanged; Terra Low and Medium now have complete three-run means. Their planted fixes / extras / mean run costs are `6 / 5 / $0.30` and `7.3 / 7.3 / $0.31`, with 4 and 6 planted bugs fixed in every run respectively. All five Terra efforts now have bug results. Input-check dates describe this refresh; `bugHunt.date` remains the original run date.

The embedded JSON in [docs/index.html](docs/index.html), configuration details, and CSV exports are the current value record. Each configuration links its exact AA source. Scores are rounded to whole numbers. Task costs are rounded to cents, except subcent costs retain four decimals: Luna Low uses `$0.0051` from AA's exact `$0.005115255…`. Exact source scores and task costs are retained separately for provenance.

## General and Engineering intelligence

The **General / Engineering** selector chooses the score used for task comparisons and bug difficulty calibration. General uses `intelligence` (AA Intelligence Index v5.0); Engineering uses `engineering` (AA Engineering Index). Changing the basis updates task ratings, rating sorting and filters, bug weights and minimum penalty anchor, bug ratings, rankings, Pareto frontiers, details, and CSV exports.

General is the default. The default task floors are **38 General** and **43 Engineering**, selected as comparison thresholds. Each metric/basis combination remembers its own floor. Bugs mode defaults to **No floor** in both bases. Reset all restores General, the default floors, and penalty strength `2`.

**Task throughput always uses AA's General Intelligence Index workload cost**, including when Engineering is selected. The Engineering setting changes the capability comparison and bug calibration; it does not turn that cost into an engineering-specific task cost.

## What a subscription dollar means

Dollar amounts represent **subscription fees**, excluding API credits and on-demand charges. Fable's figures use dollars allocated to its half-plan share, expressed as a full-plan equivalent. API-equivalent costs normalize subscription value; they are not the spending being compared.

A multiplier estimates how much API-equivalent usage a subscription dollar buys. Provider defaults apply unless a model-specific multiplier is listed; each is shared across the model's reasoning levels:

| Subscription | Multiplier used | Basis |
| --- | ---: | --- |
| Claude, except Fable | 58.9× | Supplied estimate derived from SemiAnalysis |
| Claude Fable 5.1 | 24.8× | SemiAnalysis's rounded 12.4× for Max $200/month, divided by Fable's 50% plan allocation |
| ChatGPT, except Astra | 10.6× | Supplied estimate derived from SemiAnalysis |
| GPT-6 Astra | 14.5× | SemiAnalysis's rounded agentic value for ChatGPT Pro $200/month |
| OpenCode Go · DeepSeek Flash 1017 Max | 8× | Published $80 monthly model allowance / $10 subscription |
| OpenCode Go · MiniMax M3.1 Flash | 2× | $20 monthly model allowance / $10 subscription |
| OpenCode Go · MiMo Pro, Step 5, Kimi K3.1 Pro, GLM Max, Qwen Max 0902 | 1.5× | $15 monthly model allowance / $10 subscription |
| Kimi | 11× | User estimate based on legacy-plan reports; not a measured current allowance |
| Cursor | 20.7× | Author's metered usage exports divided by subscription spend |
| Muse Standard | 11.1× ±0.5 | Derived Power Usage value at Standard API prices |
| Muse Contributor | 137× ±39 | Same plan and derivation, valued at Standard API prices |
| Muse Wonder Full | 6.6× (future lead) | Preliminary user estimate; not applied in the app |

These remain **supplied assumptions**, not separate current measurements for every model. The public [SemiAnalysis study of 5 October](https://newsletter.semianalysis.com/p/anthropic-subscriptions-offer-5x) is paywalled; the repository does not contain a complete derivation or the private Cursor exports. Cursor and Kimi allowances cannot be independently refreshed from these public sources. Cursor's observed usage mixed Claude and Grok; applying its full multiplier to Grok assumes both available usage pools can be allocated to it. Fable's allocation normalization does not increase its allowance or include the remaining half-plan's value. Model availability and actual account limits still apply.

### OpenCode Go routes and prices

All Go rows use the **$10/month Go plan** and its [current published terms](https://opencode.ai/v2/docs/console/go/). Allowance multipliers are derived, not measured consumption. Five-hour and weekly limits are 20% and 50% of monthly allowance; Go Plus $40 limits do not apply. Source benchmark performance transfers to the Go route by assumption, requiring the same model revision, reasoning behavior, and applicable context limits.

MiMo and Qwen task costs are conditionally repriced from AA's weighted token-cost breakdown to current Go rates at identical token usage and cache behavior. AA's cache-write rate is inferred as the input rate from complete token/cost accounting, rather than an explicit rate quote. MiMo's exact AA cost is about `$0.25718036`, the Go-matched cost about `$0.25747725`, and the stored rounded task cost `$0.26`. Qwen's corresponding values are `$10.02389157`, `$10.85307618`, and `$10.85`. Their conversion factors are retained in `taskPriceFactor`. **`benchmarkCost` already includes this conversion; never multiply by the factor again.** Other task costs match the recorded source price basis. DeepSeek Flash uses AA peak rates for tasks and the corresponding off-peak basis for Bug Hunt bills.

Raw historical Bug Hunt bills remain source evidence. Do not reprice them without a supported token-price basis. Kimi subscription and Go rows reuse the same performance evidence across different subscription scenarios, rather than representing independent replications. Kimi K3.1 Pro's AA configuration is mapped to Max using its documented default. One failed repo-2 Bug Hunt attempt was rerun; counting it as zero lowers mean planted fixes from 36 to 32. MiMo retains its source Default effort and mixed-judge caveat. GLM Max's single complete run is admitted with a repeatability warning; the accepted effort was not independently measured. Qwen's AA revision is explicitly **0902**, while Go uses an undated alias. Alias equivalence is assumed, and the undated Bug Hunt model cannot establish the same revision, so Qwen remains tasks-only. MiniMax and Step have no matching Bug Hunt runs.

### Muse Standard and Contributor

Only Muse Spark 1.3 **Max** has current matching v5.0 evidence. Standard and Contributor share its AA scores, Standard API task cost, and Bug Hunt evidence. Contributor performance transfers from Standard by assumption, including availability; these are not independent benchmark runs.

The app uses the **$50/month Power Usage** plan. The [original experiment](https://github.com/phuryn/experiments/tree/main/subscription-multipliers/04-muse-code) measured the $15/month High Usage plan on 1 October 2026: Standard `9.3× ±0.4`, Contributor `114× ±33`. [Meta's terms](https://dev.meta.ai/docs/muse-code/subscriptions) describe Power Usage as 20× Everyday versus High Usage's 5×, a 4× allowance ratio for 3.33× the price. Scaling by `1.2` gives the app's rounded `11.1× ±0.5` and `137× ±39`. These are derived values; weekly measurements are extrapolated to monthly value, and five-hour limits can bind sooner. They do not establish unchanged measured quotas after the October subscription update or for every workload.

The input basis remains Standard API prices. Do not additionally apply Contributor's discounted API rates: that counts the discount twice. The experiment's multipliers against Contributor API prices use a different price basis. **Contributor allows Meta to train on submitted content.** Muse Max's five-run Bug Hunt mean spans different Muse Code builds, including split-version runs; replication configuration is explicitly unverified.

### Optional ChatGPT early-reset scenario

**Assume ChatGPT limits reset every 3 days** is off by default. It uses the supplied assumption that limits reset every 3 days on average instead of 7. Enabling it multiplies ChatGPT subscription costs by `3/7`, throughput by `7/3` after task rounding, and effective multipliers by `7/3`. Charts, sorting, frontiers, details, and CSVs reflect it; benchmark ratings do not change. Reset turns it off. This is a scenario assumption, not a verified reset schedule.

## Tasks mode

Inputs are the selected AA intelligence score and the General Intelligence Index cost per task for the exact model/effort configuration:

```text
Tasks / subscription $ = multiplier / benchmarkCost
Displayed tasks at subscription spend B
  = B × round(Tasks / subscription $, 1 decimal)
tasks20 = 20 × round(multiplier / benchmarkCost, 1 decimal)
```

The app rounds tasks per subscription dollar before scaling by spending. Default spending is `$1`; changing it scales throughput linearly without implying that each service offers that plan or quota. The horizontal axis is the selected intelligence score, and the vertical axis is estimated tasks at the selected spend. Floor choices include each distinct score and the basis default.

For example, using multiplier `10.6` and Terra Low's stored task cost `$0.07` gives `151.4` tasks per dollar and `3,028` tasks per `$20`. Reproduce rounding with JavaScript's `Math.round(multiplier / benchmarkCost * 10) / 10 * 20`; languages using ties-to-even can differ.

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

For example, Sol Medium's source mean has `29` planted fixes, `30.5` extras, and `$1.76` run cost. At `10.6×`, cost per total fix is `1.76 / 10.6 / 59.5 ≈ $0.00279055`, displayed near `$0.0028`. The denominator is `59.5`, not its `25` qualifying planted fixes. Costs have no intermediate rounding.

The horizontal axis is bug-fix rating with exponential spacing: `(10^t − 1) / 9`, where `t = (rating − minimum) / (maximum − minimum)`. It supports negative ratings and changes spacing only. The vertical cost axis is inverted and logarithmic, so higher points cost less. Bug-floor steps are 250, widening for large strengths while preserving the selected cutoff. Ratings and unit costs do not scale with the spending scenario.

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
- [Bug Hunt Bench](https://bughunt.productcompass.pm/), [source JSON](https://bughunt.productcompass.pm/data/benchmark.json), and [method](https://bughunt.productcompass.pm/method); source update checked 27 October 2026.
- [OpenCode Go terms](https://opencode.ai/v2/docs/console/go/) and [Meta Muse subscriptions](https://dev.meta.ai/docs/muse-code/subscriptions).
- [SemiAnalysis study](https://newsletter.semianalysis.com/p/anthropic-subscriptions-offer-5x), [Muse multiplier experiment](https://github.com/phuryn/experiments/tree/main/subscription-multipliers/04-muse-code), and author's private Cursor exports for the supplied multiplier assumptions.

## Input field map

The dataset is JSON inside `<script id="comparison-data">` in [docs/index.html](docs/index.html). The app does not fetch inputs at runtime.

| App field | Source or derivation | Notes |
| --- | --- | --- |
| `id`, `model`, `short` | Local identifiers and names | IDs remain unique and stable. |
| `provider` | Subscription used for normalization | Grok uses Cursor; duplicate subscription scenarios can share benchmark evidence. |
| `country` | Model developer's country | Origin remains the developer's even through another subscription; full names support filtering. |
| `reasoning` | Recorded effort | Default, Low, Medium, High, XHigh, or Max. Default preserves an unnamed AA configuration. Document inferred effort mappings. |
| `intelligence`, `engineering` | Rounded AA General v5.0 and Engineering scores | Match version, exact effort, and routing/fallback definition. |
| `aaIndexVersion` | `5.0` | Configurations without matching v5.0 evidence are excluded. |
| `aaIntelligenceExact`, `aaEngineeringExact` | Unrounded source scores | Provenance; calculations use the rounded active score. |
| `aaTaskCostExact` | Unrounded AA General workload cost | Before any Go repricing. |
| `taskPriceFactor` | General workload token-price conversion | Provenance; `benchmarkCost` already includes it. Defaults to 1. |
| `benchmarkCost` | Rounded matched General workload cost per task | USD per task, not token price or total index cost; cents except four decimals below one cent. |
| `multiplier` | Supplied assumption above | Apply across reasoning levels; Fable is per allocated subscription dollar. |
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
2. Select General or Engineering and recompute `tasks20` from the already matched rounded `benchmarkCost`. For bugs, calibrate weights globally in that basis, sum qualifying credit, subtract inverse-difficulty miss penalties, and calculate cost separately from all completed fixes.
3. Apply scenario, mode, search, and floor settings. Search is case-insensitive and comma-separated terms use OR across model, effort, subscription, and country. For example, `opencode go,chatgpt` or `china,haiku`; `us` and `usa` exactly alias United States. Empty terms and surrounding spaces are ignored. Query carries across modes and affects tables, graphs, and exports. `pareto` includes the full-dataset active-basis frontier while preserving the displayed floor.
4. Recompute filtered Pareto membership unless `pareto` requests full-dataset membership. Default task sorting is descending throughput; default bug sorting is ascending cost. Equal numeric sort values retain dataset order. Frontier only limits displayed rows afterward.
5. Compare with filtered CSV output at full precision until formatting. Task screen values use up to one decimal and bug costs up to four; CSV task values use one decimal and bug costs six. Display rounding can hide differences used in dominance comparisons.

## Maintaining the comparison

1. Collect exact-configuration AA v5.0 and Engineering evidence, task-cost price basis, and Bug Hunt dates, superseded status, cost kinds, and complete coverage. Verify allowance assumptions separately from performance evidence.
2. Update embedded data in [docs/index.html](docs/index.html), exact provenance, rounded costs/scores, and `tasks20`. Do not apply `taskPriceFactor` twice. Preserve aggregate fixes versus qualifying coverage and run dates versus check dates.
3. Run `node checks/report.mjs`. Preserve method checks for identities, rounding, eligibility, calibration minima, signed penalties, axes, ties, empty sets, and dominance. Independently recalculate snapshot expectations for counts, frontiers, source values, and derived throughput when inputs change.
4. Preview both metrics and both intelligence bases, defaults, remembered floors, penalty input, search, configuration details, early-reset scenario, and CSV exports. Calculation checks do not fully test the browser or downloaded source accuracy.

The README records the current method and assumptions; rankings and full per-configuration values live in the app and its exports.
