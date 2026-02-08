// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'

/**
 * First impressions matter. When a player connects, the server greets them with
 * a personalized welcome message showing server status and play-time
 * milestones.
 */
export declare class Welcome {
  /** Sends a welcome message to the joining player. */
  greet(player: Player): void
}
