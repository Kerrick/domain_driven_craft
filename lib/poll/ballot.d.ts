// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'

/**
 * A poll needs to track which players have voted and prevent double-voting. The
 * ballot encapsulates that set, keeping vote logic out of {@link Poll}.
 */
export declare class Ballot {
  /** Records a player's vote. Returns false if they already voted. */
  cast(player: Player): boolean
  /** Whether the named player has voted. */
  has(name: string): boolean
  /** Removes a player's vote (e.g. when they leave the server). */
  remove(name: string): void
  /** Number of votes cast. */
  readonly count: number
}
