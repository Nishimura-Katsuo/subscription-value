# Gemini 4 Neon quota burn rate per published API dollar in Google Antigravity (Nov 2026)

Neon API prices used throughout: $3 / $15 / $0.15 per 1M input / output / cached-read tokens. Searches covered discuss.ai.google.dev, GitHub, X (via Digg, Threads and aggregator mirrors; x.com itself returned HTTP 403), antigravity.google docs and blog, and HN. Reddit could not be searched because the search tool blocks the domain. Research date: 2026-11-21.

## Q1. Has anyone published a Neon quota-rate measurement (a clean A/B like t/196351), and what rate did they find?

### Takeaway
No. As of 21 Nov 2026 nobody has published a token-receipted Neon-vs-Flash/Hydrogen A/B, and neither t/196351 nor t/202481 has a Neon quota-rate follow-up. The best available data is the t/202481 session (~15% of the weekly Ultra 5x pool, ~17.5M uncached input, output not reported). Back-solving it with a calibrated pool size gives roughly 0.9–1.2x if the weekly pool is about 3x the 5-hour pool, and about 3x if the weekly pool was tripled in November. So the weekly-pool size, not the token data, sets the answer. A separate GitHub issue confirms that Neon draws the same shared Gemini pool as Flash and Hydrogen.

### Cited Findings
**t/196351 (Argon/Carbon A/B) has no Neon follow-up**
- Every post in the thread is about Argon, Carbon, Hydrogen and Flash. None mentions Gemini 4 Neon. — [t/196351](https://discuss.ai.google.dev/t/gemini-4-argon-draws-antigravity-quota-at-3x-gemini-3-8-flash-per-published-dollar-clean-a-b-same-bucket/196351)
- The thread's calibration data (OP Yiji_Kong, Oct 28, Antigravity 2.27.0, Ultra 5x, 5-hour bucket, read from `remainingFraction`, fresh single-turn conversations with no cache):
  - Flash (High): 15,111 in / 3,451 out, drop 0.00016180.
  - Argon (High): 14,918 in / 4,233 out, drop 0.00144340.
  - Nov 13 post: Argon High, Carbon High and Orchestrator (Carbon) all 3.00x; Hydrogen High 1.00x, in both the 5-hour and weekly buckets.
  - The author says AI Credit (overage) charges for Carbon match API price, so the 3x applies only to subscription quota. — [t/196351](https://discuss.ai.google.dev/t/gemini-4-argon-draws-antigravity-quota-at-3x-gemini-3-8-flash-per-published-dollar-clean-a-b-same-bucket/196351)
- In the same thread, Gemini Web (not Antigravity) follow-ups found Argon Low pure-input at 9.25x (7.64x after subtracting base overhead) and Argon High long-output at 4.24x. The OP's web methodology note says "Weekly is 20× the 5-hour pool" for Gemini Web. — [t/196351](https://discuss.ai.google.dev/t/gemini-4-argon-draws-antigravity-quota-at-3x-gemini-3-8-flash-per-published-dollar-clean-a-b-same-bucket/196351)

**t/202481 (Zydr114, Nov 19): the main Neon session data point (has token receipts, but no output tokens and a rounded quota %)**
- Setup: Ultra 5x, Neon "Extra" thinking, Antigravity Desktop v2.33.0 (Windows) and v2.32.2 (Linux), ~50 minutes single-threaded.
- 150 consecutive audited calls used "~15% of my weekly Ultra 5x quota". Only the weekly figure is given, with no 5-hour figure.
- Cache: 100 calls were cache hits; 48 were misses (`cache_read_tokens = 0`).
- Uncached input was ~17.5M in total, of which 16.66M (~95%) was redundant prefix. Misses resent 16,850,279 tokens; without eviction the author expected ~850K uncached.
- Example steps: step 136 in=347,192 with cache=0; step 281 cache=511,722 (compaction).
- Miss rate by context size: 8.6% at 100–200K, 30.4% at 200–300K, 40.6% at 300–400K, 64.5% at 400–500K.
- Output tokens are not reported. — [t/202481](https://discuss.ai.google.dev/t/bug-report-severe-server-side-implicit-cache-eviction-on-gemini-4-neon-64-5-miss-rate-at-400k-500k-context-95-redundant-uncached-input/202481)
- Reply (Manuel3, Nov 20, Google AI Pro, Antigravity 1.5.12): 8 Neon sessions (Medium, High, XHigh and Orchestrator), 430 calls, ~70.6M input. Cache hit rate was 88.4% overall and 94.9% on warm calls. **No quota % reported.** No Google staff replies in the thread. — [t/202481](https://discuss.ai.google.dev/t/bug-report-severe-server-side-implicit-cache-eviction-on-gemini-4-neon-64-5-miss-rate-at-400k-500k-context-95-redundant-uncached-input/202481)

**OmniRoute issue #20832 (Nov 20): pool confirmation, no tokens**
- Neon and Hydrogen are metered in the regular `gemini` group, "the same pool as `gemini-3-flash`". Argon (`gemini-4-argon-*`) sits in a separate `gemini_4_argon` group.
- Data: one Google AI Pro account, from `/api/usage/<connectionId>`.
  - `gemini-4-neon-low/medium/high/xhigh`, `gemini-4-hydrogen-*` and `gemini-3.8-flash-*` all show the identical remaining fraction 84.918, resetting 2026-11-21T00:30:39Z.
  - `gemini_session` was 84.58 and `gemini_weekly` 95.17 (weekly reset 2026-11-27T02:09:23Z).
  - Argon weekly was 99.994.
- The window held 61 successful `gemini-4-neon-medium`/`-xhigh` requests and 1–2 requests to each other model. The shared Gemini pool fell ~15% and the Argon pool ~0.006%.
- No token counts or weights are reported. — [OmniRoute #20832](https://github.com/cheaper-inference/OmniRoute/issues/20832)
- Conflict: Ultra's `/usage` in t/203267 lists Argon *inside* the GEMINI MODELS bucket (Neon, Carbon, Argon, Hydrogen, the Orchestrators, 3.8 Flash), but the OmniRoute Pro data shows Argon in its own pool. — [t/203267](https://discuss.ai.google.dev/t/google-ai-ultra-gemini-models-weekly-quota-drained-to-0-00-in-3-days-of-normal-agy-use-error-tells-an-active-ultra-subscriber-to-upgrade-error-id-f3ce1100-35842/203267); [OmniRoute #20832](https://github.com/cheaper-inference/OmniRoute/issues/20832)

**t/203267 (BryanORourke, Nov 20): anecdote only, no tokens**
- Plan: Google AI Ultra, $199.99/mo, which suggests the 20x tier, not 5x. Model: Gemini 4 Neon in `agy` CLI, Windows 11; effort not stated.
- GEMINI MODELS weekly bucket at 0.00% after "~3 days of normal agy use", refresh in 98h 16m, 5-hour bucket disabled. CLAUDE AND GPT MODELS weekly at 45.48%.
- Error: "Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 105h41m26s."
- No tokens, per-day % or staff reply. — [t/203267](https://discuss.ai.google.dev/t/google-ai-ultra-gemini-models-weekly-quota-drained-to-0-00-in-3-days-of-normal-agy-use-error-tells-an-active-ultra-subscriber-to-upgrade-error-id-f3ce1100-35842/203267)

**t/203507 (Nov 21): Neon tokens, no quota %**
- Model `gemini-4-neon-xhigh`, Ultra.
- Session 5a02977a (Nov 21, 03:48–04:43Z, 60 steps): input_tokens 2,799,600; cache_read_tokens 3,919,774; 58.3% hit rate.
- Post-patch session d4e31592 (14:43–15:05Z, 14 steps): 402,032 input; 535,488 cache read; 57.1% hit rate.
- No quota % deltas. The author only says quota burned "at nearly double the expected rate". — [t/203507](https://discuss.ai.google.dev/t/unacceptable-post-patch-reality-promised-92-96-cache-hit-rate-vs-57-actual-kv-cache-18s-server-evictions-unfair-sharding-on-new-paid-accounts/203507)

**Other searches**
- Search turned up no other Neon per-dollar quota measurement; blog and aggregator pages only repeat Artificial Analysis API cost-per-task figures. — [Search result: alekseialeinikov.com](https://www.alekseialeinikov.com/en/blog/topics/ai/gemini-4-neon-vs-claude-opus-5-5-hydrogen-carbon); [valyu.ai](https://www.valyu.ai/blogs/gemini-4-neon-vs-carbon-vs-hydrogen-vs-argon)

### Inferences
**Step 1: calibrate the Ultra 5x 5-hour pool in "1.00x dollars"** (my arithmetic, from the t/196351 OP data)
- Flash High cost: 15,111 × $0.75/M + 3,451 × $3.75/M = $0.011333 + $0.012941 = $0.024275.
- That cost produced a 0.00016180 drop, so the 5-hour pool ≈ $0.024275 / 0.00016180 ≈ **$150** at 1.00x.
- Check with Argon High: 14,918 × $2/M + 4,233 × $10/M = $0.072166 at API price. Its drop is 0.0014434 × $150 = $0.2165, and $0.2165 / $0.0722 = **3.00x**, matching the thread.
- Caveat: this calibration is from 28 Oct and may have changed since. A search snippet points to an Android Authority story on Google "again tripling weekly Gemini quotas across all paid plans" in Antigravity ([androidauthority](https://androidauthority.com/gemini-antigravity-limits-increased-3670209), not fetched, date unverified).

**Step 2: weekly-to-5-hour ratio**
- OmniRoute Pro data: the session pool fell from 100 to 84.58 (15.42 points) while the weekly fell 4.83 points. The weekly window opened earlier (it resets Nov 27 02:09Z, so it opened ~Nov 20 02:09Z) than the session window (~Nov 20 19:30Z). That means the weekly drop includes at least the session's usage, so W ≥ 0.1542 / 0.0483 × P5 ≈ **3.2 × P5** on Pro.
- This is consistent with a forum claim that "the weekly quota is equivalent to 3x 5-hour refresh usage" (search snippet). It conflicts with the "weekly is 20×" note in t/196351, which was for Gemini Web.

**Step 3: estimate the t/202481 session's Neon API cost** (assumptions flagged)
- Uncached input: 17.5M × $3 = **$52.50** (from the receipt).
- Cached reads: 100 hits at contexts of roughly 100–500K, assumed 10–40M tokens × $0.15 = **$1.5–6** (assumption, not in the receipt).
- Output: not reported. Assuming 1–5K per Extra-effort call × 150 calls = 0.15–0.75M × $15 = **$2.25–11.25** (assumption).
- Total ≈ **$56–70**. Uncached input is 75–94% of it, so the result is driven by input.

**Step 4: implied Neon multiplier**, rate = 0.15 × W / ($56–70)
- If W = 3 × $150 = $450: 15% = $67.5, so the rate ≈ **0.96–1.2x**.
- If weekly quotas were tripled (W ≈ $1,350): 15% = $202, so the rate ≈ **2.9–3.6x**.
- If the 5-hour pool itself changed since Oct 28, scale accordingly.
- Either way, "~15%" is rounded (±0.5 pt changes the rate by about ±3%), and only one account and session is involved. Treat this as weak evidence. It is not an A/B.
- The parent's ~1.1–1.5x estimate holds only if W ≈ $450–560 at 1.00x.

**Step 5: OmniRoute Pro, and what it means for Neon vs Argon/Carbon**
- 61 Neon calls drew ~15.4% of the Pro 5-hour pool, but no tokens are given, so no rate can be computed.
- Because Neon shares the pool and remaining-fraction counter with Flash and Hydrogen (both measured at 1.00x), Neon's weight sits in the same accounting as those 1.00x models. That suggests, but does not prove, that Neon is weighted at its API price (1.00x), unlike the 3x seen for Argon and Carbon.

### Gaps
- No clean single-turn A/B (Neon vs Flash or Hydrogen, same bucket, zero cache, with `remainingFraction` deltas) was found anywhere. This is the single most needed data point.
- t/202481 gives no output tokens, no cached-token total and no 5-hour figure, and Ultra 5x's current weekly-pool size is unpublished. The rate therefore can't be pinned to better than roughly 1x to 3x from that thread alone.
- Reddit (r/google_antigravity, r/Bard and others) could not be searched because the tool blocks the domain, and x.com returned 403. Measurements posted only there would have been missed.

## Q2. Do Google staff, docs, release notes or the Neon launch blog state Neon's quota weight, a separate pool, or a launch multiplier?

### Takeaway
No official source states a Neon quota weight or a launch or promotional multiplier. The docs say only that limits "correlate with the amount of work done"; the in-app `/usage` text reportedly says quota is "consumed proportionally to the cost of the tokens". Staff publicly tied Neon's quota burn to cache misses and reset everyone's Gemini quota on Nov 21.

### Cited Findings
**Launch blog**
- Neon is rolling out to "paid Google AI Pro and Google AI Ultra subscribers" in the desktop app, CLI and IDE extensions.
- It has four thinking levels, Low to Extra High, with High as the default.
- At High it has "32% lower cost per task than Carbon". The Orchestrator section mentions handing routine work to Hydrogen for "stretching your quota further on every run".
- No quota weight, pool or promotion is mentioned. — [Antigravity blog: Gemini 4 Neon](https://antigravity.google/blog/gemini-4-neon-in-google-antigravity/)

**Forum launch thread (rody, Antigravity team, t/202301)**
- Same 32% cost-per-task claim and a "Context window of up to 512K tokens in Antigravity". No quota figures.
- Staff reply (Rebbanpalli_Naveen, Nov 20) covers thinking and context issues, again with no quota figures. — [t/202301](https://discuss.ai.google.dev/t/gemini-4-neon-and-orchestrator-neon-are-now-available-in-google-antigravity/202301)

**Plans docs**
- No mention of API price, cached tokens, effort levels, an Argon pool or multipliers.
- Quotes: "the rate limits correlate with the amount of work done by the agent"; "more complex tasks consume more quota"; limits are "primarily determined by available capacity".
- Ultra gets "The highest, most generous quota, refreshed every five hours" and "The highest weekly rate limits". No 5x or 20x figures are given.
- Overage AI credits are "consumed at standard Gemini Enterprise consumption pricing".
- "Usage limits for this service are subject to modification." — [antigravity.google/docs/plans](https://antigravity.google/docs/plans)

**Pricing statements in forum threads**
- A thread reports that the `/usage` text says "Quota is consumed proportionally to the cost of the tokens", and that interactive and headless `agy -p` share the same buckets and per-token weights (search snippet). — [t/198073](https://discuss.ai.google.dev/t/headless-agy-p-quota-consumption-vs-interactive-cli-on-google-ai-ultra-krw-300-000-mo/198073)
- A user in t/196351 quoted a Google blog: "Now, we are combining these into a single rate limit, drawn down according to API pricing."
- Maniraj_Chervirala (Oct 29, role unverified) said the multipliers are not published. — [t/196351](https://discuss.ai.google.dev/t/gemini-4-argon-draws-antigravity-quota-at-3x-gemini-3-8-flash-per-published-dollar-clean-a-b-same-bucket/196351)

**Varun Mohan (Antigravity leadership) on X**
- Promise post: "We're rolling out a change to increase cache hit rate on Neon by around 4% on Antigravity by massive increasing the cache pool size. This will increase what you can get done in quota by at least 20%. Will issue a reset after it's done since it burned quota faster!" — [X post 2123848516581892181](https://x.com/_mohansolo/status/2123848516581892181) (text via search index; x.com returned 403 to direct fetch). The snowflake ID decodes to about Nov 20, ~18:30 UTC (my calculation).
- Reset post (Nov 21, 09:18 UTC per AGY Resets): "Reset everyone's Gemini quota on Antigravity. The caching improvements have increased the amount you can get done in quota by 22%. Enjoy building with Neon over the weekend!" — [X post 2124070033534161407](https://x.com/_mohansolo/status/2124070033534161407); [AGY Resets](https://www.agyresets.com/)
- Mohan also wrote: "The hit rate was particularly bad for workloads where there was more time between model invocatikns (cache was evicted)." (sic) — [Digg summary](https://digg.com/ai/do6njmen)
- Antigravity 2.34.0 shipped with the caching fix and the reset. — [Kai on X](https://x.com/hqmank/status/2124094331120402552)

### Inferences
- Mohan's "since it burned quota faster" is a staff admission that Neon's effective quota per task was worse than intended at launch because of cache eviction. It does not say Neon's per-token weight was anything other than standard.
- Read alongside the "proportional to the cost of the tokens" wording and t/196351's finding that Argon and Carbon run at 3x, the "official" rule appears to be 1.00x of API price, with Argon and Carbon as measured exceptions. Whether Neon is an exception is unmeasured.

### Gaps
- No official Neon-specific weight, no separate Neon pool and no launch promotion was found.
- Antigravity release notes for 2.33 and 2.34 were not fetched directly. The 2.34.0 caching fix is known only from secondary X posts.

## Q3. Are Neon's cached reads billed to quota at the cached rate?

### Takeaway
There is no direct measurement. Staff statements imply cached reads are heavily discounted in quota: a ~4-point gain in hit rate yields "at least 20%" (later "22%") more work, which only works if cached tokens count far below uncached ones. The magnitude is consistent with cached reads counting at about the cached API price ($0.15 vs $3, i.e. 5%).

### Cited Findings
- Staff: a cache hit rate increase of "around 4%" on Neon will "increase what you can get done in quota by at least 20%"; after the fix, "22%". — [X post 2123848516581892181](https://x.com/_mohansolo/status/2123848516581892181); [X post 2124070033534161407](https://x.com/_mohansolo/status/2124070033534161407)
- A user cites the leadership announcement as taking the hit rate from ~92% to ~96%, but gives no link. Post-patch, that user measured 57.1–58.3% hit rates on `gemini-4-neon-xhigh`. They claim misses are charged at the full raw-input rate but do not state how cache reads count. — [t/203507](https://discuss.ai.google.dev/t/unacceptable-post-patch-reality-promised-92-96-cache-hit-rate-vs-57-actual-kv-cache-18s-server-evictions-unfair-sharding-on-new-paid-accounts/203507)
- In t/196351 the OP assumed cache reads at about $0.30/1M when converting a 42-step Argon session (220,998 in / 3,948,273 cache read / 71,432 out, drop 0.03154810 of the 5-hour pool). This is an assumption, not a measured cache weight. — [t/196351](https://discuss.ai.google.dev/t/gemini-4-argon-draws-antigravity-quota-at-3x-gemini-3-8-flash-per-published-dollar-clean-a-b-same-bucket/196351)
- t/203048 (Nov 20, Ultra) reports Carbon High and Argon High at 0.00% cache hits at 120,381–154,080-token prefixes with 21–22 s gaps, versus a "~98% cache hit rate" on Neon. No Neon token counts and no quota deltas; no staff reply.
- Its related-topics list includes a Carbon High thread citing "5.5x cost" from a mid-turn cache collapse. — [t/203048](https://discuss.ai.google.dev/t/ultra-feedback-telemetry-0-cache-hit-rate-on-carbon-argon-120k-tokens-21s-interval-vs-98-on-neon-unacceptable-quota-drain-for-long-context-workflows/203048)
- Conflict: t/202481 measured 8.6–64.5% miss rates on Neon by context size, and t/203507 measured ~57% hits, both contradicting the ~98% figure in t/203048. — [t/202481](https://discuss.ai.google.dev/t/bug-report-severe-server-side-implicit-cache-eviction-on-gemini-4-neon-64-5-miss-rate-at-400k-500k-context-95-redundant-uncached-input/202481); [t/203507](https://discuss.ai.google.dev/t/unacceptable-post-patch-reality-promised-92-96-cache-hit-rate-vs-57-actual-kv-cache-18s-server-evictions-unfair-sharding-on-new-paid-accounts/203507)

### Inferences
**What the staff 92%→96% / +20–22% claim implies about the cached weight c** (my arithmetic; c is the cached weight relative to uncached input)
- Input cost per prompt token ∝ (1 − h) + h·c, where h is the hit rate.
- If c = 0.05 (the API ratio $0.15/$3): 0.08 + 0.92·0.05 = 0.126 before, 0.04 + 0.96·0.05 = 0.088 after. Input cost falls 30%, or 1.43x more input-work.
- That becomes a 20% overall gain if input is about 55% of total session cost. Agentic sessions with large contexts plausibly sit there.
- If c = 1 (no discount), the hit rate would not change quota at all, which contradicts the staff claim.
- The claim therefore supports cached reads counting at a steep discount, roughly the API cached rate. It cannot distinguish c = 0.05 from c ≈ 0.1.

**How cache misses inflate per-task cost**
- t/203507 session 5a02977a at Neon prices: 2.7996M × $3 = $8.40 uncached plus 3.92M × $0.15 = $0.59 cached.
- At the claimed ~96% hit rate, the same 6.72M input tokens would cost about 0.27M × $3 + 6.45M × $0.15 = $0.81 + $0.97 = $1.78, roughly 5x less.
- Cache eviction, not the per-dollar weight, explains most of the "Neon drains quota fast" reports. It also confounds any per-dollar inference made without per-call cache receipts.

### Gaps
- No one has measured the quota delta for a cache-hit-heavy Neon call against an uncached one. The cached-read weight in quota is inferred only from staff's aggregate claim.

## Q4. Do effort levels (Low/Medium/High/Extra) draw at different rates per token?

### Takeaway
There is no Neon-specific evidence. All four Neon effort variants share one pool and one remaining-fraction counter, but nobody has measured per-token weights by effort.

### Cited Findings
- `gemini-4-neon-low/medium/high/xhigh` all report the same remaining fraction (84.918) in the shared Gemini pool on a Pro account, so they share one pool. Per-variant weights were not reported. — [OmniRoute #20832](https://github.com/cheaper-inference/OmniRoute/issues/20832)
- Indirect, pre-Neon, Gemini Web rather than Antigravity: Argon Low pure-input measured 9.25x (7.64x after base-overhead subtraction), while Argon High long-output measured 4.24x. The author attributed the gap partly to a fixed per-request base overhead (tiny prompt, Argon Low: +0.00015849 weekly), not to effort weighting. In Antigravity, Argon High and Flash High were 3.00x. — [t/196351](https://discuss.ai.google.dev/t/gemini-4-argon-draws-antigravity-quota-at-3x-gemini-3-8-flash-per-published-dollar-clean-a-b-same-bucket/196351)
- The launch blog lists four levels (default High) and says nothing about effort-based quota weighting. — [Antigravity blog](https://antigravity.google/blog/gemini-4-neon-in-google-antigravity/)

### Inferences
- If quota is "proportional to the cost of the tokens", higher effort costs more quota only through extra thinking and output tokens billed at $15/M, not through a higher per-token weight. No evidence confirms or refutes this for Neon.

### Gaps
- No per-effort Neon A/B exists. The t/202481 measurement is Extra-only, and the OmniRoute data mixes Medium and XHigh without tokens.

## Q5. Has Neon quota been changed (nerfed or boosted) since launch?

### Takeaway
No per-token weight change was announced. Since launch there have been two quota resets (Nov 17 for all models; Nov 21 for Gemini with a Neon caching fix), and staff claim the fix stretches quota by 22%, an effective boost via caching. Users dispute that the fix is delivering.

### Cited Findings
- **Nov 17, 23:38 UTC:** "In honor of Antigravity turning 1, we're resetting quota for everyone across all models!" (the day before Neon's launch). — [AGY Resets](https://www.agyresets.com/)
- **Nov 21, 09:18 UTC:** Gemini quota reset for everyone, plus the caching improvement claimed at "22%" more work in quota. — [AGY Resets](https://www.agyresets.com/); [X](https://x.com/_mohansolo/status/2124070033534161407)
- @JackWoth98 said a reset was "on the way so you can enjoy more Gemini 4 Neon this weekend!" — [Digg](https://digg.com/ai/do6njmen)
- **Earlier resets:** Nov 13 Gemini reset and Nov 6 Gemini + Argon reset (pre-Neon). AGY Resets lists no multiplier boosts or nerfs for November. — [AGY Resets](https://www.agyresets.com/)
- **Post-patch complaint (Nov 21):** `gemini-4-neon-xhigh` hit rate measured at 57.1% after the patch, against the promised ~92–96%, with 18 s evictions. — [t/203507](https://discuss.ai.google.dev/t/unacceptable-post-patch-reality-promised-92-96-cache-hit-rate-vs-57-actual-kv-cache-18s-server-evictions-unfair-sharding-on-new-paid-accounts/203507)
- **Access restriction:** a "Master Evidence Dossier" thread title reports Neon now blocked for Jio Google AI Pro users. Not fetched. — [t/202461](https://discuss.ai.google.dev/t/master-evidence-dossier-0-4-gemini-4-models-now-blocking-neon-reversed-staff-promises-retroactive-doc-edits-data-training-on-jio-google-ai-pro/202461)
- **User report:** Devjay in the launch thread says Neon chats were cut to about 100K context and that their 5-hour limit reset on 18 Nov at 04:43 UTC. — [t/202301](https://discuss.ai.google.dev/t/gemini-4-neon-and-orchestrator-neon-are-now-available-in-google-antigravity/202301)
- **Tooling caveat** for anyone measuring:
  - The `cloudcode-pa` host returned `remainingFraction: 1` for every bucket even while Neon was quota-exhausted; `daily-cloudcode-pa` returned real values. — [CLIProxyAPI #7806](https://github.com/router-for-me/CLIProxyAPI/issues/7806)
  - A zero `remainingFraction` can be omitted by proto3 serialization and back-filled as 100%. — [t3code #39828](https://github.com/pingdotgg/t3code/issues/39828)

### Inferences
- The 22% claim is a change in effective dollars of work per quota (fewer cache misses). It is not a change in the per-dollar multiplier. Any Neon rate measured from pre-Nov-21 sessions (for example t/202481) reflects the worse cache behaviour, but the multiplier itself should be unaffected if computed from actual uncached and cached token receipts.

### Gaps
- There is no confirmation of whether the reported tripling of weekly Gemini quotas (Android Authority) predates or postdates the Oct 28 calibration, and no published Ultra 5x vs 20x weekly pool sizes. Both are needed to convert t/202481's 15% into a firm multiplier.
