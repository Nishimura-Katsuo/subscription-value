# Antigravity quota value for Gemini 4 Argon and Gemini 4 Carbon: re-check (as of 2026-11-21)

Evidence labels: **[receipt]** = user measurement with raw telemetry numbers published; **[anecdotal]** = user claim without numbers; **[official]** = Google page or account; **[forum-staff?]** = forum reply from an account that sounds official but whose role the page does not state.

Note on sources: reddit.com could not be fetched by the research tools, and a search for the Reddit post's title found nothing. The 26 Oct Reddit post (reddit.com/r/google_antigravity/comments/1xfnvds/...) is therefore **unverified**. Everything below about the Argon 3x measurement comes from the forum thread t/196351, which appears to be the same or a parallel write-up.

## 1. Do the 26 Oct Reddit post and t/196351 say what the project summary claims? Errata or follow-ups?

### Takeaway
The 3.00x figures are correct and come from t/196351. That thread was opened 28 Oct 2026, not 13 Nov. The 13 Nov date belongs to the author's update post, which adds Carbon High, Orchestrator (Carbon) and Hydrogen. The thread does **not** support the "$600/week Flash-equivalent" pool size. Its only dollar figure is a ~$150 bucket, apparently the 5-hour bucket, so the $600/week figure, and with it the 8.7x, rests only on the Reddit post, which I could not read. No errata were posted.

### Cited Findings
- Thread title: "Gemini 4 Argon draws Antigravity quota at 3x Gemini 3.8 Flash per published dollar (clean A/B, same bucket)". Opening post by Yiji_Kong, **28 Oct 2026, 2:23am**. Setup: Antigravity 2.27.0, Google AI Ultra 5x, Windows. Quota was read from `quotaInfo.remainingFraction` via the local `LanguageServerService/GetUserStatus` RPC, polled every 30 s. Tokens were read from `GetCascadeTrajectoryGeneratorMetadata`. Each test used a fresh conversation and one single-step prompt with zero cache reads, after the bucket had been idle 8+ min. n = 1 per model. **[receipt]** — [t/196351](https://discuss.ai.google.dev/t/gemini-4-argon-draws-antigravity-quota-at-3x-gemini-3-8-flash-per-published-dollar-clean-a-b-same-bucket/196351)
- Raw data **[receipt]** — [t/196351](https://discuss.ai.google.dev/t/196351):
  - Argon (High): 14,918 in / 4,233 out, quota drop 0.00144340, published cost $0.0722 at $2/$10, 0.0200 quota per USD.
  - Flash 3.8 (High): 15,111 in / 3,451 out, quota drop 0.00016180, published cost $0.0243 at $0.75/$3.75, 0.00667 quota per USD.
  - The author reports Argon/Flash = **3.00x per published dollar**. The post says Argon "matches if billed at $6 / $30 per 1M" and gives the implied bucket as "~150 USD if Flash is billed at its published rate".
- Bucket identity: the post does not name the bucket. The fetched summary places the test in "the shared 5-hour Gemini quota bucket". The thread has **no $600/week figure** and no weekly dollar pool size. The only weekly relation is a Gemini Web follow-up stating "1 Weekly Pool = 20 × 5-Hourly Pool", measured on gemini.google.com, not in Antigravity — [t/196351](https://discuss.ai.google.dev/t/196351)
- 42-step Argon session **[receipt]**: 220,998 input, 3,948,273 cache-read and 71,432 output tokens, quota drop 0.03154810. The implied bucket is ~$147.5 at $6 input / $0.30 cache-read / $30 output, so the author infers cache reads are weighted at ~$0.30/M, i.e. 3x the $0.10 launch cached price — [t/196351](https://discuss.ai.google.dev/t/196351)
- Caveats the author lists: settlement is delayed (Flash under 1 min, Argon 4–5 min, up to ~10 min); `remainingFraction` rose ~0.0028 twice with no `resetTime` change; context-compaction calls are missing from the token metadata; n = 1 — [t/196351](https://discuss.ai.google.dev/t/196351)
- Update by Yiji_Kong, **13 Nov 2026, 9:03am** **[receipt-style table; per-run raw numbers not reproduced in fetch]**. Single-turn prompts, no cache reads, Ultra $100 plan. "The 5-hour and Weekly buckets give the same multiplier in every run." Results: Flash 3.8 High 1.00x (baseline); Gemini 4 Hydrogen High 1.00x; Gemini 4 Argon High 3.00x; Gemini 4 Carbon High 3.00x; Orchestrator (Carbon) 3.00x, thinking level not stated. Published prices cited: Carbon and Argon $2/$10 (discounted), Hydrogen $1.50/$7.50, Flash $0.75/$3.75 — [t/196351](https://discuss.ai.google.dev/t/196351)
- In the same 13 Nov update, the author reports that **AI Credits charge Carbon at the $2/$10 API price**. Only subscription quota shows the 3x draw for Carbon and Argon. The author says Carbon and Argon "do not" follow the blog's "drawn down according to API pricing" rule, while Hydrogen does — [t/196351](https://discuss.ai.google.dev/t/196351)
- Other replies in the thread:
  - **[anecdotal]** RobW (28 Oct): Argon burns tokens 3.8x faster than Gemini 3.1 Pro on the same task at medium thinking.
  - **[anecdotal]** shuai_guo (29 Oct, Ultra 5x): "~3x over the published pricing ratio", ~8–9x faster drain per step than 3.8 Flash.
  - **[anecdotal]** M_B4 (8 Nov): cites ticket #198430 (claimed 256K compaction clamp that wipes cache reads) and #198304/#198339 (claimed misrouting of Argon deductions at `/high`). M_B4 also says Google One credited 2,000 AI Credits ($20) after a dispute.
  — [t/196351](https://discuss.ai.google.dev/t/196351)
- Errata: none. The 13 Nov post adds data and retracts nothing — [t/196351](https://discuss.ai.google.dev/t/196351)

### Inferences
- Arithmetic check of the 28 Oct A/B (my calculation from the posted tokens):
  - Flash: 15,111 × $0.75/M + 3,451 × $3.75/M = $0.011333 + $0.012941 = **$0.024274**. Bucket = 0.024274 / 0.0001618 = **$150.0**.
  - Argon at published price: 14,918 × $2/M + 4,233 × $10/M = $0.029836 + $0.042330 = **$0.072166**. Quota per USD = 0.0014434 / 0.072166 = 0.02000.
  - Multiplier: 0.02000 / 0.006667 = **3.00x**. Argon at $6/$30 = $0.2165, and 0.2165 / 0.0014434 = $150.0, which matches the Flash bucket.
  - 42-step session: 220,998 × 6 + 3,948,273 × 0.30 + 71,432 × 30, all per M = $1.3260 + $1.1845 + $2.1430 = **$4.6534**. 4.6534 / 0.0315481 = **$147.5**, consistent with the A/B.
- The project's $600/week Flash-equivalent → $200/week Argon chain is not in the forum thread. $150 per 5-hour bucket is not obviously $600/week:
  - If Antigravity's weekly pool were 20 × 5-hour (the Gemini Web ratio), it would be $3,000/week.
  - If $600/week is right, weekly ≈ 4 × 5-hour.
  - The project's $600/week therefore needs a second source: the Reddit post or another weekly-bucket measurement.
- Check of the project's 8.7x: $200/week × 52/12 = $866.7/month, and $866.7 / $99.99 = **8.67x**. The arithmetic is internally correct, given the $600/week premise.
- The 3.00x is measured at **launch prices**: $6/$30 quota-dollars vs $2/$10 published. The 3x multiplier says nothing on its own about which absolute rate Google will use after 1 Dec (see Q4).

### Gaps
- I could not read the Reddit post (reddit.com blocked; no search hit), so I could not confirm its 26 Oct date, its $600/week figure or any comments or errata.
- Raw per-run numbers behind the 13 Nov Carbon/Hydrogen/Orchestrator table were not shown in the fetched text, only the multipliers.
- No sample sizes were given for the 13 Nov update.

## 2. Independent Argon/Carbon quota-rate measurements since 13 Nov; Low/Medium vs High

### Takeaway
I found no independent quota-rate measurement of Argon or Carbon since 13 Nov. Post-13 Nov threads are about cache-hit telemetry and "feels drained" complaints, not quota-per-dollar A/Bs. Low/Medium has not been measured in Antigravity. The only Low data point is Gemini Web, where Argon Low came out far higher than High: 9.25x vs 4.24x per published dollar. That result is confounded by fixed per-turn overhead.

### Cited Findings
- Gemini Web follow-up (Yiji_Kong, 29 Oct), measured on gemini.google.com under the same Ultra plan, not Antigravity **[receipt]** — [t/196351](https://discuss.ai.google.dev/t/196351):
  - Flash Low, ~13.5K input, "OK" output: weekly +0.00003685.
  - Argon Low, same: weekly +0.00090908, which is 24.67x raw or **9.25x per published dollar**. Netting out a base-overhead turn (+0.00015849) gives 20.37x raw / **7.64x** per dollar.
  - Flash High, ~4,000-word article: weekly +0.00014157.
  - Argon High: weekly +0.00157077, which is 11.10x raw or **4.24x per published dollar**.
- Not measured in Antigravity: Medium for any model, and Low for any model except the Gemini Web Argon test above — [t/196351](https://discuss.ai.google.dev/t/196351)
- 19 Nov, Letter_G, $199/mo 20x Ultra, v2.33.0: Carbon quota "feels drastically lower" since updating to v2.33.0. No numbers. The post asks whether Gemini 4/Carbon quota weights changed. No staff answer. **[anecdotal]** — [t/202614](https://discuss.ai.google.dev/t/v2-33-0-severe-gemini-4-carbon-quota-drain-even-the-199-mo-20x-ultra-plan-feels-nerfed/202614)
- Other threads exist only as titles:
  - "Extremely High Quota Consumption in Antigravity – Google AI Ultra Subscription (Since November 13)", 18 Nov — [t/200830](https://discuss.ai.google.dev/t/extremely-high-quota-consumption-in-antigravity-google-ai-ultra-subscription-since-november-13/200830)
  - "Google AI Ultra: GEMINI MODELS weekly quota drained to 0.00% in ~3 days of normal agy use" — [t/203267](https://discuss.ai.google.dev/t/google-ai-ultra-gemini-models-weekly-quota-drained-to-0-00-in-3-days-of-normal-agy-use-error-tells-an-active-ultra-subscriber-to-upgrade-error-id-f3ce1100-35842/203267)
  - "[Quota Economics] First-party gemini-4-argon depletes Antigravity quota faster than third-party claude-opus-5-5…", 2 Nov. Listed as related on [t/196351](https://discuss.ai.google.dev/t/196351); not fetched.
  **[anecdotal / not read in full]**
- A 29 Oct reply from Maniraj_Chervirala (role not stated on page): higher Argon use is "expected" because promotional API rates "apply only to pay-as-you-go API billing", and "Fixed per-model quota multipliers are not published because subscription limits adjust dynamically with system capacity." **[forum-staff?]** — [t/196351](https://discuss.ai.google.dev/t/196351)

### Inferences
- The Gemini Web Low > High pattern (9.25x vs 4.24x) most likely reflects a fixed per-turn cost, such as hidden thinking or system prompt, that dominates tiny "OK" turns. That reading fits the author's own overhead test (Test 1C). It is weak evidence that Low thinking is cheaper per useful token in Antigravity.
- The Gemini Web High multiplier (4.24x) differs from Antigravity's 3.00x. This may come from hidden thinking tokens that the per-published-dollar figure cannot count on Gemini Web. Do not transfer it to Antigravity.
- The moderator line, that promo rates apply only to PAYG billing, hints that quota is priced off an internal non-promotional rate. The claim is unverified.

### Gaps
- No Antigravity measurement exists for Carbon/Argon Low or Medium, or for Carbon on the 20x Ultra tier.
- I found no confirmation of whether v2.33.0 (c. 18–19 Nov) changed per-model weights.

## 3. The Argon/Carbon 0% cache-hit issue: status, Google response, quota at the uncached rate, size of effect

### Takeaway
The issue is open as of 20–21 Nov, with no Google acknowledgement or fix. The only staff-style reply (20 Nov) offers CLI v1.5.13 "network retry fixes" plus workarounds. The evidence is mixed. One telemetry set shows Argon-medium at 99.5% cache hits and Carbon-high at 87.6% on average, with collapses inside a turn. Another shows 0% on both at 120K+ contexts. The only receipt-backed quota evidence shows cache reads charged at ~$0.30/M (3x the $0.10 launch cached price) **when hits occur**. A miss is therefore charged at the full $6/M quota rate, 20x more per input token.

### Cited Findings
- t/203048, Setsuri_Hanamiya (Ultra), **20 Nov 2026, 10:24am**. `gemini-4-carbon-high` and `gemini-4-argon-high` showed `cache_read_tokens = 0` with identical 120,381-token prefixes at 21–22 s intervals. Turns: 17,626 → 81,024 → 120,381 → 121,608 input tokens, 0% hit every time. Main session `fb1be672` was also at 0% at steps 44/49/53, up to 154,080 input tokens. The same workflow on Neon got ~98%. Reported "since 11/15", "Still not fixed" on 11/20. The post claims full uncached-rate quota billing but shows no quota records. No replies, no Google response. **[receipt for tokens; anecdotal for quota charge]** — [t/203048](https://discuss.ai.google.dev/t/ultra-feedback-telemetry-0-cache-hit-rate-on-carbon-argon-120k-tokens-21s-interval-vs-98-on-neon-unacceptable-quota-drain-for-long-context-workflows/203048)
- t/202768, Vellerok_Olitos, **19 Nov 2026** **[receipt]**:
  - Hit rates: Carbon-high 87.6% average, but one 46-call turn had 30/46 calls at zero cache, a **34.8%** hit rate. Argon-medium 99.5% (580/583), Hydrogen-high 99.5% (568/571), Neon-medium 96.6% (569/589).
  - Hit rate by pause since the previous call, over 3,060 pairs: 0–1 min 98.1%; 1–3 min 82.7%; 3–5 min 73.6%; 5–8 min 39.1%; 8–12 min 30.0%; 12–15 min 17.1%; >15 min 0.0%.
  - Cost of the collapsed turn: $16.69 actual vs $3.03 counterfactual at intro prices, and $33.39 vs $6.07 at standard prices, so **≈5.5x**. API-equivalent; the post does not say how quota is charged.
  - Reply from Rebbanpalli_Naveen, **20 Nov, 12:19pm** (role not labelled; staff-style): update to CLI v1.5.13 ("network retry fixes"). The compaction threshold is not configurable yet. Suggested workarounds: `/compact`, `/context`, `/clear`, and Orchestrator (Carbon) + Hydrogen. The reply asks whether drops persist on v1.5.13. No fix is confirmed. **[forum-staff?]**
  — [t/202768](https://discuss.ai.google.dev/t/telemetry-bug-report-why-antigravity-weekly-quotas-burn-so-fast-gemini-4-carbon-high-mid-turn-cache-collapse-5-5x-cost-5-min-implicit-cache-cliff/202768)
- t/202020, tiany, **18 Nov 2026**: Carbon sessions of 100K–200K+ drop to `cache_read_tokens = 0`. The author says this is billed at "full uncached input rates against my allowance" but gives no figures. No replies, no staff response. **[anecdotal]** — [t/202020](https://discuss.ai.google.dev/t/carbon-is-unusable-constant-prompt-cache-invalidation-is-vaporizing-paid-quota-and-latency-is-abysmal/202020)
- Related titles listed on the forum but not fetched:
  - "Urgent: Carbon cache reuse collapses to 7.3% in App 2.33.0 (Windows telemetry)", 18 Nov
  - "[Gemini 4 Argon / T3 Code ACP] 0% Prompt Cache hit rate…", 16 Nov
  - "[CRITICAL OUTAGE] 2 Days of Unusable Carbon & Argon…", 18 Nov
  - "[Bug Report] Severe Server-Side Implicit Cache Eviction on Gemini 4 Neon…", 20 Nov
  - "Gemini 4 models caching issue in Antigravity", 21 Nov
  — listed on [t/203048](https://discuss.ai.google.dev/t/203048), [t/202768](https://discuss.ai.google.dev/t/202768) and [t/202020](https://discuss.ai.google.dev/t/202020)
- From a search snippet only: a forum-team reply says Gemini 4 models (Hydrogen, Argon, Carbon) "use implicit caching only and do not support cachedContents". Explicit caching returns 400 INVALID_ARGUMENT. **[forum-staff?; snippet only, not fetched]** — [t/200723](https://discuss.ai.google.dev/t/title-gemini-4-removes-explicit-context-caching-my-per-call-cost-goes-up-4x-with-no-way-to-control-it/200723)
- Quota cache weighting: in the 42-step session, cache reads fit ~$0.30/M quota-dollars, so quota discounts cache hits by the same 95% ratio as the API. **[receipt; n = 1]** — [t/196351](https://discuss.ai.google.dev/t/196351)
- M_B4 claims a 256K compaction clamp that wipes cache reads (ticket #198430, not read). **[anecdotal]** — [t/196351](https://discuss.ai.google.dev/t/196351)

### Inferences
- Effect size on the 42-step Argon session if every cache read had missed (my arithmetic, quota rates $6 / $0.30 / $30):
  - With cache: **$4.65** quota-dollars.
  - With 0% hits: (220,998 + 3,948,273) × $6/M + 71,432 × $30/M = $25.016 + $2.143 = **$27.16**.
  - That is **5.84x** more quota for the same work, so on such a session 8.7x falls to ≈ 8.67 / 5.84 ≈ **1.5x** effective.
  - This is the worst case for long agentic sessions with heavy cache reuse, ~95% of input tokens cached.
- t/202768's 5.5x for one collapsed turn agrees with that order of magnitude.
- The evidence is not uniform: Argon-medium at 99.5% vs 0% reports. The issue looks intermittent, tied to pauses over 5 min, or session- and version-specific (2.33.0, mid-Nov onward), not a constant 0%.
- For valuation, a cache-miss penalty applies when (a) idle gaps exceed ~3–5 min, or (b) users hit the reported mid-Nov regression. The steady-state penalty is unknown.
- No receipt shows quota being charged during a 0%-hit episode. Charging at the uncached rate is inferred from the token counts plus the $0.30 cache weighting; no one has measured it directly.

### Gaps
- No Google acknowledgement, incident or fix note found as of 21 Nov.
- Whether CLI v1.5.13 or any App build after 2.33.0 fixes the problem is untested.
- No quota-fraction receipt exists for a 0%-hit session.

## 4. Google statements on Antigravity quota rates after launch pricing ends (1 Dec)

### Takeaway
I found no Google statement on what happens to Argon/Carbon quota rates on 1 Dec. The API price change itself is confirmed. Google's blog says quota is "drawn down according to API pricing", but measurements show Argon and Carbon already drawing at $6/$30 instead of $2/$10. A forum reply (role unclear) says promo rates apply only to PAYG and that per-model multipliers are not published. Both outcomes remain possible: a fixed $6/$30, or 3x applied to the new price.

### Cited Findings
- API pricing:
  - Carbon and Argon: $2.00 / $10.00 / $0.10 cached per M "through November 30, 2026", then **$4.00 / $20.00 / $0.20 from Dec 1, 2026**.
  - Neon: $3 / $15 / $0.15, no promo listed. Hydrogen: $1.50 / $7.50 / $0.075.
  - **Gemini 3.8 Flash: $0.75 / $3.75 through Dec 31, 2026, then $1.50 / $7.50 from Jan 1, 2027.**
  - No >200K tier listed for these models.
  **[official]** — [Gemini API pricing (redirects to aistudio.google.com/docs/pricing)](https://aistudio.google.com/docs/pricing)
- Blog "Changes to Antigravity plans", **19 May 2026**: Gemini models share "a single rate limit, drawn down according to API pricing". Example: "if Gemini Flash is 8x cheaper than Gemini Pro according to API pricing, you can use X tokens on Gemini Pro…" The $100 Ultra plan gets 5X the Pro plan's tokens and the $200 Ultra plan 20X; "This ratio also applies during promotional periods." The post says nothing about launch prices ending. **[official]** — [antigravity.google/blog](https://antigravity.google/blog/changes-to-antigravity-plans)
- Plans page: limits are "primarily determined by available capacity". No numeric caps, no per-model weights, no December changes. AI Credits are consumed at "standard Gemini Enterprise consumption pricing". **[official]** — [antigravity.google/docs/plans](https://antigravity.google/docs/plans)
- Models page: no prices, weights or launch-pricing mentions. **[official]** — [antigravity.google/docs/models](https://antigravity.google/docs/models)
- The Google launch post on X says Argon "will launch at an introductory price" of $2/$10 (search snippet). **[official]** — [x.com/Google](https://x.com/Google/status/2110041305925484716)
- Moderator, 29 Oct: promo API rates "apply only to pay-as-you-go API billing"; multipliers are not published because limits "adjust dynamically with system capacity". **[forum-staff?]** — [t/196351](https://discuss.ai.google.dev/t/196351)
- Third-party searches found only the API price doubling, nothing on quota (e.g. [buildmvpfast](https://www.buildmvpfast.com/blog/gemini-4-argon-pricing-intro-rates-2026)) — **[secondary]**

### Inferences
- Scenarios for 1 Dec, holding the Flash-denominated pool fixed ($600/week per the project premise, unverified) and valuing at new API prices of $4/$20:
  - **A. Quota stays at $6/$30 absolute** (1.5x the standard price). Argon tokens per week are unchanged. Their API value doubles: $200 × (4/2) = $400/week. $400 × 52/12 = $1,733/month, and $1,733 / $99.99 ≈ **17.3x**.
  - **B. Quota rescales to 3x the new price ($12/$60).** Tokens per week halve. API value = $600 / 3 = $200/week, so **8.7x** is unchanged in API-dollar terms, with half the work done.
  - **C. Quota follows the blog literally (1x API price, $4/$20).** API value = $600/week, giving ≈ **26.0x**. This contradicts current behaviour and seems unlikely.
- The fact that $6/$30 = 1.5 × the $4/$20 standard price, plus the moderator's "promo applies only to PAYG", fits a hypothesis that quota already uses an internal post-promo price (standard × 1.5, or some capacity-based rate). That would favour scenario A. **This is speculation; Google has said nothing confirming it.**
- Separate risk: Flash's API price doubles on 1 Jan 2027. If the pool is fixed in Flash tokens, not dollars, the dollar-denominated pool and every cross-model ratio would be rescaled again on 1 Jan. Out of scope for December, but relevant to how long the multiplier holds.
- Practical recommendation: re-measure on or after 1 Dec. Repeat the t/196351 A/B: one single-step prompt, read `remainingFraction`, and compute quota per published dollar at $4/$20.

### Gaps
- I found no Google, Antigravity-staff or X statement on post-launch quota pricing. I did not find any posts by Antigravity staff on X about December quota.
- The Reddit $600/week figure is unverified (see Q1).

## 5. Carbon and Argon on Pro vs Ultra

### Takeaway
Carbon is Ultra/Enterprise-only, and the Carbon planner in Orchestrator is Ultra-only. Pro has no Carbon quota to weigh. On Pro, Argon has a separate weekly-only bucket on top of the Flash bucket, with no published size. On Ultra, measurements show Argon drawing the shared Gemini pool at 3x. No one has measured Pro's Argon bucket in dollars.

### Cited Findings
- Models page **[official]** — [antigravity.google/docs/models](https://antigravity.google/docs/models):
  - Gemini 4 Carbon (Low/Medium/High): **Ultra, Enterprise only**.
  - Gemini 4 Argon (Low/Medium/High): Pro (paid or eligible trial), Ultra, Enterprise.
  - Hydrogen: Pro non-trial, Ultra, Enterprise. Neon: Pro, Ultra, Enterprise.
  - Orchestrator planner options: Neon (default), **Carbon (Ultra only)**, Argon, Claude Opus 5.5.
  - The selector shows two meters, Gemini and Claude/GPT, each with weekly and 5-hour remaining.
- @antigravity on X, **15 Oct 2026**: "We've rolled out a separate weekly-only Argon quota for Pro on top of the existing Gemini bucket for 3.8 Flash". **[official, quoted via secondary]** — [x.com/antigravity](https://twitter.com/antigravity/status/2110866531932316011), via [pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/24640/gemini-4-argon-antigravity-ai-pro-separate-weekly-quota)
- Blog: $100 Ultra = 5X Pro's tokens; $200 Ultra = 20X. **[official]** — [antigravity.google/blog](https://antigravity.google/blog/changes-to-antigravity-plans)
- Pro-side bugs **[anecdotal]**:
  - A Pro account shows 0% Argon weekly quota with almost no use — [t/196609](https://discuss.ai.google.dev/t/bug-gemini-4-argon-shows-0-weekly-quota-on-a-separate-paid-google-ai-pro-account-with-virtually-no-antigravity-usage/196609)
  - Thread title (5 Nov): "Selecting Gemini 4 Argon in agy CLI drains standard Gemini quota instead of Argon weekly limit". Listed on [t/196351](https://discuss.ai.google.dev/t/196351); not fetched.

### Inferences
- The 5x/20x ratio in the blog covers the shared Gemini pool. Pro's separate Argon bucket may not follow it, so the Ultra 5x Argon value cannot be scaled down to Pro.
- Ultra users get Carbon in addition to Argon. With both at the same 3x and the same launch price, their per-dollar quota value is identical in the project model.

### Gaps
- Pro's Argon weekly bucket size and its weight are unpublished and unmeasured.
- I found no measurement of Carbon's quota weight on the $200 20x Ultra tier.
