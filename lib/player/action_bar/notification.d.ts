// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * A temporary message shown on the action bar for a fixed duration. Expires
 * after its allotted seconds.
 */
export declare class Notification {
  constructor(text: string, seconds: number)

  /** The message to display. */
  readonly text: string
  /** Whether this notification's display time has elapsed. */
  readonly expired: boolean
}
