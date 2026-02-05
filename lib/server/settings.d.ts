// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting } from "../types/setting";
import type { DifficultyName } from "../types/difficulty";

export declare class Settings {
  readonly difficulty: Setting<DifficultyName>;
  readonly tickSpeed: Setting<number>;
  readonly fasttickDuration: Setting<number>;
  readonly pollTimeout: Setting<number>;
  
  tick(): void;
  all(): Setting<unknown>[];
  get(name: string): Setting<unknown> | undefined;
}
