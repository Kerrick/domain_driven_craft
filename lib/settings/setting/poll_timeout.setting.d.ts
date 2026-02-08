// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting } from '../../types/setting'

/** Seconds before a poll expires without passing. */
export declare class PollTimeoutSetting extends Setting<number> {
  /** @inheritdoc */
  get name(): 'pollTimeout'
}
