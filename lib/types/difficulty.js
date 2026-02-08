// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Difficulty } from '@minecraft/server'

export const DIFFICULTY_MAP = {
  [Difficulty.Peaceful]: 'peaceful',
  [Difficulty.Easy]: 'easy',
  [Difficulty.Normal]: 'normal',
  [Difficulty.Hard]: 'hard',
}

export const DIFFICULTIES = Object.values(DIFFICULTY_MAP)

export const DIFFICULTY_PATTERN = new RegExp(`^!difficulty\\s+(${DIFFICULTIES.join('|')})$`, 'i')
