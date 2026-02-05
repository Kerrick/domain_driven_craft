// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Chat } from "./chat";

export declare class Server {
  readonly chat: Chat;
  readonly playerCount: number;
  difficulty: "peaceful" | "easy" | "normal" | "hard";
  tickSpeed: number;
  pollTimeout: number;
  
  player(name: string): Player | undefined;
  allPlayers(): Player[];
  
  playerJoined(mcPlayer: import("@minecraft/server").Player): void;
  playerLeft(name: string): void;
  
  whisper(player: Player, ...lines: string[]): void;
  speak(...lines: string[]): void;
  hear(message: string): import("../command/types").Command | null;
  
  recalculateDifficulty(): void;
}
