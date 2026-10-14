# Haspot: recommended plan, Light anchors

*2026-10-14 · Based on 48 simulated scenarios (6 strategies × 8 economies, 300 runs each, 36 months). Demand and failure rates are the business plan's assumptions until the pilot calibrates them.*

## The decision

**Run Haspot as "Light anchors":** 2 slots per network for anchors (1 per client), 8 open monthly slots.

It is the strongest strategy across all 8 economies tested: an average **92%** chance of ₹1 lakh net a month by month 24, best in 7 of 8 economies, and its worst case (recession) is still 50%.

| Economy | P(₹1L by m18) | by m24 | Typical month to ₹1L | Median net m24 | Lowest cash (5th pct) | P(out of credit) |
| --- | --- | --- | --- | --- | --- | --- |
| Normal economy | 92% | 100% | 14 | ₹1,33,833 | ₹0 | 0% |
| Boom | 100% | 100% | 12 | ₹1,43,776 | ₹0 | 0% |
| Recession | 21% | 50% | 24 | ₹82,864 | ₹0 | 0% |
| Cost inflation | 79% | 99% | 16 | ₹1,26,034 | −₹30,400 | 0% |
| Tight money | 80% | 98% | 16 | ₹1,33,439 | ₹0 | 0% |
| Bad year, then recovery | 39% | 91% | 19 | ₹1,32,604 | ₹0 | 0% |
| Price-sensitive market | 92% | 100% | 14 | ₹1,33,833 | ₹0 | 0% |
| Hardware trouble | 88% | 100% | 15 | ₹1,27,727 | ₹0 | 0% |

## Why this plan

- In a normal economy it reaches ₹1 lakh a month by month 14 in a typical run, with a 92% chance by month 18.
- That is 2 months sooner than the plan's all-monthly model (77% by month 18).
- It holds up best when budgets are cut: 50% chance of ₹1 lakh by month 24 in a recession, against 21% for all-monthly.
- Runner-up overall: Lean infra (average score 117 vs 126).

## Roadmap

### Phase 1: Launch (months 0–3)

- Install 10 pharmacy screens, sign the 5 founding advertisers (3 months prepaid), and set up the hub shop with 1 spare TV and 2 spare hotspots.
- Pitch hospitals, labs, schools and coaching institutes for anchor leases (1 slot each, 12 months, billed quarterly in advance).
- Run the power-cut test on every TV before installing it.

In a typical simulated run:
- Month 2: First anchor lease running

### Phase 2: Fill Pharmacy and expand (months 4–8)

- Add 10 more pharmacy screens as soon as 7 of 10 slots are sold and cash covers the kit (₹1,36,500), then 1 more to reach 21.
- Launch the Kirana network (10 screens) once Pharmacy has 20 screens and 7 slots sold.

In a typical simulated run:
- Month 4: Expanded Pharmacy: +10 screens (₹1,36,500)
- Month 4: First month in profit (₹14,577)
- Month 4: Lowest cash point: ₹11,937
- Month 5: Expanded Pharmacy: +1 screens (₹13,650)
- Month 6: Launched Kirana: +10 screens (₹1,36,500)

### Phase 3: Scale Kirana to full size (months 9–15)

- Grow Kirana to 21 screens on the same 7-of-10 rule.
- Keep founder time under 4 hours a week: turn on the Apps Script monthly close once you pass about 30 screens.

In a typical simulated run:
- Month 12: Expanded Kirana: +10 screens (₹1,36,500)
- Month 13: Expanded Kirana: +1 screens (₹13,650)
- Month 13: Net profit passes ₹1 lakh a month (₹1,17,894)

### Phase 4: Optimise (month 16 onward)

- When a network sells out, test a higher list price on new advertisers (the simulation shows ₹600 earning most once full).
- Move signage to a self-hosted server from year 2 only if it still needs no licences; recheck uptime monthly.

## Checkpoints: on track or not?

Compare your real numbers with these each month. **On track** is the median run in a normal economy; **Warning line** is the median run in a recession. Below the warning line, use the switch rules in the next section.

| Month | Screens (on track) | Slots sold, on track | Slots sold, warning line | Net / month, on track | Net / month, warning line | Cash, on track |
| --- | --- | --- | --- | --- | --- | --- |
| 3 | 10 | 8 | 7 | −₹3,651 | −₹8,505 | ₹99,337 |
| 6 | 31 | 9 | 8 | ₹37,843 | ₹26,776 | ₹54,912 |
| 9 | 31 | 13 | 10 | ₹47,836 | ₹29,163 | ₹2,64,781 |
| 12 | 31 | 16 | 12 | ₹59,453 | ₹39,184 | ₹5,06,757 |
| 18 | 42 | 19 | 13 | ₹1,31,629 | ₹65,783 | ₹11,09,122 |
| 24 | 42 | 19 | 14 | ₹1,33,833 | ₹82,864 | ₹18,85,079 |

## If the market turns out different

| If you see… | It looks like | Best strategy there | Chance of ₹1L by m24 (this plan → best there) |
| --- | --- | --- | --- |
| More than one new advertiser per network signs most months and churn stays under 3%. | Boom | Premium price ₹600 | 100% → 100% |
| Fewer slots sold than the warning line below, or advertisers cancelling more than 1 in 10 a month. | Recession | **Stay the course** | 50% |
| Kit quotes above ₹16,000 a screen, or hosts asking ₹600 or more a month. | Cost inflation | **Stay the course** | 99% |
| The bank cuts your credit line, or you can no longer put in ₹40,000 a month. | Tight money | **Stay the course** | 98% |
| Sales stall after a good start (month 3 or later) while churn doubles. | Bad year, then recovery | **Stay the course** | 91% |
| Most lost pitches mention price, and the few at ₹300–400 sign quickly. | Price-sensitive market | **Stay the course** | 100% |
| Uptime below 97% two months running, or TVs failing the power-cut test. | Hardware trouble | **Stay the course** | 100% |

## Watch-outs

- Premium price ₹600 earns more once the network is full (median ₹1,63,303 a month at month 36 vs ₹1,34,547). Once both networks sell out, test that move.
- The worst case is a recession: only 50% chance of ₹1 lakh by month 24. If you are below the warning line in the checkpoints for two months running, hold off on the next batch of screens and push anchor and institution sales.
- Anchor numbers are assumptions (25% of pitches sign, 70% renew). Check them on the first trip: if fewer than 1 in 6 institution meetings sign, fall back to all-monthly slots.
- No run ran out of credit in any economy, but keep the credit line open through the expansion months.

## Before you commit: calibrate

Run the pilot (first 2–10 screens) for 8 weeks, then put the real numbers into Config and rerun the Scenario lab:

- New advertisers per month and churn → `demand.arrivalsPerNetwork`, `demand.churnMonthly`
- Anchor meetings that sign, and renewals → `anchors.pitchSuccess`, `anchors.renewProb`
- Unplugs, failed restarts, TV and hotspot failures → `events.*`

Buy the next 10 screens only if the recalibrated plan still shows at least a 60% chance of ₹1 lakh by month 24, and the 5th-percentile lowest cash stays inside your credit limit.
