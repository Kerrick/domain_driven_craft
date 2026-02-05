// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Difficulty } from "@minecraft/server";

export type DifficultyName = "peaceful" | "easy" | "normal" | "hard";
export declare const DIFFICULTY_MAP: Record<Difficulty, DifficultyName>;
export declare const DIFFICULTIES: readonly DifficultyName[];
export declare const DIFFICULTY_PATTERN: RegExp;
