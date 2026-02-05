// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting } from "../../types/setting";
import type { DifficultyName } from "../../types/difficulty";

export declare class DifficultySetting extends Setting<DifficultyName> {
  get name(): "difficulty";
  get current(): DifficultyName;
  set current(value: DifficultyName);
  get base(): DifficultyName;
  set base(value: DifficultyName);
  parse(input: string): DifficultyName | null;
}
