// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting } from '../../types/setting'
import type { DifficultyName } from '../../types/difficulty'

/** Controls the server's difficulty level (peaceful, easy, normal, hard). */
export declare class DifficultySetting extends Setting<DifficultyName> {
  /** @inheritdoc */
  get name(): 'difficulty'
}
