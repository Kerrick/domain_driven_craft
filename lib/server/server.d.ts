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
  readonly baseDifficulty: DifficultyName;
  
  get tickSpeed(): number;
  set tickSpeed(change: Change);
  readonly baseTickSpeed: number;
  
  fasttickDuration: number;
  
  tick(): void;
  
  player(name: string): Player | undefined;
  allPlayers(): Player[];
  
  playerJoined(mcPlayer: import("@minecraft/server").Player): void;
  playerLeft(name: string): void;
  
  recalculateDifficulty(): void;
}
