// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { DifficultyName } from "../types/difficulty";
import type { Change } from "../types/change";

export declare class Server {
  static readonly instance: Server;
  static initialize(): Server;
  
  readonly playerCount: number;
  readonly name: string;
  
  get difficulty(): DifficultyName;
  set difficulty(change: Change);
  
  get tickSpeed(): number;
  set tickSpeed(change: Change);
  
  tick(): void;
  
  player(name: string): Player | undefined;
  allPlayers(): Player[];
  
  playerJoined(mcPlayer: import("@minecraft/server").Player): void;
  playerLeft(name: string): void;
  
  recalculateDifficulty(): void;
}
