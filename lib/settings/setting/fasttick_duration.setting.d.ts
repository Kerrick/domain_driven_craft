// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting } from '../../types/setting'

/** Duration in seconds for fast-tick poll effects. */
export declare class FasttickDurationSetting extends Setting<number> {
  /** @inheritdoc */
  get name(): 'fasttickDuration'
}
