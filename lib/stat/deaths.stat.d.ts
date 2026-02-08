// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player/player'
import type { Stat } from './stat'

/** Tracks how many times this player has died. */
export declare class DeathsStat extends Stat {
  constructor(player: Player)
}
