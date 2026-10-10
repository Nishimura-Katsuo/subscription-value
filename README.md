# Subscription Value

[Open the interactive comparison](https://nishimura-katsuo.github.io/subscription-value/).

This project compares model configurations using subscription spending, benchmark task costs, and observed bug-fixing results. This README documents the process and assumptions. The app contains the recorded inputs, calculated results, and interactive tables and graphs.

## What a subscription dollar means

Dollar amounts represent **subscription fees**, excluding API credits and on-demand charges. API-equivalent costs are inputs used to normalize subscription value; they are not the spending being compared.

A subscription multiplier estimates how much API-equivalent usage a subscription dollar buys. The same provider multiplier is applied across models and reasoning levels:

| Subscription | Multiplier used | Basis |
| --- | ---: | --- |
| Claude | 58.9× | Estimate derived from SemiAnalysis |
| ChatGPT | 10.6× | Estimate derived from SemiAnalysis |
| Cursor | 20.7× | Author’s metered usage exports divided by subscription spend |

Treat these multipliers as **supplied assumptions** when reproducing the table. The repository does not contain the private Cursor exports or a complete derivation of the SemiAnalysis estimates, so the multipliers cannot be independently reconstructed from this repository alone. They are not separate measurements for each model. Cursor’s observed usage mixed Claude and Grok. Applying the full Cursor multiplier to Grok assumes both available usage pools can be allocated to it.

Astra and Fable use their providers’ multipliers like other models. We apply no 50% model-specific usage-allocation adjustment: this is a normalized value comparison. Availability, plan restrictions, and actual quotas still determine what an account can use.

## Tasks mode

Inputs are the Artificial Analysis (AA) Intelligence Index score and benchmark cost per task for the exact model and reasoning configuration.

```text
Tasks / subscription $ = multiplier / AA cost per task
Displayed tasks at subscription spend B
  = B × round(Tasks / subscription $, 1 decimal)
```

The app rounds tasks per subscription dollar before scaling by spending. The default spending scenario is $20; changing it scales throughput linearly. It does not imply that every service offers that plan or quota.

The graph plots:

- **Horizontal:** AA intelligence.
- **Vertical:** estimated tasks at the selected subscription spend.

The default intelligence floor is 46. This reflects the author’s experience that Grok 4.7 can complete useful math and coding work in messy codebases. It is a personal comparison threshold; mileage may vary. Lowering the filter includes lower-scoring configurations with published inputs.

## Bugs mode

Bug Hunt Bench supplies per-bug planted-fix coverage, aggregate fix counts, run counts, and run costs. We match exact model and effort levels, omit superseded rows, and use the published current mean when available.

### 1. Select qualifying planted fixes

A planted bug qualifies for a configuration’s rating only if it was fixed in **every recorded run**. Normally, at least two runs and complete per-bug coverage are required. Partial fixes and bugs merely claimed in a report receive no credit.

**Astra and Fable are explicit single-run exceptions.** Their recorded planted fixes are included in ratings and difficulty weights, with visible single-run labels. Other configurations with only one run are excluded from bugs mode. Configurations without qualifying planted fixes have no rating and are omitted.

A 100% observed success rate over a small number of runs does not guarantee repeatability.

### 2. Infer each planted bug’s difficulty weight

```text
Bug weight = lowest AA intelligence score among qualifying solvers
```

We use the full set of configurations in the app, including the single-run exceptions. Bugs without a qualifying solver remain unrated. Search, subscription, and floor filters do not change these weights.

This is an empirical difficulty proxy: the lowest intelligence score observed solving that bug under our inclusion rule. It is not a proven minimum intelligence requirement, an official Bug Hunt score, or a calibrated difficulty scale. Adding models or runs can change weights and existing ratings.

### 3. Calculate a configuration’s bug-fix rating

```text
Bug-fix rating = sum of weights of its qualifying planted fixes
```

The rating rewards both the number of qualifying fixes and their inferred difficulty. Unplanted bugs receive no weight because they lack the benchmark’s withheld answer key.

### 4. Estimate subscription cost per total bug fixed

```text
Total fixes = source planted fixes + source unplanted extra fixes
Subscription $ / bug fixed
  = source run cost / subscription multiplier / total fixes
```

For repeated runs, we use the source’s published mean fix counts and mean run cost. This is a ratio of means, not an average of each run’s cost per fix. For single-run exceptions, we use that run’s counts and cost.

**The two axes use different fix sets.** The horizontal rating requires qualifying planted fixes. The vertical cost includes all source-reported completed planted fixes and genuine unplanted extras, including fixes that did not happen in every run. Partial fixes and claimed-only bugs are excluded. Extras are not graded against the planted answer key, and their repeatability cannot be established from aggregate counts.

The graph plots:

- **Horizontal:** bug-fix rating.
- **Vertical:** estimated subscription dollars per total bug fixed.

The vertical axis is **inverted and logarithmic**, so higher points cost less. Bugs mode defaults to all ratings; its floor choices come from the calculated results. Rating and unit cost do not scale with the subscription-spend scenario.

## Pareto frontier and graph lines

A configuration is dominated if another matching configuration is at least as good on both axes and strictly better on one:

| Mode | Better horizontal value | Better vertical value |
| --- | --- | --- |
| Tasks | Higher intelligence | More tasks at the same spending |
| Bugs | Higher bug-fix rating | Lower subscription cost per bug |

The app recalculates the frontier within the active filters. **Upper-right is better in both graphs.** The solid line joins frontier configurations; dotted lines join a model’s visible reasoning levels in effort order. Neither line implies that intermediate configurations exist.

## Cost and execution assumptions

- First-party harnesses are assumed. We make no adjustment between Grok Build and Cursor.
- Most matched Bug Hunt costs are token-based list-rate estimates. Grok’s reconstructed costs are lower bounds, so its displayed subscription cost per bug is also a lower bound, marked **≥**.
- Benchmark workloads and API-equivalent usage are proxies. Real value also depends on context, task success, usage caps, latency, tools, and product features.
- Single runs, run variance, model routing/fallbacks, and changing prices limit comparisons. Read the source configuration definitions when interpreting a result.
- The app uses recorded snapshots, not live price or quota feeds. Source run dates and evidence are available in configuration details and CSV exports.

## Sources

- [SemiAnalysis: Anthropic Subscriptions Offer 5x+ More Value Than OpenAI](https://newsletter.semianalysis.com/p/anthropic-subscriptions-offer-5x) — basis for Claude and ChatGPT subscription multipliers.
- [Artificial Analysis](https://artificialanalysis.ai/) — intelligence scores and benchmark cost per task for exact model/effort configurations. The app links the relevant model releases, including fallback configurations where used.
- [Bug Hunt Bench](https://bughunt.productcompass.pm/), [source data](https://bughunt.productcompass.pm/data/benchmark.json), and [method](https://bughunt.productcompass.pm/method) — planted-bug coverage, source-reported extras, costs, and run evidence.
- Author’s Cursor usage exports — observed API-equivalent usage divided by subscription spending.

## Input field map

The recorded dataset is the JSON inside `<script id="comparison-data">` in [docs/index.html](docs/index.html). The app does not fetch these inputs at runtime.

| App field | Source or derivation | Notes |
| --- | --- | --- |
| `id`, `model`, `short` | Local identifiers and display names | Keep `id` unique and stable. |
| `provider` | Subscription used for normalization | Claude, ChatGPT, or Cursor; Grok uses Cursor here. |
| `reasoning` | Exact source effort level | Use Low, Medium, High, XHigh, or Max; do not infer an unreported tier. |
| `intelligence` | AA Intelligence Index for that configuration | Match model version, effort, and routing/fallback definition. |
| `benchmarkCost` | AA Cost per Intelligence Index task | USD per task, not token price or total index cost. |
| `multiplier` | Supplied provider assumption above | Apply consistently to all configurations on that subscription. |
| `tasks20` | `20 × round(multiplier / benchmarkCost, 1 decimal)` | Stored derived value; recompute when either input changes. |
| `bugHunt.id` | Bug Hunt `runs[].id` | Preserve the exact selected source row ID for traceability. |
| `bugHunt.fixed` | Source row `fixed` | Verified planted fixes; may be a mean with decimals. |
| `bugHunt.extras` | Source row `extras` | Source-reported genuine unplanted fixes; may be a mean. |
| `bugHunt.cost_usd`, `cost_kind` | Source row fields with the same names | Keep the cost type; never silently convert a lower bound into an exact cost. |
| `bugHunt.n_runs`, `date` | Source row fields with the same names | Run count and the row’s recorded date. |
| `bugHunt.coverage_runs` | Source row `coverage_runs` | Must equal `n_runs` to use repeated-run per-bug coverage. |
| `bugHunt.bug_hits` | Source row `bug_hits` | Map of planted bug ID to number of runs that fixed it. |

The current single-run exceptions match `GPT-6 Astra` and `Claude Fable 5.1` exactly. For an allowed single-run Astra or Fable row, the source may supply `fixed_bugs` instead of a coverage map. Set `coverage_runs = 1` and construct `bug_hits` with a value of `1` for each ID in `fixed_bugs`. This does not establish repeatability; retain the exception label. Do not perform this conversion for other single-run models.

## Selecting and validating source rows

1. **Match identity before values.** Match model version and exact effort. Normalize effort capitalization only. AA inputs must describe the recorded fallback/routing configuration; do not substitute a nearby model or the family’s highest intelligence score.
2. **Use current Bug Hunt rows.** Within `runs`, omit rows with a nonempty `superseded` field. Select the published current mean for that exact configuration when available; do not also count its component runs. Do not pick the highest-scoring run. If multiple current rows represent different routes or conditions, resolve and document the intended match rather than averaging them together or choosing arbitrarily.
3. **Keep cost and fix counts together.** Take `fixed`, `extras`, cost, and coverage from the same row. Keep published means at their supplied precision; the app does not reconstruct unrounded means from individual runs.
4. **Validate coverage.** For repeated runs, require a complete per-bug map, `coverage_runs == n_runs`, and integer hit counts between zero and `n_runs`. Do not treat `fixed_bugs` on a mean row as an intersection: it may include bugs fixed in only some runs. A qualifying bug has `bug_hits[id] == n_runs`.
5. **Do not fill gaps by guessing.** Missing AA intelligence prevents difficulty calibration and tasks plotting. Missing task cost omits tasks mode. Missing coverage or run cost omits bugs mode unless the explicit single-run conversion applies. Missing `extras` is not automatically zero. Record unresolved inputs and omit the affected result until they can be verified.
6. **Check numeric and identity consistency.** Costs and multipliers must be finite and positive; fix counts must be finite and nonnegative. Use globally consistent planted bug IDs. The current implementation assumes the source’s 105-bug set; a change to that set requires updating the weighting range and checks, not just copying new rows.

## Worked calculations

These examples demonstrate the arithmetic, rather than maintaining a ranking or latest-results table.

### Task throughput

Using a multiplier of `58.9` and AA task cost of `$0.88`:

```text
58.9 / 0.88 = 66.9318… tasks / subscription $
Rounded to one decimal = 66.9
At $20 subscription spend: 66.9 × 20 = 1,338 tasks
```

Use JavaScript’s rounding rule as implemented in the app:
`Math.round(multiplier / benchmarkCost * 10) / 10 * 20`.
Languages that round exact ties to even may give a different stored value.

### Bug rating and cost

For a fictional three-run configuration, suppose three planted bugs have weights `38`, `46`, and `51`, with hit counts `3`, `3`, and `2`. Only the first two qualify:

```text
Bug-fix rating = 38 + 46 = 84
```

Each weight must first be calculated across the full eligible dataset. For example, if a bug’s qualifying solvers have intelligence scores `38` and `52`, its weight is `38`.

Separately, the recorded Sol Medium cost example uses a `10.6` multiplier, mean run cost `$1.76`, `29` planted fixes, and `30.5` extras:

```text
Mean total fixes = 29 + 30.5 = 59.5
Subscription cost per bug = 1.76 / 10.6 / 59.5
                          ≈ $0.00279055
Displayed currency value ≈ $0.0028
```

The denominator is 59.5 total fixes, not its 25 qualifying planted fixes. The app computes costs without intermediate rounding; screen formatting and CSV precision are presentation choices.

## Reproducing a recorded table

1. Use the embedded dataset from the Git commit you want to reproduce. Re-fetching live sources may yield different values. The private usage exports are unnecessary if you accept the supplied multipliers.
2. Recompute `tasks20` from its inputs. For bugs, apply the coverage/exception rules, calculate each planted bug’s minimum solver intelligence, then sum each configuration’s qualifying weights and calculate cost from total fixes.
3. Apply the selected mode, search, subscription, and floor filters. Tasks mode defaults to intelligence ≥46 and $20 spending; bugs mode defaults to all ratings. Configurations without valid values in that mode are omitted. Difficulty weights are calculated **before** these filters.
4. Recompute Pareto membership among the filtered configurations. Tasks mode defaults to descending throughput; bugs mode defaults to ascending cost. Equal numerical values retain dataset order unless another column is selected for sorting. The optional “Frontier only” control then limits the displayed rows.
5. Compare your output with the app’s filtered CSV, keeping full precision until formatting. Task screen values use up to one decimal and bug costs up to four decimals; CSV task values use one decimal and bug costs six. A displayed cost can therefore hide a difference used in Pareto comparisons.

## Maintaining the comparison

1. Collect the source values for exact model and effort configurations. Check dates, superseded status, run counts, cost kind, and complete per-bug coverage.
2. Update the embedded `comparison-data` dataset in [docs/index.html](docs/index.html). Preserve the distinction between aggregate fix counts and per-bug coverage. Update multiplier assumptions or eligibility rules deliberately when their basis changes.
3. Run `node checks/report.mjs`. The checks cover calculation inputs, rounding, fix eligibility, difficulty weights, mode defaults, and Pareto dominance. Review changed expectations as described below.
4. Preview both modes, filters, configuration details, and CSV exports. The app derives weights and ratings from the dataset; this README needs changing when the method or assumptions change, rather than when rankings change.

### Updating checks after data changes

[checks/report.mjs](checks/report.mjs) contains both method checks and snapshot expectations:

- **Retain method checks:** calculation identities, coverage eligibility, single-run exceptions, weight minima, cost direction, rounding, inverted/logarithmic coordinates, empty sets, and tie handling. Changing data should not require weakening these rules.
- **Review snapshot expectations:** configuration counts, eligible counts, expected frontier ID lists, selected source values/run counts, and model-specific task values. When inputs or inclusion change, independently recalculate these expectations and update them deliberately.
- The `expected` array checks the original first ten task values by position. If those values are refreshed or the dataset is reordered, update that fixture after verifying the calculation. If the model set changes, also review model-name assertions, exception lists, and hard-coded plotted ranges in the checks.
- The checks compile and exercise calculation helpers, but do not fully test the browser or validate downloaded sources. Preview both modes and inspect CSV output after a data refresh.

The app is a self-contained HTML file hosted through GitHub Pages. It runs in the browser with no installation, build step, or external packages.
