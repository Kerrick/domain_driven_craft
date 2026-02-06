// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting, ReadonlySetting } from "../types/setting";
import type { Change } from "../types/change";
import type { DifficultyName } from "../types/difficulty";

export declare class Settings {
  static readonly instance: Settings;
  
  readonly difficulty: ReadonlySetting<DifficultyName>;
  readonly tickSpeed: ReadonlySetting<number>;
  readonly fasttickDuration: ReadonlySetting<number>;
  readonly pollTimeout: ReadonlySetting<number>;
  
  tick(): void;
  all(): ReadonlySetting<unknown>[];
  get(name: string): ReadonlySetting<unknown> | undefined;
  parse(name: string, input: string): unknown | null;
  apply(name: string, change: Change): void;
  force(name: string, value: unknown): void;
}
