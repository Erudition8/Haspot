# Haspot Sim

A small browser game that turns the Haspot business plan into a map you can play. You place screens in shops, pick a sales model and infra choices, let time run, and watch cash, profit, risk and your own hours. It also runs a scenario hundreds of times to show the odds of reaching ₹1 lakh a month.

Everything is in one file, `index.html`: vanilla JS, Canvas 2D, no libraries, no build step and no network requests.

## Open it

Double-click `index.html`. It works offline in any current browser.

## Play

1. **New game** asks for starting money, credit limit, salary top-up and interest. You can start from an empty map or from the plan kit (10 pharmacy screens, 5 founding advertisers and spares).
2. Click a pale **pharmacy** (teal) or **kirana** (brown), then choose **Pitch host**. The success chance is 40%, or 50% if you offer the host slot. A shop that says no can't be pitched again for 2 months.
3. When a shop says yes, choose **Install screen**. You pay the kit cost (cash first, then credit) and the screen goes live next month.
4. Advertisers arrive month by month on any network with live screens. The first five are founders at ₹300 with 3 months prepaid.
5. Mark a host as the **hub shop** and buy spares there. A spare TV turns a 10-day outage into 2 days.
6. Institutions (H hospital, S school, C coaching, L lab) take **anchor leases**. Turn these on under Config → Anchor leases.
7. Gate chips in the HUD tell you when a network is ready for more screens ("Pharmacy gate met: 7 of 10 sold").

| Key | Action |
| --- | --- |
| Space | Pause / play |
| 1 | Real time: 1 minute = 1 month |
| 2 | 1 month every 5 s |
| 3 | 1 month every second |
| 4 | Jump to month N |
| N | Next month |
| C | Config |
| Esc | Close a dialog |

Drag the map to pan and scroll to zoom.

**Toolbar:** Scenarios (presets P0–P8), Config (every parameter, with "Reset to plan"), Ledger & charts (CSV export and import), Monte Carlo, Compare, and Save / Load (the full game as JSON). The game also autosaves in this browser.

## Dashboard, milestones and report cards

The game has three tabs:

- **Dashboard** (the home view): a headline, KPI tiles with month-on-month change and 12-month sparklines, a progress ring toward ₹1 lakh a month, revenue vs expenses by month (hover a month for its numbers), where the money goes, cash and credit with runway, both networks' slots and sizes, a dot for every screen's health, your hours against the 4-hour target, milestones, recent events, and a **Next step** suggestion.
- **City map**: pitch shops, install screens, and manage the hub and anchors (as before).
- **Scenario lab**: see below.

There are **14 milestones**, from first host up to ₹1 lakh a month, 42 screens, debt free and 6 months of smooth running. They unlock with a toast and are saved with the game.

A **report card** opens after each single month, and after a run when you pause or jump. It shows a star rating, a cash waterfall (opening cash, top-up, revenue, running costs, screens and other, closing cash), what changed, what happened, any milestones, and a tip for next month. Switch it off with the checkbox in the header.

## Scenario lab: which plan holds up best?

The Scenario lab runs **6 strategies × 5 economies = 30 scenarios**, each as a Monte Carlo batch. It ranks the strategies, writes a report for each economy and recommends a plan, with a month-by-month timeline from a typical run. Use **▶ Play** to start a game with any strategy in any economy.

| Economy | What changes |
| --- | --- |
| Normal | The plan's assumptions |
| Boom | 1.5 new advertisers a month, 3% churn, anchors easier |
| Recession | 0.6 new advertisers a month, 9% churn, anchors harder to sign and renew |
| Cost inflation | Kit +20%, host fee ₹600, data ₹250, fixed ₹7,000 |
| Tight money | ₹50,000 credit at 3% a month, ₹25,000 top-up |

| Strategy | What it does |
| --- | --- |
| Monthly slots (the plan) | All 10 slots sold month to month at ₹500 |
| Anchor-led | 5 slots per network leased to institutions at ₹450 |
| Light anchors | 2 anchor slots per network (1 per client), 8 monthly |
| Premium price ₹600 | Higher list price, fewer sign-ups |
| Value price ₹400 | Lower list price, more sign-ups |
| Lean infra | Shop Wi-Fi and a self-hosted signage server from month 13 |

To write the full report from the command line:

```
node tools/scenario-report.mjs 300 36   # runs per scenario, months
```

This writes `reports/scenario-report.md` and `reports/scenario-results.json`. The committed report (300 runs each) recommends **Light anchors**. It has an 89% average chance of ₹1 lakh a month by month 24 across the five economies, and 50% in a recession against 21% for the plan's all-monthly model. It reaches ₹1 lakh about 2 months sooner in a normal economy. Premium ₹600 earns the most once both networks are full, so the plan suggests testing it later. These results rest on assumptions about anchor pitch success and renewal rates, so confirm those on the first trip.

## Run the tests

```
node test/engine.test.mjs
```

This needs Node 18 or later and no packages. The test reads `index.html`, extracts `<script id="engine">` and runs it with `node:vm`. It checks every fixture in section 9 of the plan:

- **9.1, plan mode:** per-screen margin ₹2,597; kit ₹13,650; 42 / 58 / 94 screens for ₹1 lakh; payback 5.3 / 7.3 / 11.9 months; months 1, 7, 9, 17 and 18 exactly; first ₹1 lakh in month 18, in month 15 with 2 advertisers a month, and in month 34 with no top-ups.
- **9.2, sales models through the real monthly tick:** ₹1,02,466 · ₹1,172 · ₹95,672 · ₹34,896.
- **9.3, properties:** same seed gives the same ledger; with zero events, stochastic mode equals plan mode; insolvency guard; zero revenue with zero screens; exclusivity; Monte Carlo of P1 gives P = 1.0.
- **Extras:** 500 × 36-month Monte Carlo in under 3 s (about 0.6 s here), CSV round-trip, JSON save/load continuity, the classic rules, Pi cost and the calendar.

## Scenarios

The presets are embedded in `index.html`. Copies are in `scenarios/*.json` as `{ id, name, seed, overrides }`, merged over the defaults.

Monte Carlo results from this build (500 runs, 36 months, seed 1):

| ID | Name | P(₹1L by m18) | P(by m24) | Median month | Hours/week at m24 |
| --- | --- | --- | --- | --- | --- |
| P1 | Plan, deterministic | 100% | 100% | 18 | 0.9 |
| P2 | Base | 75% | 96% | 16 | 1.1 |
| P3 | Anchor-led | 34% | 75% | 20.5 | 1.8 |
| P4 | Bad year | 3% | 6% | not reached | 1.0 |
| P5 | Infra stress | 70% | 96% | 16 | 5.6 |
| P6 | Lean infra | 78% | 97% | 15 | 1.4 |
| P7 | Fast sales | 100% | 100% | 11 | 1.1 |
| P8 | No top-ups | 1% | 43% | 25 | 1.1 |

The demand and event figures are assumptions (they are labelled that way in Config), so read these results as relative rather than as forecasts.

## Modelling choices the plan left open

- **Ledger `cash` is net cash.** A negative value means credit in use, and `credit_used = max(0, −cash)`. Interest is charged on last month's credit used. The game ends when cash falls below −credit limit.
- **Plan mode** is the same engine with every event and random draw switched off, 1 arrival a month, a cap of 8 slots sold, flat ₹1,262 opex, unlimited credit and no interest (section 9.1).
- **Founders' prepaid cash** comes in at signing with no gateway fee, which matches the plan's start cash of −₹1,17,800.
- **Repairs** are paid from the hardware reserve fund first. Anything beyond the fund appears in the `reserve` column. A spare used at the hub is restocked the same month.
- **Anchors** are billed for the screens live at billing time (quarterly or annually in advance, less TDS). Revenue is recognised monthly, with make-goods. TDS comes back in months 15, 27 and so on. Seasonal weighting changes how many slots an anchor plays, not what it pays.
- **Host pay follows uptime** (the default), which halves the chance of unplugging. A shop's reliability scales it further.
- **Power cuts** only cause dark days when the restart fails. Pi players never fail to restart, and shops with an inverter are not affected.
- **Shop Wi-Fi** saves the data cost, adds ₹100 to the host fee and triples "hotspot" failures, which cause monitoring gaps but no dark days. The kit cost is unchanged.
- **Auto-expand** follows the 9.1 rule using the growth parameters, picks hosts by footfall (preferred zone first), and counts 30 founder minutes per new host. In auto mode, hosts always accept.
- **P4 Bad year:** the shock (arrivals × 0.5, churn × 2) starts at month 4 and never ends, which is how the plan words it. Set `demand.shockFromMonth` to 0 to switch it off.
- **Lowest cash** in Monte Carlo includes the starting position.

## Calibrating after the pilot (plan section 15)

Replace the assumptions with real numbers from the first 2–10 screens:

- `events.unplugMonthly` and `restartFailProb`: uptime sheet
- `events.tvFailMonthly` and `hotspotFailMonthly`: repair log
- `demand.arrivalsPerNetwork` and `elasticity`: pitches made versus signed at each price
- `demand.churnMonthly`: renewals at months 3 and 6
- `anchors.pitchSuccess` and `renewProb`: institution meetings
- `hostPitch.success`: host pitches versus signed

Then re-run P2, P3 and P4 in Monte Carlo. Buy the next 10 screens only if P2 gives P(₹1 lakh by month 24) ≥ 0.6 and the 5th-percentile lowest cash stays inside your credit limit.

## QA checklist (plan section 12)

- [x] All fixtures in section 9 pass from a clean checkout (`node test/engine.test.mjs`: 34 passing)
- [ ] Works offline in current Chrome, Firefox and Safari. Tested in headless Chromium only; the code is plain ES5 with standard DOM APIs.
- [x] No network requests at all (checked with Playwright's request log)
- [x] Real-time speed advances one month per 60 s. A month ticks when accumulated frame time reaches 60,000 ms; time does not count while the tab is hidden.
- [x] Every number in the HUD matches the ledger row for that month. Money and credit also reflect purchases made since the last tick.
- [x] Exported CSV re-imports to the same ledger. Import shows the CSV and says whether it matches the current game. Use Save / Load (JSON) to restore a full game.
- [x] Changing a parameter mid-game takes effect next tick and is written to the event log
- [x] Insolvency shows the month, the cause and the ledger
- [x] Every assumption in 6.3 and 6.6 is labelled "assumption" in the Config modal
