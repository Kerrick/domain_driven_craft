// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { DifficultyName } from "../types/difficulty";

export declare class Server {
  static readonly instance: Server;
  static initialize(): Server;
  
  readonly playerCount: number;
  difficulty: DifficultyName;
  tickSpeed: number;
  
  player(name: string): Player | undefined;
  allPlayers(): Player[];
  
  playerJoined(mcPlayer: import("@minecraft/server").Player): void;
  playerLeft(name: string): void;
  
  recalculateDifficulty(): void;
}
