// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from "./types";
import type { Server } from "../server";

export declare class DifficultyPoll implements Poll {
  readonly targetDifficulty: "peaceful" | "easy" | "normal" | "hard";
  
  constructor(server: Server, targetDifficulty: string, durationSeconds: number);
  
  vote(player: import("../player").Player): void;
  playerLeft(name: string): void;
  
  conditionChanged(): void;
}
