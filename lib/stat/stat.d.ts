// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player/player'

/**
 * A named, cumulative counter that tracks a gameplay activity for a single
 * player. Stats are persisted across sessions and formatted for display.
 */
export declare class Stat {
  constructor(
    player: Player,
    name: string,
    statKey: string,
    verb: string,
    noun: string,
  )

  /** Human-readable stat name (e.g. "Blocks Broken"). */
  readonly name: string
  /** Persistence key used in dynamic properties. */
  readonly statKey: string
  /** The player this stat belongs to. */
  readonly playerName: string
  /** Past-tense verb for milestone celebrations (e.g. "broke"). */
  readonly verb: string
  /** Noun for milestone celebrations (e.g. "blocks"). */
  readonly noun: string
  /** The current cumulative value. */
  readonly count: number
  /** Human-readable formatted count for display. */
  readonly formatted: string

  /** Increases the counter and returns the new total. */
  increment(amount?: number): number
}
