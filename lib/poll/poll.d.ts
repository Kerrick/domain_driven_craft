// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export declare class Poll {
  constructor(effectDurationSeconds: number);
  
  readonly isExpired: boolean;
  readonly shouldWarn: boolean;
  readonly remainingSeconds: number;
  readonly effectDuration: number;
  readonly voteCount: number;
  readonly tag: string;
  
  markWarned(): void;
  vote(player: Player): void;
  playerLeft(name: string): void;
  conditionChanged(): void;
  announceExpiration(): void;
  hasVote(name: string): boolean;
  
  // Template methods for subclasses
  protected announceVote(voter: Player): void;
  protected resolve(): void;
  protected effectExpired(): void;
  protected announcePlayerLeft(name: string): void;
}
