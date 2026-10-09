# Subscription Value

How much benchmark work does a subscription dollar buy, once we require an Artificial Analysis Intelligence score of **at least 46**?

This report preserves the findings of the **October 8, 2026** Subscription Value Comparison conversation. It compares estimated subscription throughput with intelligence, using the model names and rounded values recorded in that conversation.

**Explore the [interactive HTML report](index.html)**: a professional dark dashboard with linked chart and table selections, model search, provider and intelligence filters, sortable columns, a budget scenario control, and CSV export. Download the repository and open `index.html` in a browser; it works offline with no installation or build step. GitHub's file viewer displays the HTML source rather than running the report.

## Subscription multipliers

A multiplier represents estimated API-equivalent usage per subscription dollar; it is not itself a task count.

| Subscription | Multiplier | Interpretation in this comparison |
| --- | ---: | --- |
| Claude | **58.9×** | Applied to Sonnet 5.5 and Opus 5.5 |
| ChatGPT | **10.6×** | Applied to GPT-6.1 Sol |
| Cursor | **20.7×** | Applied to Grok 4.7 under the usage-pool assumption discussed in the conversation |

The Claude and ChatGPT figures are estimates carried forward from the conversation. The Cursor figure comes from observed metered usage divided by subscription spend. That observed usage included both Grok and Claude; applying the whole multiplier to Grok assumes the available pools can be used toward Grok as discussed. These are comparison inputs, not universal plan entitlements.

## Qualifying configurations

Only configurations with a known Artificial Analysis Intelligence score **≥46** and a known benchmark cost per task are included. Rows are sorted by **Tasks / $20 descending**. Sonnet 5.5 Medium is excluded because its score was 41; Grok 4.7 Medium is excluded because the required benchmark values were unavailable.

| Model | Reasoning | Intelligence | Subscription multiplier | Tasks / $20 |
| --- | --- | ---: | ---: | ---: |
| Claude Sonnet 5.5 | High | 47 | 58.9× | **1,338** |
| GPT-6.1 Sol | Medium | 48 | 10.6× | **1,010** |
| Claude Opus 5.5 | Medium | 51 | 58.9× | **880** |
| GPT-6.1 Sol | High | 50 | 10.6× | **662** |
| Claude Opus 5.5 | High | 54 | 58.9× | **648** |
| Claude Sonnet 5.5 | XHigh | 52 | 58.9× | **586** |
| GPT-6.1 Sol | XHigh | 51 | 10.6× | **544** |
| Claude Opus 5.5 | XHigh | 56 | 58.9× | **340** |
| Grok 4.7 | High | 46 | 20.7× | **152** |
| Grok 4.7 | XHigh | 46 | 20.7× | **110** |

## Intelligence versus throughput

![All ten qualifying configurations plotted by Artificial Analysis Intelligence and tasks per $20, with the five Pareto configurations connected and highlighted.](assets/pareto.png)

Higher and farther right is better. All ten points remain visible, including dominated configurations. A configuration is on the **Pareto frontier** when no other included configuration has at least as much intelligence and at least as many tasks per $20, with a strict improvement in one of those dimensions.

The frontier is:

**Sonnet 5.5 High → Sol 6.1 Medium → Opus 5.5 Medium → Opus 5.5 High → Opus 5.5 XHigh.**

Sonnet XHigh and Sol High/XHigh are dominated: Opus High improves both dimensions over Sonnet XHigh, and Opus Medium improves both dimensions over Sol High/XHigh. The connecting line is a visual guide between available configurations; intermediate points do not represent additional model tiers.

## Conclusion

- **Sonnet 5.5 High is the best raw Tasks / $20 option among qualifying configurations**, at **1,338** tasks and intelligence **47**.
- **Sol 6.1 Medium is second**, at **1,010** tasks and intelligence **48**. Its underlying Artificial Analysis benchmark cost is cheaper per task (**$0.21 versus Sonnet High's $0.88**), despite its lower subscription multiplier (**10.6× versus 58.9×**). After applying those multipliers, Sonnet High still yields more tasks per subscription dollar; Sol's lower benchmark cost does not mean its effective subscription cost per task is lower.
- **Opus 5.5 Medium, High, and XHigh define the higher-intelligence Pareto frontier**, trading throughput for scores of **51, 54, and 56**.
- **Grok 4.7 is much less subscription-efficient under this metric**, at **152** tasks for High and **110** for XHigh, both with intelligence **46**. Product features or a different workload may still change a personal subscription decision.

## Method and limits

```text
Tasks per subscription dollar = subscription multiplier / AA benchmark cost per task
Tasks per $20 = 20 × tasks per subscription dollar
```

To match the original table exactly, tasks per subscription dollar were rounded to **one decimal place before multiplying by 20**. For example, `58.9 / 0.88 ≈ 66.9`, then `66.9 × 20 = 1,338`. Computing directly from the unrounded ratio can yield a slightly different number. The dashboard scales these preserved values linearly for its budget scenarios.

The $20 figure is a common spending normalization, not a claim that every service offers a $20 plan or that these task counts are guaranteed monthly quotas. Benchmark task costs, API-equivalent usage estimates, context sizes, usage limits, and real coding tasks are different quantities. This metric does not measure task success rates, latency, tools, or the IDE experience. Scores, costs, and multipliers are a dated snapshot and have not been refreshed for this report.

### Provenance

The source is the [Subscription Value Comparison conversation](https://chatgpt.com/c/6ac86b0a-2b38-83e8-b8f6-08f6c817fbe9) and its final table, supplied again by the user. The conversation cited these Artificial Analysis comparisons for its benchmark inputs (the conversation may require access to the owner's account):

- [Opus 5.5 Medium versus XHigh](https://artificialanalysis.ai/models/comparisons/claude-opus-5-5-medium-vs-claude-opus-5-5-xhigh)
- [Sol 6.1 Medium versus XHigh](https://artificialanalysis.ai/models/comparisons/gpt-6-1-sol-medium-vs-gpt-6-1-sol-xhigh)
- [Grok 4.7 High versus XHigh](https://artificialanalysis.ai/models/comparisons/grok-4-7-high-vs-grok-4-7)

The HTML contains the recorded benchmark costs alongside the exact displayed throughput values. Its chart and table use that same embedded dataset.

## Report checks

Run `node checks/report.mjs` to check the qualifying rows, rounding, README table, and Pareto membership. No external packages are needed.
