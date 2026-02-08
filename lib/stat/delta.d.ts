// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Stat } from './stat'

/**
 * When a stat changes, the server needs to check if the new value crosses a
 * milestone threshold. Delta polymorphically dispatches to the right
 * {@link Milestone} subclass for the stat's type.
 */
export declare class Delta {
  constructor(stat: Stat)
  /** Checks whether the stat has crossed a new milestone threshold. */
  check(): void
}
