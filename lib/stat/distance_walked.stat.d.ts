// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player/player'
import type { Stat } from './stat'

/** Tracks how far this player has walked (in blocks). */
export declare class DistanceWalkedStat extends Stat {
  constructor(player: Player)
}
