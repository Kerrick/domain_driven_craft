// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'

/**
 * Night passes once enough players are asleep at once. Players drift away from
 * their keyboards, and the game already ignores anyone outside the dimension
 * where beds work. Counting the drifted ones stalls the night indefinitely.
 * This object counts the players who have to sleep and publishes that count as
 * the percentage the game rule expects.
 */
export declare class SleepRule {
  constructor(server: import('./server').Server)

  /** Players who have to sleep: the ones in the overworld who are not AFK. */
  members(): Set<Player>
  /** How many players have to sleep before the night can pass. */
  readonly size: number
  /** Publishes the count as the percentage the game rule expects. */
  enforce(): void
}
