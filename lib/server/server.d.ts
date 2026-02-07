// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export declare class Server {
  static readonly instance: Server;
  
  readonly playerCount: number;
  readonly name: string;
  
  tick(): void;
  
  player(name: string): Player | undefined;
  allPlayers(): Set<Player>;
  activePlayers(): Set<Player>;
  
  playerJoined(mcPlayer: import("@minecraft/server").Player): void;
  playerLeft(name: string): void;
  
  recalculateDifficulty(): void;
}
