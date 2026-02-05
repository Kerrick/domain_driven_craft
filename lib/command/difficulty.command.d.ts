// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command } from "./types";

export declare class DifficultyCommand implements Command {
  constructor();
  constructor(targetDifficulty: "peaceful" | "easy" | "normal" | "hard");
  
  static from(message: string): DifficultyCommand | null;
  
  execute(player: import("../player").Player, server: import("../server").Server): void;
}
