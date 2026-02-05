// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Server } from "../server";
import type { Vote } from "./vote";
import type { Effect } from "./effect";

export declare class Poll {
  readonly isActive: boolean;
  readonly votes: ReadonlyMap<string, Vote>;
  readonly effect: Effect;
  
  constructor(server: Server, tickSpeed: number, durationSeconds: number);
  
  vote(player: Player): void;
  playerLeft(name: string): void;
}
