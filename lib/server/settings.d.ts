// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Difficulty } from "../types/difficulty";

export declare class Settings {
  difficulty: Difficulty;
  tickSpeed: number;
  pollTimeout: number;
}
