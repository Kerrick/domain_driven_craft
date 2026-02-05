// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { DifficultyName } from "../types/difficulty";
import type { Change } from "../types/change";

export declare class Settings {
  readonly baseDifficulty: DifficultyName;
  readonly baseTickSpeed: number;
  
  get difficulty(): DifficultyName;
  set difficulty(change: Change);
  
  get tickSpeed(): number;
  set tickSpeed(change: Change);
  
  tick(): void;
  hasOverride(rule: "difficulty" | "tickSpeed"): boolean;
  overrideRemaining(rule: "difficulty" | "tickSpeed"): number | null;
}
