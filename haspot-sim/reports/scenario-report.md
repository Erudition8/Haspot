# Haspot Sim: scenario report

Generated 2026-10-14 · 300 Monte Carlo runs per scenario · 36 months · 6 strategies × 8 economies = 48 scenarios.

Every run starts the same way the plan does: ₹1,17,800 put in, 10 pharmacy screens, 5 founding advertisers, spares, and growth by the plan's rules (expand at 7 of 10 slots sold, Kirana after 20 pharmacy screens, up to 21 per network). Demand and failure rates are the plan's assumptions until the pilot calibrates them, so treat the numbers as comparisons, not forecasts.

## Recommended plan: Light anchors

2 slots per network for anchors (1 per client), 8 open monthly slots.

- Average chance of ₹1 lakh net a month by month 24, across all 8 economies: **92%**
- Worst economy for it: **Recession** (50%)
- Best strategy in: Normal economy, Recession, Cost inflation, Tight money, Bad year, then recovery, Price-sensitive market, Hardware trouble
- Average chance of running out of credit: 0%

### Why this one

- In a normal economy it reaches ₹1 lakh a month by month 14 in a typical run, with a 92% chance by month 18.
- That is 2 months sooner than the plan's all-monthly model (77% by month 18).
- It holds up best when budgets are cut: 50% chance of ₹1 lakh by month 24 in a recession, against 21% for all-monthly.
- Runner-up overall: Lean infra (average score 117 vs 126).

### Watch-outs

- Premium price ₹600 earns more once the network is full (median ₹1,63,303 a month at month 36 vs ₹1,34,547). Once both networks sell out, test that move.
- The worst case is a recession: only 50% chance of ₹1 lakh by month 24. If you are below the warning line in the checkpoints for two months running, hold off on the next batch of screens and push anchor and institution sales.
- Anchor numbers are assumptions (25% of pitches sign, 70% renew). Check them on the first trip: if fewer than 1 in 6 institution meetings sign, fall back to all-monthly slots.
- No run ran out of credit in any economy, but keep the credit line open through the expansion months.

### Month by month (typical run in a normal economy)

- **Month 2:** First anchor lease running
- **Month 4:** Expanded Pharmacy: +10 screens (₹1,36,500)
- **Month 4:** First month in profit (₹14,577)
- **Month 4:** Lowest cash point: ₹11,937
- **Month 5:** Expanded Pharmacy: +1 screens (₹13,650)
- **Month 6:** Launched Kirana: +10 screens (₹1,36,500)
- **Month 12:** Expanded Kirana: +10 screens (₹1,36,500)
- **Month 13:** Expanded Kirana: +1 screens (₹13,650)
- **Month 13:** Net profit passes ₹1 lakh a month (₹1,17,894)

At month 36: 42 screens, net ₹84,237 a month, cash ₹34,76,626, about 1.48 hours a week of your time.

## Strategy ranking (all economies)

| # | Strategy | Avg score | Avg P(₹1L by m24) | Worst case | Wins |
| --- | --- | --- | --- | --- | --- |
| 1 | Light anchors | 126 | 92% | 50% in Recession | 7 |
| 2 | Lean infra | 117 | 86% | 30% in Recession | 0 |
| 3 | Premium price ₹600 | 115 | 83% | 30% in Recession | 1 |
| 4 | Monthly slots (the plan) | 113 | 83% | 21% in Recession | 0 |
| 5 | Value price ₹400 | 95 | 72% | 0% in Cost inflation | 0 |
| 6 | Anchor-led | 86 | 67% | 12% in Recession | 0 |

Score = 100 × P(₹1L by m24) + 30 × P(by m18) − 150 × P(out of credit) + median net at the last month ÷ ₹10,000 − 5 per founder hour a week above 4.

## P(₹1 lakh a month by month 24)

| Strategy | Normal economy | Boom | Recession | Cost inflation | Tight money | Bad year, then recovery | Price-sensitive market | Hardware trouble |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Monthly slots (the plan) | 96% | 100% | 21% | 89% | 95% | 75% | 96% | 94% |
| Anchor-led | 73% | 96% | 12% | 68% | 70% | 74% | 73% | 65% |
| Light anchors | 100% | 100% | 50% | 99% | 98% | 91% | 100% | 100% |
| Premium price ₹600 | 96% | 100% | 30% | 89% | 94% | 77% | 86% | 94% |
| Value price ₹400 | 97% | 100% | 15% | 0% | 93% | 81% | 100% | 89% |
| Lean infra | 97% | 100% | 30% | 94% | 95% | 77% | 97% | 95% |

## Scenario report: Normal economy

The business plan's assumptions: 1 new advertiser per network a month, 5% churn.

Best strategy here: **Light anchors**.

| Strategy | P(₹1L by m18) | by m24 | Median month to ₹1L | Median net m12 / m24 / m36 | 5th-pct lowest cash | P(out of credit) | Hours/wk m24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Light anchors | 92% | 100% | 14 | ₹59,453 / ₹1,33,833 / ₹1,34,547 | ₹0 | 0% | 1.4 |
| Premium price ₹600 | 83% | 96% | 15 | ₹62,857 / ₹1,50,503 / ₹1,63,303 | ₹0 | 0% | 1.1 |
| Lean infra | 79% | 97% | 16 | ₹58,152 / ₹1,46,577 / ₹1,46,753 | ₹0 | 0% | 1.4 |
| Monthly slots (the plan) | 77% | 96% | 16 | ₹54,817 / ₹1,35,765 / ₹1,37,087 | ₹0 | 0% | 1.1 |
| Value price ₹400 | 74% | 97% | 16 | ₹51,935 / ₹1,05,162 / ₹1,06,260 | ₹0 | 0% | 1.1 |
| Anchor-led | 32% | 73% | 21 | ₹31,919 / ₹1,10,517 / ₹1,24,494 | ₹0 | 0% | 1.8 |

## Scenario report: Boom

Local businesses spend freely: 1.5 new advertisers a month, 3% churn, anchors easier to sign.

Best strategy here: **Premium price ₹600**.

| Strategy | P(₹1L by m18) | by m24 | Median month to ₹1L | Median net m12 / m24 / m36 | 5th-pct lowest cash | P(out of credit) | Hours/wk m24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Premium price ₹600 | 99% | 100% | 13 | ₹79,748 / ₹1,85,794 / ₹1,86,828 | ₹0 | 0% | 1.1 |
| Lean infra | 99% | 100% | 13 | ₹94,937 / ₹1,56,578 / ₹1,56,434 | ₹0 | 0% | 1.4 |
| Light anchors | 100% | 100% | 12 | ₹1,07,804 / ₹1,43,776 / ₹1,44,044 | ₹0 | 0% | 1.4 |
| Monthly slots (the plan) | 99% | 100% | 13 | ₹90,192 / ₹1,46,111 / ₹1,46,888 | ₹0 | 0% | 1.1 |
| Value price ₹400 | 100% | 100% | 13 | ₹91,212 / ₹1,06,373 / ₹1,06,708 | ₹0 | 0% | 1.1 |
| Anchor-led | 75% | 96% | 16 | ₹51,165 / ₹1,30,166 / ₹1,39,855 | ₹0 | 0% | 1.9 |

## Scenario report: Recession

Ad budgets cut: 0.6 new advertisers a month, 9% churn, anchors harder to sign and renew.

Best strategy here: **Light anchors**.

| Strategy | P(₹1L by m18) | by m24 | Median month to ₹1L | Median net m12 / m24 / m36 | 5th-pct lowest cash | P(out of credit) | Hours/wk m24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Light anchors | 21% | 50% | 24 | ₹39,184 / ₹82,864 / ₹92,365 | ₹0 | 0% | 1.4 |
| Lean infra | 11% | 30% | 32 | ₹38,442 / ₹70,037 / ₹75,802 | ₹0 | 0% | 1.3 |
| Premium price ₹600 | 16% | 30% | not reached | ₹38,880 / ₹59,616 / ₹54,613 | ₹0 | 0% | 0.9 |
| Monthly slots (the plan) | 8% | 21% | not reached | ₹35,313 / ₹62,895 / ₹65,325 | ₹0 | 0% | 1.1 |
| Value price ₹400 | 4% | 15% | not reached | ₹33,071 / ₹64,153 / ₹73,137 | ₹0 | 0% | 1.1 |
| Anchor-led | 2% | 12% | not reached | ₹8,234 / ₹49,308 / ₹64,879 | ₹0 | 0% | 1.6 |

## Scenario report: Cost inflation

Kit costs +20%, host fee ₹600, data ₹250, fixed costs ₹7,000 a month.

Best strategy here: **Light anchors**.

| Strategy | P(₹1L by m18) | by m24 | Median month to ₹1L | Median net m12 / m24 / m36 | 5th-pct lowest cash | P(out of credit) | Hours/wk m24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Light anchors | 79% | 99% | 16 | ₹47,431 / ₹1,26,034 / ₹1,27,546 | −₹30,400 | 0% | 1.4 |
| Lean infra | 63% | 94% | 17 | ₹49,001 / ₹1,41,053 / ₹1,41,310 | −₹30,400 | 0% | 1.4 |
| Premium price ₹600 | 55% | 89% | 18 | ₹51,114 / ₹1,42,043 / ₹1,56,131 | −₹30,400 | 0% | 1.1 |
| Monthly slots (the plan) | 57% | 89% | 18 | ₹44,120 / ₹1,28,076 / ₹1,29,440 | −₹30,400 | 0% | 1.1 |
| Anchor-led | 18% | 68% | 22 | ₹17,093 / ₹1,03,116 / ₹1,14,535 | −₹30,400 | 0% | 1.8 |
| Value price ₹400 | 0% | 0% | not reached | ₹35,275 / ₹97,639 / ₹98,577 | −₹30,400 | 0% | 1.1 |

## Scenario report: Tight money

Credit limit ₹50,000 at 3% a month, and only ₹25,000 a month of salary top-up.

Best strategy here: **Light anchors**.

| Strategy | P(₹1L by m18) | by m24 | Median month to ₹1L | Median net m12 / m24 / m36 | 5th-pct lowest cash | P(out of credit) | Hours/wk m24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Light anchors | 80% | 98% | 16 | ₹53,140 / ₹1,33,439 / ₹1,34,923 | ₹0 | 0% | 1.4 |
| Premium price ₹600 | 69% | 94% | 16 | ₹56,860 / ₹1,49,208 / ₹1,62,985 | ₹0 | 0% | 1.1 |
| Lean infra | 65% | 95% | 17 | ₹53,377 / ₹1,46,561 / ₹1,46,761 | ₹0 | 0% | 1.4 |
| Monthly slots (the plan) | 62% | 95% | 18 | ₹49,961 / ₹1,35,629 / ₹1,36,703 | ₹0 | 0% | 1.1 |
| Value price ₹400 | 58% | 93% | 18 | ₹41,037 / ₹1,04,826 / ₹1,06,036 | ₹0 | 0% | 1.1 |
| Anchor-led | 23% | 70% | 21 | ₹24,800 / ₹1,10,397 / ₹1,22,142 | −₹39 | 0% | 1.8 |

## Scenario report: Bad year, then recovery

From month 4 to month 15, half the usual new advertisers and twice the churn; normal after that.

Best strategy here: **Light anchors**.

| Strategy | P(₹1L by m18) | by m24 | Median month to ₹1L | Median net m12 / m24 / m36 | 5th-pct lowest cash | P(out of credit) | Hours/wk m24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Light anchors | 39% | 91% | 19 | ₹43,462 / ₹1,32,604 / ₹1,34,515 | ₹0 | 0% | 1.4 |
| Premium price ₹600 | 23% | 77% | 21 | ₹33,101 / ₹1,13,973 / ₹1,63,388 | ₹0 | 0% | 1.1 |
| Lean infra | 18% | 77% | 21 | ₹33,776 / ₹1,36,440 / ₹1,46,665 | ₹0 | 0% | 1.4 |
| Value price ₹400 | 13% | 81% | 21 | ₹32,282 / ₹1,04,266 / ₹1,06,148 | ₹0 | 0% | 1.1 |
| Anchor-led | 23% | 74% | 21 | ₹23,016 / ₹1,14,376 / ₹1,28,512 | ₹0 | 0% | 1.8 |
| Monthly slots (the plan) | 13% | 75% | 22 | ₹30,233 / ₹1,25,468 / ₹1,36,903 | ₹0 | 0% | 1.1 |

## Scenario report: Price-sensitive market

Advertisers react strongly to price (elasticity 2.5 instead of 1.5): cheap slots sell much faster, dear ones much slower. At the ₹500 list price nothing changes; it decides whether a price move pays.

Best strategy here: **Light anchors**.

| Strategy | P(₹1L by m18) | by m24 | Median month to ₹1L | Median net m12 / m24 / m36 | 5th-pct lowest cash | P(out of credit) | Hours/wk m24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Light anchors | 92% | 100% | 14 | ₹59,453 / ₹1,33,833 / ₹1,34,547 | ₹0 | 0% | 1.4 |
| Value price ₹400 | 93% | 100% | 14 | ₹76,236 / ₹1,05,702 / ₹1,06,484 | ₹0 | 0% | 1.1 |
| Lean infra | 79% | 97% | 16 | ₹58,152 / ₹1,46,577 / ₹1,46,753 | ₹0 | 0% | 1.4 |
| Monthly slots (the plan) | 77% | 96% | 16 | ₹54,817 / ₹1,35,765 / ₹1,37,087 | ₹0 | 0% | 1.1 |
| Premium price ₹600 | 64% | 86% | 17 | ₹56,785 / ₹1,34,941 / ₹1,51,712 | ₹0 | 0% | 1.0 |
| Anchor-led | 32% | 73% | 21 | ₹31,919 / ₹1,10,517 / ₹1,24,494 | ₹0 | 0% | 1.8 |

## Scenario report: Hardware trouble

TVs fail 3% a month, 30% of power cuts need a manual restart, hosts unplug twice as often.

Best strategy here: **Light anchors**.

| Strategy | P(₹1L by m18) | by m24 | Median month to ₹1L | Median net m12 / m24 / m36 | 5th-pct lowest cash | P(out of credit) | Hours/wk m24 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Light anchors | 88% | 100% | 15 | ₹56,618 / ₹1,27,727 / ₹1,28,224 | ₹0 | 0% | 5.4 |
| Lean infra | 77% | 95% | 16 | ₹54,661 / ₹1,39,614 / ₹1,40,927 | ₹0 | 0% | 5.3 |
| Premium price ₹600 | 70% | 94% | 16 | ₹55,649 / ₹1,43,939 / ₹1,57,309 | ₹0 | 0% | 4.9 |
| Monthly slots (the plan) | 71% | 94% | 17 | ₹51,174 / ₹1,26,857 / ₹1,30,195 | ₹0 | 0% | 5.1 |
| Value price ₹400 | 34% | 89% | 20 | ₹46,776 / ₹95,057 / ₹99,318 | ₹0 | 0% | 5.1 |
| Anchor-led | 26% | 65% | 22 | ₹25,826 / ₹1,04,019 / ₹1,16,102 | ₹0 | 0% | 5.7 |

