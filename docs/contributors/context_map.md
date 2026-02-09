<!--
SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Context Map

## Business Domains

### Community Server

The primary business domain. This is the experience of running and playing on
a small, shared Minecraft server with friends. It's the _social contract_
of a community server: who's online, what someone found, whether the
server should be peaceful tonight, the friendly competition of milestones,
the comfort of having a home to teleport to.

**Domain experts:** The modern Minecraft player who remembers (or has
heard stories about) the 2010s era of community servers, where the
rules were informal, the ops were your friends, and the server had
personality.

**Ubiquitous language:**

| Term         | Meaning                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| Player       | Someone who plays on the server, with preferences and a history           |
| Preference   | A personal setting that persists across sessions (peaceful, coords, home) |
| Home         | A saved location a player can teleport back to                            |
| Peaceful     | A player's wish to play without hostile mobs                              |
| Coords       | A player's wish to see their position at all times                        |
| Stats        | Lifetime play history: blocks broken, distance walked, time played        |
| Milestone    | A notable achievement worth celebrating publicly                          |
| Sighting     | The first time a player discovers a rare or notable block                 |
| Announcement | A public celebration when something notable happens                       |
| Command      | A chat message starting with `!` that asks the server to do something     |
| Whisper      | A private message only you can see                                        |
| Broadcast    | A message everyone on the server sees                                     |
| Notification | A brief, visible message that fades after a moment                        |
| Op           | A trusted player who can change server-wide settings                      |
| Poll         | A timed vote that requires player consensus                               |
| Setting      | A server-wide configuration that ops can change                           |

**Bounded contexts:**

| Context       | Scope                                                                                                                                    | Status   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Gameplay      | Coords, Stats, Milestones, Sightings, Preferences, Home                                                                                  | Active   |
| Governance    | Polls, Settings, Ops, Commands                                                                                                           | Active   |
| IAM           | Gamertag, Invitation, Online                                                                                                             | Active   |
| Notifications | Announcements, Whispers, Broadcasts, Notifications, and the emerging event bus that ActionBar, Chat, and external analytics subscribe to | Emerging |
| Economy       | Block Market: simulated investments with stochastic returns                                                                              | Future   |
| Territory     | Land Claims, Surface Rights, Mineral Rights                                                                                              | Future   |

Each bounded context has its own folder, its own model, and its own
import boundary enforced by ESLint. Contexts communicate through domain
events, not direct imports.

---

### Minecraft Platform

The implementation domain. This is the game engine, its scripting API,
and the rules it imposes on what behavior packs can and cannot do.
We don't own this domain; we adapt to it.

This entire domain is a single bounded context. The anti-corruption
layer at its boundary translates platform concepts into our own
language.

**Domain experts:** Mojang and Microsoft engineers, the developers who
maintain the `@minecraft/server` scripting API, and the broader Bedrock
addon development community.

**Ubiquitous language:**

| Term                | Meaning                                                                           |
| ------------------- | --------------------------------------------------------------------------------- |
| World               | The game world: global state, events, and all entities within it                  |
| Entity              | Anything that exists in the world (players, mobs, items)                          |
| Dimension           | A parallel realm: Overworld, Nether, or End                                       |
| Block               | A single cube in the world grid                                                   |
| Block Permutation   | A block's type combined with its state (e.g., oak log, axis=y)                    |
| Tick                | One cycle of the game loop (~50ms)                                                |
| Dynamic Property    | A key-value store attached to the world, used for persistence                     |
| Heads-Up Display    | Everything the player sees overlaid on the game: health, hunger, XP, hotbar, chat |
| Action Bar          | The single text line above the hotbar (one HUD element among many)                |
| Screen Display      | The API surface for controlling a player's HUD                                    |
| Gamerule            | A global boolean or integer that changes game behavior (e.g., showcoordinates)    |
| Before/After Events | Hooks that fire before or after something happens in the world                    |
| Spawn               | A player entering the world (initial spawn vs. respawn)                           |

---

### Server Operations

The infrastructure domain. This is about keeping the Bedrock Dedicated
Server running, deployed, backed up, and configured, not about what
happens inside the game. This domain lives in a
[separate repository](https://kamal-deploy.org/).

**Domain experts:** The server operator (who is also a player), Docker
and container practitioners, and the maintainers of the `itzg/minecraft-bedrock-server`
container image.

**Ubiquitous language:**

| Term              | Meaning                                                            |
| ----------------- | ------------------------------------------------------------------ |
| BDS               | Bedrock Dedicated Server: the official server binary from Mojang   |
| Container         | The Docker image that wraps BDS with automation                    |
| server.properties | The configuration file BDS reads on startup                        |
| Allowlist         | The set of players permitted to join                               |
| Behavior Pack     | A bundle of scripts and data that extends the game                 |
| Deploy            | Pushing a new version of the server or behavior pack to production |
| Seed              | The number that determines world generation                        |
| Backup            | A snapshot of the world data                                       |

---

## Relationships

```
┌────────────────────┐                    ┌────────────────────┐
│                    │   Anti-Corruption   │                    │
│  Community Server  │ ◄────────────────► │ Minecraft Platform │
│    (core domain)   │       Layer         │  (implementation)  │
│                    │   Domain Events     │                    │
└────────┬───────────┘                    └────────────────────┘
         │
         │  Published Language
         │  (config files, env vars)
         │
┌────────▼───────────┐
│                    │
│ Server Operations  │
│  (infrastructure)  │
│                    │
└────────────────────┘
```

### Anti-Corruption Layer + Domain Events

**Community Server ↔ Minecraft Platform.** We wrap the platform API
to speak our own language. A Minecraft `Player` entity becomes our
`Player` aggregate. A raw `{x, y, z}` becomes a `Location` value
object. Block permutations become domain `Block` objects with
announcement strategies. The two domains communicate through
**domain events**: the community server domain publishes facts about
what happened ("coords were toggled," "a milestone was reached"), and
the platform domain subscribes to translate those into API calls
(action bar text, chat messages, difficulty changes).

### Published Language

**Community Server → Server Operations.** The community server domain
expresses its needs through config files (`players.yml`,
`server.properties` overrides) and environment variables (`DIFFICULTY`,
`ALLOW_LIST_USERS`). Server operations consumes these on deploy and
startup.

---

## Shared Kernels

Some concepts genuinely mean the same thing across two domains. These
are shared kernels: models that both domains co-own and agree on, with
the same properties and behavior on both sides.

### Community Server × Server Operations

| Term       | Shared meaning                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Invitation | What gets somebody added to the server: the social act and the allowlist entry are the same thing |
| Server     | The server itself: its name, its existence, the thing people connect to                           |
| Online     | Whether a player is connected (both domains agree on what it means for a player to be "online")   |

### Community Server × Minecraft Platform

| Term     | Shared meaning                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| Block    | A cube in the world with a type and a location, whether you're celebrating finding it or storing its permutation state |
| Tick     | One cycle of the game loop, whether you're the engine processing it or a player voting to speed it up                  |
| Location | A position in the world (X, Y, Z): same coordinates, same meaning, everywhere                                          |

---

## "World" Is Not a Shared Kernel

"World" appears in all three domains, but it means something
fundamentally different in each:

- **Community Server:** The _place_. "Our world," the shared map, the
  experience you get to have by connecting.
- **Server Operations:** The _data_. A directory of files to back up,
  restore, and protect.
- **Minecraft Platform:** The _state_. The global object that holds all
  entities, events, dimensions, and the dynamic properties database.

If you tried to model a single `World` that satisfied all three, you
would get an incoherent god object. This is exactly the kind of naming
collision that bounded contexts are designed to protect against. Each
domain should have its own model of the world, speaking its own
language, without pollution from the others.
