// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from "./poll";
import type { DifficultyName } from "../types/difficulty";

export declare class DifficultyPoll extends Poll {
  constructor(targetDifficulty: DifficultyName, effectDurationSeconds: number);
  readonly targetDifficulty: DifficultyName;
}
