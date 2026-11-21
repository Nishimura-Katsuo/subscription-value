# Antigravity shared Gemini weekly pool size (Google AI Pro / Ultra 5x / Ultra 20x), in API-equivalent dollars

Conventions used below: month = 30.4375 days, so weekly-to-monthly factor = 30.4375 / 7 = 4.348214. "1x models" are those drawn down at their API list price (Flash, Hydrogen, Neon). "3x models" are Argon and Carbon on Ultra. All prices are API list prices per 1M tokens (input / cached / output) in effect on 19 Nov 2026: Gemini 3.8 Flash $0.75 / $0.075 / $3.75; Gemini 4 Hydrogen $1.50 / $0.075 / $7.50; Gemini 4 Neon $3 / $0.15 / $15; Gemini 4 Carbon and Argon $2 / $0.10 / $10 (launch price) — [subvalue.app Ultra 5x page](https://subvalue.app/plans/google-ai-ultra-5x/).

The original 26 Oct Reddit post (reddit.com/r/google_antigravity/comments/1xfnvds/) could not be fetched (reddit blocks the fetch tool), so its contents are known here only from the brief.

## Q1. Has the ~$600/week Flash-equivalent Ultra 5x pool been re-measured? What values?

### Takeaway
Yes. An independent per-call measurement on 19 Nov 2026, the day after Neon launched, found the Ultra 5x shared Gemini pool at exactly $600/week ($150 per five-hour window, 4 windows per week). That matches the 26 Oct figure, so the pool did not change size with Neon. Neon is drawn at 1x its API price, so the pool buys $600/week of Neon but only $200/week of Argon or Carbon. An earlier forum measurement (28 Oct) also implies $150 per five-hour bucket, which fits $600/week.

### Cited Findings
- **subvalue.app ("Coding Plan Index") measurement, Ultra 5x, 19 Nov 2026, 20:12–23:07 UTC.** One Ultra 5x account, Antigravity CLI 1.5.12, 109 calls analysed (101 Gemini, 8 Claude). One call failed with a server error and was excluded, and the CSV has 137 rows. Method: each call's API-price cost divided by the share of weekly quota it used. — [subvalue.app Ultra 5x](https://subvalue.app/plans/google-ai-ultra-5x/)
  - The Gemini pool (Neon, Hydrogen, Flash) is $600.0/week and $150.0 per five-hour window, with 4 windows per week. — same source
  - Carbon and Argon share the same pool but are charged 3x their API price, so the pool is $200.0/week of those models ($50 per window, implied). — same source
  - The Claude and GPT pool is separate: $25.0/week, $12.5 per five-hour window, 2 windows per week. — same source
  - Example deltas: a Neon one-word reply cost $0.0290 at API price and used 0.0048% of the week. A Carbon coding task cost $0.4053 and used 0.2026%. An Argon one-word reply cost $0.0192 and used 0.0096%. Every Gemini call fell within 1% of its model's figure, and calls above 5¢ stayed within 0.1%. There was no idle drift over 27 idle minutes, and no call moved a quota group other than its own. — same source
  - Arithmetic check (my calculation): $0.0290 / 0.000048 = $604/week for Neon. Carbon: $0.4053 × 3 / 0.002026 = $600.1/week of 1x-equivalent. Argon: $0.0192 × 3 / 0.000096 = $600/week. All three are consistent with a $600 pool and a 3x draw for Carbon and Argon.
  - **Caveat:** the account had upgraded from Google AI Pro "hours earlier", which reset its limits to full. — same source
  - subvalue's summary page states: "One Gemini pool, worth $600 of use a week at API list prices, $150 in a five-hour window." The plan card also says "No size is published", which refers to Google not publishing a size. — [subvalue.app plans](https://subvalue.app/plans/)
- **Forum telemetry, Ultra 5x, 28 Oct 2026 (user Yiji_Kong, Antigravity 2.27.0, Windows).** Quota was read from `remainingFraction` in `LanguageServerService/GetUserStatus`, polled every 30 s, with tokens from `GetCascadeTrajectoryGeneratorMetadata`. — [discuss.ai.google.dev/t/196351](https://discuss.ai.google.dev/t/telemetry-verification-gemini-4-argon-in-antigravity-is-billed-against-subscription-quota-at-6-30-per-1m-tokens-3x-advertised-launch-rate/196351)
  - Argon (High): 14,918 in / 4,233 out tokens, a quota drop of 0.00144340, and $0.0722 at $2/$10.
  - Flash (High): 15,111 in / 3,451 out tokens, a quota drop of 0.00016180, and $0.0243 at $0.75/$3.75.
  - The Argon/Flash quota-per-dollar ratio is 3.00. The implied bucket is **$150.0 Flash-equivalent**.
  - A 42-step Argon session dropped the fraction by 0.03154810, implying ~$147.5 at $6 / $0.30 / $30.
  - The OP's summary calls the bucket "the shared 5-hour Gemini quota bucket". The method section does not name the bucket, and the thread gives no weekly dollar figure. — same source
- **Forum follow-up, 13 Nov 2026 (same user, Ultra $100).** Relative to published price: 3.8 Flash 1.00x, Hydrogen 1.00x, Argon 3.00x, Carbon 3.00x, Orchestrator (Carbon) 3.00x. "The 5-hour and Weekly buckets give the same multiplier in every run." — [same thread](https://discuss.ai.google.dev/t/telemetry-verification-gemini-4-argon-in-antigravity-is-billed-against-subscription-quota-at-6-30-per-1m-tokens-3x-advertised-launch-rate/196351)
- **Google staff-looking reply, 29 Oct 2026 (Maniraj_Chervirala; role not shown).** Promotional per-token rates "apply only to pay-as-you-go API billing", and "Fixed per-model quota multipliers are not published." — same thread

### Inferences
- The $150 per five-hour bucket (28 Oct) × 4 windows per week (19 Nov) = $600/week. Two independent methods agree with the 26 Oct Reddit figure, so the Ultra 5x pool is well corroborated at **$600/week of 1x-model value**. This is measured with receipts (per-call telemetry), not anecdote.
- Monthly value of the Ultra 5x pool on a $99.99 fee:
  - **At 1x (Flash, Hydrogen or Neon):** $600 × 4.348214 = **$2,608.93/month**, and $2,608.93 / $99.99 = **26.1x the fee**.
  - **At 3x (Argon or Carbon):** $200 × 4.348214 = **$869.64/month**, and $869.64 / $99.99 = **8.70x the fee**. This reproduces the project's current figure.
  - **If valued on Neon, Google's new default model, the multiplier is 26.1x, not 8.7x.** Neon draws at 1x ($3/$15), so $600/week buys $600 of Neon at list price.
- The project's 8.7x is right for Argon-only use, but low for a Neon-based valuation.

### Gaps
- The Reddit 26 Oct post itself could not be fetched, so its exact numbers were not re-verified here.
- Only one account was measured on 19 Nov, and it had upgraded hours earlier. No second independent post-Neon measurement for Ultra 5x was found.

## Q2. Measurements for Ultra 20x and Pro? Does Ultra 20x really give 4x Ultra 5x?

### Takeaway
Pro was measured on 19 Nov 2026 at $105/week ($30 per five-hour window, 3.5 windows per week), with a separate $15/week Argon pool. No measurement of the Ultra 20x pool was found. The common $2,400/week figure is derived as 4x Ultra 5x from Google's 5x/20x token-ratio wording, not measured. Ultra 5x is 5x Pro per five-hour window but 5.7x Pro per week.

### Cited Findings
- **Pro, measured by subvalue.app on 19 Nov 2026, 14:41–17:08 UTC.** One account, CLI 1.5.12, 80 calls (62 Gemini, 10 Argon, 8 Claude/GPT). Three runs made while the account was in use elsewhere were excluded. — [subvalue.app Pro](https://subvalue.app/plans/google-ai-pro/)
  - The Gemini pool (Flash, Hydrogen, Neon) is $105.0/week and $30.0 per five-hour window, with 3.5 windows per week. The page converts this to "about $456/month". — same source
  - Argon has its own pool: $15.0/week, charged at 1x, with no five-hour limit ("about $65/month"). — same source
  - Claude Sonnet/Opus 5.5: $5.0/week, $2.5 per five-hour window. — same source
  - Earlier reading: Real API Pricing measured $119–123/week on Gemini Flash in September 2026. The page notes "one account on one day cannot guarantee a fixed allowance". — same source. realapipricing.com's front page did not expose the figure when fetched ([realapipricing.com](https://realapipricing.com)).
- **Pro, forum estimate, 23 Oct 2026** (LiteLLM tracking against the displayed quota; the author says it "might be error prone"):
  - Argon weekly: "$12 API value … ~442 requests".
  - Earlier 3.8 Flash figure cited from a previous thread: "$214 API value", ~16,258 requests per week.
  - Sonnet 5.5 five-hour: "$3 API value".
  - Prices are given only as "Introductory Pricing".
  - Source: [discuss.ai.google.dev/t/191879](https://discuss.ai.google.dev/t/191879)
- **Ultra 20x, no measurement.** subvalue's $2,400/week is "derived as 4× the measured Ultra 5× pool" from Google's statement that the plans give "20 and 5 times the tokens of Pro". Whether an Ultra 20x week holds 4 five-hour allowances "is not measured". Its Claude allowance is "of unknown size". — [subvalue.app plans](https://subvalue.app/plans/)
- **Official wording, 19 May 2026.** The $100 Ultra has "a rate limit of 5X worth of tokens compared to the $20/month Pro plan", and the $200 Ultra has "a rate limit of 20X worth of tokens". The ratio is said to hold during promotional periods too. — [Antigravity blog, Changes to Antigravity plans](https://antigravity.google/blog/changes-to-antigravity-plans/)
- **Ultra 20x anecdote, 20 Nov 2026.** A user on "Google AI Ultra ($199.99/mo)" reports:
  - The GEMINI MODELS weekly quota drained to "0.00%" in ~3 days of normal use.
  - The usage readout says the Gemini "5-hour limit does not currently apply".
  - Claude/GPT: 45.48% weekly remaining, 100% five-hour.
  - The poster suspects a "misapplied Ultra multiplier" after the Neon rollout. No token or dollar figures are given, and there is no staff reply.
  - Source: [discuss.ai.google.dev/t/203267](https://discuss.ai.google.dev/t/google-ai-ultra-gemini-models-weekly-quota-drained-to-0-00-in-3-days-of-normal-agy-use-error-tells-an-active-ultra-subscriber-to-upgrade-error-id-f3ce1100-35842/203267)

### Inferences
- **Pro value at 1x:** $105 × 4.348214 = $456.56/month, and $456.56 / $19.99 = **22.8x the fee**.
- **Pro Argon pool:** $15 × 4.348214 = $65.22/month, which is 3.3x the fee on Argon alone. The pool is additive to the Gemini pool on Pro.
- **Pro trend:** $119–123/week (Sep) vs $105/week (19 Nov) is roughly a 12–15% reduction, or noise. The $214 forum figure is an outlier with unclear method.
- **Ultra 5x vs Pro:** the five-hour ratio is $150 / $30 = 5.0x, matching Google's "5X". The weekly ratio is $600 / $105 = 5.71x.
- **Candidate Ultra 20x values (all unmeasured):**

  | Basis | Weekly | Monthly | × $199.99 fee |
  |---|---|---|---|
  | (a) 4 × Ultra 5x, 1x models | $2,400 | $10,435.71 | **52.2x** |
  | (a) 4 × Ultra 5x, Argon/Carbon at 3x | $800 | $3,478.57 | **17.4x** |
  | (b) 20 × Pro weekly | $2,100 | $9,131.25 | 45.7x |
  | (c) 20 × Pro five-hour ($600 per window) × 4 windows | $2,400 | — | same as (a) |

- The Ultra 20x anecdote suggests its Gemini five-hour cap may be disabled ("does not currently apply"). In that case only the weekly limit matters on Ultra 20x, and the 4-windows assumption is moot.

### Gaps
- No receipts-backed Ultra 20x measurement was found, so the 4x ratio over Ultra 5x is unverified.
- No post-Neon Pro re-measurement was found besides subvalue's.
- I found no source that gives the Real API Pricing Sept method in detail.

## Q3. Did Google change Antigravity quotas, plans or pricing in November 2026? Any changes announced for 1 December?

### Takeaway
No official quota, plan or price change for Antigravity subscriptions was found for November or for 1 December 2026. The changes in that window are the 1 Dec API price doubling for Argon and Carbon (end of launch pricing), the 1 Jan 2027 Flash price step-up, and the 30 Nov removal of Claude 4.6 and GPT-OSS models. Neon (18 Nov) and Hydrogen (12 Nov) launched with no stated quota changes. Post-Neon drain complaints exist but are anecdotal.

### Cited Findings
- The Neon launch post (18 Nov 2026) rolls Neon out to paid Pro and Ultra in the Desktop app, CLI and IDE extensions. It mentions no quotas, multipliers, promotions or limit changes. It claims a "32% lower cost per task than Carbon" at High. — [Antigravity blog, Gemini 4 Neon](https://antigravity.google/blog/gemini-4-neon-in-google-antigravity)
- The Hydrogen launch post (12 Nov 2026) is for Pro and Ultra and gives no quota or limit changes. It says Orchestrator used 24% less quota than Carbon on Terminal-Bench 4.1. — [Antigravity blog, Gemini 4 Hydrogen](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/)
- **API prices.** Argon is $2/$10 until 30 Nov, then $4/$20 from 1 Dec ([web search summary of third-party guides](https://laracopilot.com/blog/google-antigravity-pricing/)). subvalue says "Google doubles Carbon and Argon API prices on 1 December 2026, and Gemini 3.8 Flash on 1 January 2027". It is unknown whether quota stays fixed in dollars, which would cut the multiplier to 1.5x. — [subvalue.app Ultra 5x](https://subvalue.app/plans/google-ai-ultra-5x/). The Flash step-up is $0.75/$3.75 → $1.50/$7.50 per third-party guides ([sessionwatcher](https://sessionwatcher.com/guides/antigravity-pricing)).
- Claude Sonnet 4.6, Claude Opus 4.6 and GPT-OSS-120b "Will be removed on November 30, 2026". — [Antigravity docs, Models](https://antigravity.google/docs/models/)
- The plans page has no dated changes or promotions. It says "usage limits may change". — [Antigravity docs, Plans](https://antigravity.google/docs/plans)
- **Post-update anecdote, Pro, 21 Nov 2026.** About 60% of the weekly quota went in 10 hours of "identical usage" after the "November 2026 update" and a quota reset. Readout: Gemini models 17% weekly, Argon 2% weekly, Claude/GPT 0%. There are no token figures and no staff reply. — [discuss.ai.google.dev/t/203344](https://discuss.ai.google.dev/t/bug-severe-post-reset-weekly-quota-drain-after-november-2026-update-google-ai-pro-claude-gpt-0-argon-2/203344)
- **Earlier changes, for dating.**
  - 19 May 2026: Flash and Pro limits merged into one pool "drawn down according to API pricing". AI credits were removed from base plans and made overage-only. A $100 bonus-credit promotion for Ultra ended 25 May 2026. — [Antigravity blog, 19 May](https://antigravity.google/blog/changes-to-antigravity-plans/)
  - GILD reports a tripling of Gemini limits on 21 May 2026 (via dev.to, secondary). — [GILD research](https://gildhq.com/research/antigravity-plans-and-quotas-2026)

### Inferences
- The 26 Oct and 19 Nov Ultra 5x readings agree at $600/week, so the pool did not change around Neon's launch. The drain reports are more likely heavier per-task use from Neon or Carbon, or bugs, than a pool cut. They are unverified.
- **Effect of the 1 Dec Argon/Carbon price change.**
  - If Google keeps per-token quota draw unchanged, Argon would cost the pool $6/$30 per 1M tokens, which is 1.5x the new $4/$20 list price.
  - The Argon-equivalent pool at new list prices would then be $600 / 1.5 = $400/week, or $400 × 4.348214 = $1,739.29/month = **17.4x** the $99.99 fee.
  - If Google instead keeps 3x on the new price, the pool falls to $200/week of Argon in dollars but half as many tokens. That case was not measured.
  - The 1 Jan 2027 Flash doubling would similarly change the Flash-equivalent dollar value if token allowances stay fixed.

### Gaps
- No official Google statement on November or December quota changes was found.
- No tech press coverage (9to5Google, The Verge, Android Authority) of a November 2026 Antigravity plan change surfaced in searches.
- No X/Twitter staff posts were checked; the search tool did not surface any.
- No GitHub quota-tracker data was found.

## Q4. Is there an official $ conversion (AI credits, top-ups)?

### Takeaway
AI credits cost a flat $0.01 each ($25 for 2,500, $50 for 5,000, $200 for 20,000). Antigravity bills credits for overage at "standard Gemini Enterprise consumption pricing". That gives an official dollar rate for overage usage, but Google publishes no size for the subscription pool itself.

### Cited Findings
- Google One top-up tiers: $25 for 2,500 credits, $50 for 5,000, $200 for 20,000 ($0.01 per credit). They are available to Pro and Ultra, not Plus, and not in Japan. Balances are valid 12 months from the last purchase. — [Google One Help, Purchase Google AI credits](https://support.google.com/googleone/answer/17103110?hl=en-MY). The page date was not confirmed.
- Pro and Ultra can buy AI credits for usage above baseline quota. Credits are "billed at standard Gemini Enterprise consumption pricing", and the "AI Credit Overages" setting is Never or Always. — [Antigravity docs, Plans](https://antigravity.google/docs/plans)
- Per the forum, credits charge Carbon at $2/$10 (1x). Only subscription quota shows 3x for Carbon and Argon. — [discuss.ai.google.dev/t/196351](https://discuss.ai.google.dev/t/telemetry-verification-gemini-4-argon-in-antigravity-is-billed-against-subscription-quota-at-6-30-per-1m-tokens-3x-advertised-launch-rate/196351) (Yiji_Kong, 13 Nov)
- A forum user reports a billing dispute settled with 2,000 AI credits ($20.00), which is consistent with $0.01 per credit. This is self-reported. — same thread (M_B4, 8 Nov)
- Gemini Enterprise seats get a $10 (Standard) or $15 (Plus) credit per user per month, pooled weekly. — [GILD research](https://gildhq.com/research/antigravity-plans-and-quotas-2026)

### Inferences
- **Credits vs quota for Argon/Carbon.** Credits bill Argon and Carbon at 1x list price, while quota draws them at 3x. For Argon or Carbon heavy use, $1 of credits buys 3x more Argon than $1 of quota-equivalent.
- **Credit cost of a full Ultra 5x week.** $600 of 1x usage would cost ~$600 in credits (60,000 credits), assuming Enterprise consumption pricing equals API list price.

### Gaps
- No official document maps "Gemini Enterprise consumption pricing" to the AI Studio API list price for Neon or Hydrogen.
- Google publishes no pool size for any plan; the docs describe tiers only as "highest", "high" and "meaningful".

## Q5. How many five-hour windows equal one weekly limit? Does the five-hour window bind first?

### Takeaway
On measured accounts (19 Nov 2026), one week equals 4 five-hour windows on Ultra 5x and 3.5 on Pro, against 33.6 calendar five-hour slots per week. For sustained use the weekly limit binds long before the five-hour cap does. The five-hour cap only throttles bursts. Argon on Pro has no five-hour limit. One Ultra 20x readout shows the Gemini five-hour limit switched off.

### Cited Findings
- Ultra 5x: Gemini $600/week vs $150 per window = 4 windows. Claude $25 vs $12.5 = 2 windows. — [subvalue.app Ultra 5x](https://subvalue.app/plans/google-ai-ultra-5x/)
- Pro: Gemini $105 vs $30 = 3.5 windows. Claude: 2 windows. Argon: no five-hour limit. — [subvalue.app Pro](https://subvalue.app/plans/google-ai-pro/)
- The Ultra ($199.99) readout says the Gemini "5-hour limit does not currently apply". — [discuss.ai.google.dev/t/203267](https://discuss.ai.google.dev/t/google-ai-ultra-gemini-models-weekly-quota-drained-to-0-00-in-3-days-of-normal-agy-use-error-tells-an-active-ultra-subscriber-to-upgrade-error-id-f3ce1100-35842/203267)
- For Gemini Web (not Antigravity), the forum reports "1 Weekly Pool = 20 × 5-Hourly Pool". The thread does not establish this ratio for Antigravity. — [discuss.ai.google.dev/t/196351](https://discuss.ai.google.dev/t/telemetry-verification-gemini-4-argon-in-antigravity-is-billed-against-subscription-quota-at-6-30-per-1m-tokens-3x-advertised-launch-rate/196351)
- Official docs: Pro is "refreshed every five hours until the weekly limit is reached". Ultra has "the highest, most generous quota, refreshed every five hours" plus "the highest weekly rate limits". — [Antigravity docs, Plans](https://antigravity.google/docs/plans)

### Inferences
- **Five-hour slots per week:** 168 h / 5 h = 33.6.
- **Ultra 5x:** filling just 4 windows (as little as about 20 hours of heavy use) exhausts the week. The weekly limit is the binding constraint for any user who works more than about 4 heavy sessions a week, so excluding five-hour windows from the valuation is sound.
- **Upper bound on the weekly pool:** the five-hour cap never makes the weekly pool unreachable, since 4 windows at $150 = $600 exactly. The cap only spreads use over at least 4 sessions, about 15+ hours wall-clock: 3 gaps × 5 h minimum between window starts, plus active time.

### Gaps
- The windows-per-week ratio on Ultra 20x was not measured, and it may be moot if its five-hour cap is disabled.
- No second-source confirmation of the 4-window and 3.5-window ratios was found.
- Note: no reference to subvalue.app was found in this repository. It appears to be an independent third-party site, but its operator is not identified.
