// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export declare class Poll {
  readonly isExpired: boolean;
  readonly shouldWarn: boolean;
  readonly remainingSeconds: number;
  readonly voteCount: number;
  readonly tag: string;
  
  markWarned(): void;
  vote(player: Player): void;
  playerLeft(name: string): void;
  hasVote(name: string): boolean;
  
  // Template methods
  conditionChanged(): void;
  announceExpiration(): void;
  announceVote(voter: Player): void;
  resolve(): void;
  announcePlayerLeft(name: string): void;
}
