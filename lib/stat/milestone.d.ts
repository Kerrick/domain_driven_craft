// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Stat } from './stat'

/**
 * Players enjoy recognition when they reach round-number thresholds. A
 * milestone announces the achievement to the server and prevents duplicate
 * celebrations across sessions.
 */
export declare class Milestone {
  constructor(stat: Stat, threshold: number)

  /** Whether this milestone type handles the given stat. */
  static applies(stat: Stat): boolean
  /** Numeric thresholds that trigger a celebration. */
  static get thresholds(): number[]
  /** Checks the stat against thresholds and celebrates if a new one is crossed. */
  static check(stat: Stat): void

  /** Announces the milestone to the server and persists it. */
  celebrate(): void
}
