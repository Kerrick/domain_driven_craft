// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting } from '../../types/setting'

/** Controls the random tick speed (crop growth, fire spread, etc.). */
export declare class TickSpeedSetting extends Setting<number> {
  /** @inheritdoc */
  get name(): 'tickSpeed'
}
