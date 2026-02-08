// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Activity } from './activity'

/**
 * Players who stop interacting are considered AFK. This object tracks a
 * player's activity over time and determines whether they've gone idle.
 */
export declare class Presence {
  constructor(playerName: string)
  /** Advances the activity clock by one tick. */
  tick(activity: Activity): void
  /** Whether this player has been idle beyond the AFK threshold. */
  readonly isAfk: boolean
}
