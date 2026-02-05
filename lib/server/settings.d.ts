// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { DifficultyName } from "../types/difficulty";

export declare class Settings {
  difficulty: DifficultyName;
  baseDifficulty: DifficultyName;
  tickSpeed: number;
}
