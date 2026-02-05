// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from "./types";
import type { Difficulty } from "../types/difficulty";

export declare class DifficultyPoll implements Poll {
  constructor(targetDifficulty: Difficulty, effectDurationSeconds: number);
  
  readonly targetDifficulty: Difficulty;
}
