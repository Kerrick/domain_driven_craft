// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from './poll'

/**
 * A poll that temporarily increases the server's random tick speed. When the
 * effect expires, the original tick speed is restored.
 */
export declare class TickSpeedPoll extends Poll {
  constructor(speed: number, effectDurationSeconds: number)
}
