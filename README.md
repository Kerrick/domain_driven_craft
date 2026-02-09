<!--
SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Domain-Driven Craft

> [!NOTE]
> This project is under active development. The core gameplay, governance,
> IAM, and notifications subdomains are implemented and running in
> production. The economy and territory subdomains, the Node.js companion
> server, and the Clean Architecture layer reorganization described below
> are in progress.

A Minecraft Bedrock behavior pack built with Domain-Driven Design, Clean
Architecture, and distributed system patterns. It runs inside Bedrock's
QuickJS sandbox as the sole source of truth for the game world. A
companion Node.js server observes domain events, maintains a read model
in an external database, and queues inward commands from Discord and the
web. The game works identically whether the Node server is running or
not.

## What it does

The pack turns a vanilla Bedrock Dedicated Server into a community
server with the personality of the 2010s era: personal preferences,
teleportation homes, milestone celebrations, sighting announcements,
player stats, timed polls, operator settings, and an allowlist managed
from within the game.

Six subdomains organize the work:

- **Gameplay.** Coordinates display, lifetime stats, milestones,
  first-sighting announcements, personal preferences, and home
  teleportation.
- **Governance.** Chat commands, timed polls with consensus rules,
  operator-only settings, and player timeouts.
- **IAM.** Gamertag-based identity, invitations, and online presence.
  The pack owns the runtime allowlist.
- **Notifications.** Announcements, whispers, broadcasts, and an
  emerging internal event bus that the action bar, chat, and external
  analytics subscribe to.
- **Economy** _(planned)._ A copper-based Block Market with stochastic
  returns, automated dollar-cost averaging, and boom/bust cycles.
- **Territory** _(planned)._ Land claims earned by building fence
  perimeters, and mineral rights purchased with copper for underground
  ore detection.

## Architecture

### The constraint

Bedrock's Script API runs in a QuickJS sandbox. There is no filesystem,
no incoming network listener, and no access to the host OS. The script
can make outgoing HTTP requests (BDS only), write to `DynamicProperties`
(LevelDB), and log to the content log. Every pattern chosen, every
boundary drawn, follows from this constraint.

### No build step

The code is vanilla JavaScript. Type safety comes from `.d.ts` sidecar
files, the same role `.rbs` files play in Ruby. `tsc --noEmit` checks
types in a pre-commit hook. ESLint enforces import boundaries between
bounded contexts. No transpiler, no bundler, no build artifacts.

### Project layout

The behavior pack and the Node server share a repository. The pack
follows the dependency rule: inner layers know nothing about outer
layers. Node imports shared domain objects directly from `lib/` using
relative paths with `.js` extensions.

    .
    ├── lib/                        # Behavior pack (runs inside QuickJS)
    │   ├── domain/                 # Entities, value objects, domain services
    │   │   ├── block/              # Block aggregate, announcement strategies
    │   │   ├── player/             # Player aggregate, preferences, presence
    │   │   ├── poll/               # Timed votes with consensus rules
    │   │   ├── server/             # Server aggregate, chat, allowlist
    │   │   ├── stat/               # Stats, milestones, deltas
    │   │   └── types/              # Shared value objects (Location, Gamertag)
    │   ├── use_cases/              # Application-specific business rules
    │   │   ├── economy/            # Block Market transactions
    │   │   ├── land_claims/        # Perimeter detection, claim registration
    │   │   └── ...
    │   ├── adapters/               # Platform-coupled implementations
    │   │   ├── commands/           # Chat commands that invoke use cases
    │   │   ├── persistence/        # Wraps DynamicProperties
    │   │   ├── messaging/          # Outbox via HTTP, CDC via console.info
    │   │   └── presenters/         # Formats output for chat, action bar
    │   ├── drivers/
    │   │   └── minecraft/
    │   │       └── main.js         # Composition root, event wiring, DI
    │   └── settings/               # Server-wide configuration
    ├── server/                     # Node.js companion
    │   ├── consumers/              # Processes domain events from the pack
    │   ├── commands/               # Queued inward commands (Discord, web)
    │   └── main.js                 # Entry point
    ├── manifest.json               # Bedrock behavior pack manifest
    └── package.json

Domain objects like `Player`, `Block`, and `Server` contain business
logic and do not import `@minecraft/server`. The composition root in
`drivers/minecraft/main.js` subscribes to platform events, translates
them into domain method calls, and wires persistence through
`DynamicProperties`.

### Bounded contexts

The Community Server domain is organized into six bounded contexts: Gameplay,
Governance, Identity & Access Management, Notifications, Economy, and
Territory. Each has its own model and its own folder. ESLint's
`no-restricted-imports` enforces the boundaries at the code level;
contexts communicate through domain events, not direct imports.

A seventh bounded context, the **Minecraft Platform**, is the
implementation domain. We do not own it. An anti-corruption layer wraps
its API so the domain never speaks in platform terms: a block
permutation becomes a `Block` value object, a raw `{x, y, z}` becomes
a `Location`, a Minecraft `Player` entity becomes our `Player`
aggregate.

Full definitions and ubiquitous language live in
[`docs/contributors/context_map.md`](docs/contributors/context_map.md).

### The distributed bridge

The QuickJS sandbox creates a genuine air gap. The pack cannot expose an
HTTP listener, and Node cannot read `DynamicProperties`. This is a physical
constraint of the runtime, not a design choice. The result is a distributed
system with two distinct data flows.

**Outward (pack → Node).** Domain events leave the pack through two
channels. High-velocity data (block-break counts, chat logs) goes to
the content log via `console.info`, and Node tails the file: Change
Data Capture. High-value events (currency transfers, claim
registrations) go through HTTP using the Transactional Outbox pattern:
the pack writes the event to a `DynamicProperty`, posts it to Node, and
deletes it only after acknowledgment.

**Inward (Node → pack).** Node exposes an HTTP endpoint for external
commands. The pack polls that endpoint on `system.runInterval` and
executes queued commands (the Polling Consumer pattern). Discord slash
commands, web dashboard actions, and admin tooling all enter the game
through this queue.

The pack is always the write model. Node maintains an eventually
consistent read model for queries that do not belong inside a game tick.

## Installation

Copy `lib/`, `manifest.json`, and `pack_icon.png` into the Bedrock
Dedicated Server's `behavior_packs/` directory. The pack depends on
`@minecraft/server` 2.5.0-beta and `@minecraft/server-admin`
1.0.0-beta. The [Kamal](https://kamal-deploy.org/) deployment
configuration (Docker, healthchecks, blue/green deploys) lives in a
separate repository.

## Further reading

- [Context Map](docs/contributors/context_map.md): bounded contexts,
  ubiquitous language, and their relationships
- [Clean DDD](docs/contributors/clean_ddd.md): the no-build Clean
  Architecture, CQRS, and distributed system patterns
- [Feature Ideas](docs/contributors/ideas.md): copper economy, land
  claims, mineral rights, and shops
- [Documentation Style](docs/documentation_style.md): how class and
  method documentation is written

## License

Code is licensed under
[AGPL-3.0-or-later](LICENSES/AGPL-3.0-or-later.txt). Documentation is
licensed under [CC-BY-SA-4.0](LICENSES/CC-BY-SA-4.0.txt). This project
is [REUSE-compliant](https://reuse.software/).
