// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command } from "./types";

export declare class DifficultyCommand implements Command {
  static readonly triggers: readonly string[];
  
  constructor(targetDifficulty: string);
  
  execute(player: import("../player").Player, server: import("../server").Server): void;
}
