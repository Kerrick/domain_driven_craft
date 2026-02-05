// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from "./types";

export declare class DifficultyPoll implements Poll {
  constructor(targetDifficulty: "peaceful" | "easy" | "normal" | "hard", effectDurationSeconds: number);
  
  readonly targetDifficulty: "peaceful" | "easy" | "normal" | "hard";
}
