<!--
SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Lint

## Bonus: `recalculateDifficulty` ownership

`Server.instance.recalculateDifficulty()` was moved
out of `PeacefulPreference.toggle()` and into `PeacefulCommand.execute()`.
This broke the `player/preference → server` cycle. But note that
`Server.playerJoined()` and `Server.playerLeft()` also call
`recalculateDifficulty()` — the command is not the only trigger.

If a new trigger is added later (e.g., a settings change), the recalculation
call must be added manually. The right long-term fix is **domain events**
(DDD): `PeacefulPreference` publishes a `PreferenceChanged` event, and
`Server` subscribes to it. This eliminates the need for each call site to
remember to trigger recalculation. Not implemented yet — flagged for future
work.
