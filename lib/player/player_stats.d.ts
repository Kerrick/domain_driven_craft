// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Stat } from '../stat/stat'

/**
 * Each player accumulates gameplay statistics across sessions. This collection
 * owns the player's stats and provides uniform access for display commands.
 */
export declare class PlayerStats {
  constructor(player: import('./player').Player)

  /** How many blocks this player has broken. */
  readonly blocksBroken: Stat
  /** How many blocks this player has placed. */
  readonly blocksPlaced: Stat
  /** How many times this player has died. */
  readonly deaths: Stat
  /** How many mobs this player has killed. */
  readonly mobKills: Stat
  /** Total active play time this player has spent on the server. */
  readonly playTime: Stat
  /** Total distance this player has walked. */
  readonly distanceWalked: Stat

  /** All stats for iteration (used by the stats command). */
  all(): Stat[]
}
