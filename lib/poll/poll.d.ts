// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'

/**
 * Some server changes — like increasing tick speed — need unanimous consent. A
 * poll collects votes from all eligible players and resolves automatically when
 * everyone has voted. Subclasses define what happens on resolution or
 * expiration.
 */
export declare class Poll {
  /** Whether the voting deadline has passed. */
  readonly isExpired: boolean
  /** Whether the poll is close enough to expiry to warn players. */
  readonly shouldWarn: boolean
  /** Seconds until the deadline. */
  readonly remainingSeconds: number
  /** Number of votes cast so far. */
  readonly voteCount: number
  /** Short label identifying this poll type in chat. */
  readonly tag: string

  /** Records that the expiration warning has been shown. */
  markWarned(): void
  /** Records a player's vote, checking for duplicates and expiration. */
  vote(player: Player): void
  /** Removes a departing player's vote and rechecks resolution. */
  playerLeft(name: string): void
  /** Whether the named player has already voted. */
  hasVote(name: string): boolean

  // Template methods
  /** Rechecks whether the poll passes after external conditions change. */
  conditionChanged(): void
  /** Announces that the poll expired without passing. */
  announceExpiration(): void
  /** Announces that a player voted. */
  announceVote(voter: Player): void
  /** Applies the poll's effect when it passes. */
  resolve(): void
  /** Announces that a player left mid-vote. */
  announcePlayerLeft(name: string): void
}
