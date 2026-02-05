// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command } from "./types";
import type { Player } from "../player";
import type { DifficultyName } from "../types/difficulty";

export declare class DifficultyCommand implements Command {
  constructor();
  constructor(targetDifficulty: DifficultyName);
  execute(player: Player): void;
}
