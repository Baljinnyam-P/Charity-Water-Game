# Well Builder

A lightweight educational browser game inspired by the real-world mission of bringing clean water to communities in need. You tap to earn WaterCoins (WC), trigger milestone events, play timed mini‑games, and ultimately "build" wells while learning impact facts.

> This project is an independent, educational prototype and is **not** an official charity: water product.

## Table of Contents
- [Features](#features)
- [Quick Start](#quick-start)
- [Gameplay Loop](#gameplay-loop)
- [Mini-Games](#mini-games)
- [State & Persistence](#state--persistence)
- [Architecture Overview](#architecture-overview)
- [Key Design Decisions](#key-design-decisions)
- [Accessibility](#accessibility)
- [Performance Notes](#performance-notes)
- [Planned Improvements / Roadmap](#planned-improvements--roadmap)
- [Attribution & Media](#attribution--media)
- [License / Disclaimer](#license--disclaimer)

## Features
- Core clicker mechanic (earn WC per tap).
- Progressive milestones (25%, 50%, 75%, 100%) with animated highlight + modal.
- Well completion celebration + confetti.
- Impact sidebar: radial progress ring, wells built, remaining WC, dynamic "Next milestone" line.
- Rotating educational facts ("Did You Know?").
- Mini-games:
  - Water Quest: Whack-a-mole style speed challenge.
  - Water Drop: Catch falling drops, avoid obstacles (smooth rAF animation).
  - Micro Quiz: (Placeholder / extendable) for knowledge reinforcement.
- Collectible can row for small bonuses.
- LocalStorage persistence (WC total, wells built, milestone index).
- Responsive layout and mobile-friendly tap targets.
- Animated water button pulse & ripple feedback.

## Quick Start
Just open `index.html` in any modern desktop or mobile browser (Chrome, Edge, Firefox, Safari).

No build step, frameworks, or dependencies required.

## Gameplay Loop
1. Tap the large water button to accumulate WaterCoins.
2. Reach milestone thresholds for motivational feedback & facts.
3. Play mini-games for bursts of bonus WC.
4. Hit 100% → "Build" a well → progress resets to the next well, wells built count increments.
5. Rinse and repeat; persistence lets you return later.

## Mini-Games
### Water Quest
- Grid-based tap reaction game.
- Goal: 20 hits within the time limit; bonus WC for accuracy.

### Water Drop
- Falling objects game using `requestAnimationFrame` instead of CSS-only transitions for smooth motion and reliable collision/timing.
- Includes obstacle (muddy) drops that penalize streaks.

### Micro Quiz
- Framework in place for injecting randomized question sets (extend by adding data + scoring logic).

## State & Persistence
State variables: `waterCoins`, `wellsBuilt`, `milestoneIndex`.
- Saved to `localStorage` under key `wellBuilderState.v1`.
- Automatically persisted on every `updateProgress()` call, well reset, and milestone increment.
- Reset button clears both UI and stored state.

## Architecture Overview
| Layer | Purpose |
|-------|---------|
| `index.html` | Structural layout, panels, game screens, modal container. |
| `style.css` | Branding, responsive layout, animations (pulse, milestone pop, radial). |
| `script.js` | Game logic (progress, mini-games, modal handling, persistence). |
| `images/` | Visual assets (drops, cans, icons, background). |

Core functions:
- `updateProgress()` – Single source of truth for UI + milestone + persistence updates.
- `addWC(amount)` – Increments WC then triggers UI refresh.
- `showMilestone(idx)` / `showWellBuilt()` – Event modals.
- `startWaterQuest()`, `startWaterDrop()` – Mini-game bootstrap flows.
- `saveState()` / `loadState()` / `clearState()` – Persistence helpers.

## Key Design Decisions
- **Vanilla JS**: Keeps learning accessible; zero external dependencies.
- **Single Update Function**: Centralizes rendering & state sync to avoid divergent UI state.
- **rAF Animation**: Replaced brittle transition-based falling logic to eliminate jump glitches.
- **Semantic + ARIA**: Panels labeled, dynamic impact stats announced, logical heading structure.
- **Scalable Milestones**: Array-driven so new percentages or reward tiers can be added.

## Accessibility
- Descriptive alt text for imagery (icons, logos, game assets).
- `aria-live` region for impact stats changes.
- High contrast brand palette with focus/hover states.
- Keyboard interaction for collectible cans (Enter/Space).
- Large tap targets on mobile (primary button & mini-game cells).

## Performance Notes
- Minimal DOM churn: progress & stats updates batched inside `updateProgress()`.
- `requestAnimationFrame` for per-frame animations (avoids layout thrash & timing drift).
- Lightweight SVG radial progress avoids canvas overhead.

## Planned Improvements / Roadmap
| Priority | Idea | Rationale |
|----------|------|-----------|
| High | Refactor repeating modal result code | Reduce duplication & ease adding new mini-games. |
| High | Formal quiz module with question bank & scoring | Deepen educational value. |
| Medium | Sound & subtle haptics (opt-in) | Enhance feedback loop. |
| Medium | Difficulty scaling (dynamic WC rewards) | Extend retention. |
| Medium | Session analytics hooks (anonymous) | Inform balancing decisions. |
| Low | Theming / dark mode | Accessibility & personalization. |
| Low | Achievements / badges | Long-term engagement. |

## Attribution & Media
All imagery used is placeholder / educational. Replace with properly licensed assets before any public or commercial release.

## License / Disclaimer
This project is provided for educational and portfolio demonstration purposes. Not affiliated with or endorsed by charity: water. If extending or distributing, ensure compliance with trademarks and asset licensing.

---
**Questions or ideas?** Open an issue or start a discussion. Enjoy building wells! 💧
