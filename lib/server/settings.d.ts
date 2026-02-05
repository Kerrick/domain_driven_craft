// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { DifficultyName } from "../types/difficulty";
import type { Change } from "../types/change";

export declare class Settings {
  readonly difficulty: DifficultyName;
  readonly baseDifficulty: DifficultyName;
  readonly tickSpeed: number;
  readonly baseTickSpeed: number;
  
  setDifficulty(change: Change): void;
  setTickSpeed(change: Change): void;
  
  tick(): void;
  hasOverride(rule: "difficulty" | "tickSpeed"): boolean;
  overrideRemaining(rule: "difficulty" | "tickSpeed"): number | null;
}
