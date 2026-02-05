// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Poll } from "../poll/types";
import type { Message } from "./chat";

export declare class Server {
  readonly playerCount: number;
  readonly difficulty: "peaceful" | "easy" | "normal" | "hard";
  tickSpeed: number;
  pollTimeout: number;
  
  player(name: string): Player | undefined;
  allPlayers(): Player[];
  activePolls(): Poll[];
  
  playerJoined(mcPlayer: import("@minecraft/server").Player): void;
  playerLeft(name: string): void;
  
  whisper(player: Player, compose: (msg: Message) => void): void;
  speak(compose: (msg: Message) => void): void;
  hear(message: string): import("../command/types").Command | null;
  
  recalculateDifficulty(): void;
  checkPolls(): void;
  
  poll<T extends Poll>(PollClass: new (...args: any[]) => T): T | undefined;
  startPoll<T extends Poll>(PollClass: new (...args: any[]) => T, ...args: any[]): T;
  clearPoll(poll: Poll): void;
}
