// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Difficulty } from '@minecraft/server'

/** Domain-friendly difficulty name. */
export type DifficultyName = 'peaceful' | 'easy' | 'normal' | 'hard'
/** Maps Minecraft's numeric {@link Difficulty} enum to domain names. */
export declare const DIFFICULTY_MAP: Record<Difficulty, DifficultyName>
/** All valid difficulty names, ordered from easiest to hardest. */
export declare const DIFFICULTIES: readonly DifficultyName[]
/** Matches a valid difficulty name in user input. */
export declare const DIFFICULTY_PATTERN: RegExp
