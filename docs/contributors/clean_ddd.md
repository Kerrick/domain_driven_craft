<!--
SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Clean DDD & Distributed Architecture

This document outlines the architectural strategy for the Community Server.
It bridges the gap between standard _Domain-Driven Design_ (Evans/Vernon)
and the unique constraints of the Minecraft Bedrock sandbox.

## 1. The Architectural Thesis

We treat the Minecraft Bedrock Dedicated Server (BDS) not just as a game
engine, but as a **High-Frequency State Machine** that acts as the
primary source of truth for the _Physical World_ Bounded Context.

External systems (Node.js, Ruby on Rails, Discord bots) are treated as
**Remote Projections** or **Supporting Contexts**. They do not "run"
the game; they observe it, index it, and occasionally request changes
via command queues.

### The "Walled Garden" Constraint

The Bedrock Script API runs in a QuickJS sandbox with no access to the
host filesystem or OS.

- **Input:** Restricted to In-Game Events and HTTP Responses.
- **Output:** Restricted to In-Game Actions, HTTP Requests, and
  Content Logs.
- **Persistence:** Restricted to `DynamicProperties` (LevelDB).

---

## 2. Tactical Pattern: "No-Build" Clean Architecture

Inside the Behavior Pack (`lib/`), we adhere to a strict
dependency rule to maintain testability and separation of concerns,
implemented without a transpilation step (Webpack/TS).

### Layer Definition

    .
    ├── domain/             # PURE JS. Entities, Value Objects, Domain Services.
    │                       # RULE: No dependencies on @minecraft/server.
    │                       # RULE: Pure business logic only.
    │
    ├── use_cases/          # PURE JS. Application specific business rules.
    │                       # RULE: Orchestrates Entities.
    │                       # RULE: Defines Interfaces for Repositories.
    │
    ├── adapters/           # DIRTY JS. Implementation of Interfaces.
    │   ├── persistence/    # Wraps world.setDynamicProperty
    │   ├── messaging/      # Wraps console.info (CDC) or http.request
    │   └── presenters/     # Formats data for Chat/Actionbar/ScreenDisplay
    │
    └── drivers/            # INFRASTRUCTURE.
        └── minecraft/      # The Composition Root (Main.js).
                            # Wires Adapters into Use Cases via DI.

### The "Sidecar" Typing Strategy

Since we cannot use TypeScript syntax directly in the JS runtime, we use
**Declaration Files** (`.d.ts`) to provide type safety and autocomplete
during development, and to aid static analysis.

---

## 3. Strategic Pattern: Distributed Systems

Because the game engine is air-gapped from the web, we employ
**Distributed System Patterns** to maintain consistency between the
Game World and the Community Platform.

### CQRS (Command Query Responsibility Segregation)

We split the system into two distinct models:

1.  **The Write Model (Minecraft):**
    - Optimized for: **Consistency & Latency**.
    - Location: `DynamicProperties` inside LevelDB.
    - Role: The absolute source of truth for "Where is the player?",
      "How much currency do they have?", "Is this land claimed?".
2.  **The Read Model (External Platform):**
    - Optimized for: **Querying & aggregation**.
    - Location: External SQL Database (Postgres/SQLite).
    - Role: Powers the Web Dashboard, Leaderboards, and Discord
      integrations. It is _Eventually Consistent_.

### Event Sourcing & Change Data Capture (CDC)

We use two channels to propagate state from the Write Model to the Read
Model.

#### A. The "High-Velocity" Channel (Log Tailing)

Used for analytics, chat logs, and non-critical stats (e.g., "Blocks Broken").

- **Mechanism:** The Behavior Pack writes structured JSON to the
  Content Log via `console.info`.
- **Consumer:** The External Platform "tails" the log file, parses
  the JSON, and updates the Read Model.
- **Pros:** Zero network latency impact on the game tick.

#### B. The "High-Value" Channel (Transactional Outbox)

Used for critical domain events (e.g., "Land Claimed," "Currency Transferred").

- **Mechanism:**
  1.  Interactor saves state to `DynamicProperty`.
  2.  Interactor saves an Event to an "Outbox" `DynamicProperty`.
  3.  A background job (`system.runInterval`) attempts to `POST` the
      event to the External Platform via `@minecraft/server-net`.
  4.  On `200 OK`, the event is removed from the Outbox.
- **Pros:** Guaranteed delivery. Idempotency.

---

## 4. Governance & Boundaries

We enforce Bounded Contexts using filesystem conventions and static
analysis (Linting), rather than microservices.

### Context Mapping

| Context            | Relationship          | Implementation                               |
| :----------------- | :-------------------- | :------------------------------------------- |
| **Physical World** | **Upstream / Core**   | Vanilla JS Entities (`Location`, `Block`).   |
| **Economy**        | **Downstream / Core** | Separate Folder. Listens to Physical events. |
| **Identity**       | **Generic Subdomain** | Shared Kernel. Maps Gamertag ↔ UUID.         |

### The "No-Leak" Rule

To prevent the "Big Ball of Mud," we utilize `eslint-plugin-import` to
strictly forbid cross-context coupling at the code level.

    // .eslintrc.json constraint example
    "no-restricted-imports": [
      {
        "patterns": ["**/domain/economy/**"],
        "message": "Physical World cannot import Economy directly. Use Events."
      }
    ]

---

## 5. Summary of Patterns

| Pattern                  | Application in this Project                                           |
| :----------------------- | :-------------------------------------------------------------------- |
| **Repository**           | Abstraction over `DynamicProperties` to keep Domain pure.             |
| **Dependency Injection** | Manual wiring in `drivers/minecraft/main.js` to decouple layers.      |
| **Outbox Pattern**       | Storing outgoing events in the World DB until HTTP confirmation.      |
| **Polling Consumer**     | The mechanism for "Inward" commands (Discord -> Minecraft).           |
| **Idempotent Receiver**  | Ensuring Node/Rails handles duplicate events (due to net lag) safely. |
