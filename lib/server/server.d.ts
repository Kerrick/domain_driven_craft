// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Poll } from "../poll";
import type { Chat, Message } from "./chat";
import type { Settings } from "./settings";
import type { Welcome } from "./welcome";

export declare class Server {
  readonly chat: Chat;
  readonly settings: Settings;
  readonly welcome: Welcome;
  readonly activePoll: Poll | null;
  readonly playerCount: number;
  
  player(name: string): Player | undefined;
  allPlayers(): Player[];
  
  playerJoined(mcPlayer: import("@minecraft/server").Player): void;
  playerLeft(name: string): void;
  
  whisper(player: Player, compose: (msg: Message) => void): void;
  speak(compose: (msg: Message) => void): void;
  
  recalculateDifficulty(): void;
  startPoll(initiator: Player): void;
  clearPoll(): void;
}
