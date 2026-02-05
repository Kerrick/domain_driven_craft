// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandHelp } from "./types";
import type { Player } from "../player";
import type { Difficulty } from "../types/difficulty";

export declare class DifficultyCommand implements Command {
  static readonly pattern: RegExp;
  static readonly help: CommandHelp;
  static from(message: string): DifficultyCommand | null;
  
  constructor();
  constructor(targetDifficulty: Difficulty);
  
  execute(player: Player): void;
}
