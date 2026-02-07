<!--
SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Lint: Known Suppressed Cycles

ESLint enforces `import/no-cycle` as an error. All cycles have been
eliminated except two that require design decisions before they can be
resolved. Each is suppressed with an inline `eslint-disable-next-line`
and cross-referenced here.

---

## 1. `registry.js` ↔ `help.command.js`

**Files:** `scripts/command/registry.js`, `scripts/command/help.command.js`

**The tension:** The command registry (`ALL_COMMANDS` array) must include
`HelpCommand` so it participates in the standard `Cmd.from(message)`
dispatch loop. But `HelpCommand` must read the registry to list all
commands in its `execute()` method.

**Why it exists:** Every command follows a uniform factory pattern —
`Commands.for(message)` iterates `ALL_COMMANDS` and calls `Cmd.from()` on
each. `HelpCommand` is a command like any other, so it belongs in the
array. But it also needs to enumerate that same array to display help text.

**Design options to consider:**

1. **Inject the list.** `HelpCommand` receives the command list as a
   constructor argument. But this breaks the uniform `Cmd.from(message)`
   static factory — `HelpCommand` would need special construction, making
   `Commands.for()` aware of it as a special case.

2. **Commands *is* the help.** `Commands.for("!help")` returns a help
   object that `Commands` itself creates, passing its own list. `HelpCommand`
   is not in the registry at all — `Commands` handles `!help` directly.
   Clean dispatch but mixes routing with presentation.

3. **Self-registration.** Each command registers itself on import. The
   registry becomes a `Set` that commands push into. No file imports
   commands — they import the registry and add themselves. Eliminates the
   cycle but inverts control and makes command ordering implicit.

---

## 2. `server.js` ↔ `welcome.js`

**Files:** `scripts/server/server.js`, `scripts/server/welcome.js`

**The tension:** `Server` owns a `Welcome` collaborator (line 9:
`#welcome = new Welcome()`). When a player joins, `Server.playerJoined()`
calls `this.#welcome.greet(player)`. But `Welcome.greet()` reaches back
into `Server.instance` to read server name and player count, and into
`Chat.instance` for messaging and active polls.

**Why it exists:** Greeting is complex enough that extracting it into its
own class keeps `Server` focused. But the greeting *content* depends on
live server state (name, active polls, settings), so `Welcome` naturally
reaches back into the aggregate root.

**Design options to consider:**

1. **Inline it.** `Server.#greet(player)` is a private method on `Server`.
   The greeting logic isn't complex enough to justify a separate class, and
   `Server` already has access to everything the greeting needs. Eliminates
   `welcome.js` entirely.

2. **Pass context.** `Welcome.greet(player, { serverName, polls, settings })`
   receives everything it needs as arguments. `Welcome` becomes a pure
   formatter with no singleton access. Clean but requires `Server` to
   pre-fetch all the data `Welcome` might want.

3. **Greeting as a value object.** `Server` builds a `Greeting` (with
   server name, settings snapshot, active polls) and tells `Chat` to
   deliver it. Separates data assembly from formatting.

---

## Bonus: `recalculateDifficulty` ownership

During this lint pass, `Server.instance.recalculateDifficulty()` was moved
out of `PeacefulPreference.toggle()` and into `PeacefulCommand.execute()`.
This broke the `player/preference → server` cycle. But note that
`Server.playerJoined()` and `Server.playerLeft()` also call
`recalculateDifficulty()` — the command is not the only trigger.

If a new trigger is added later (e.g., a settings change), the recalculation
call must be added manually. Consider whether `Server` should observe
preference changes via a callback or event, rather than relying on each
call site to remember.
