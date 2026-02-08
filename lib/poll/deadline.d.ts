// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Polls run on a timer. This value object tracks expiration and fires a
 * one-time warning when the deadline is approaching.
 */
export declare class Deadline {
  constructor(timeoutSeconds: number)

  /** Whether the deadline has passed. */
  readonly isExpired: boolean
  /** Seconds left before expiration. */
  readonly remainingSeconds: number
  /** Whether the warning threshold has been reached but not yet announced. */
  readonly shouldWarn: boolean

  /** Records that the approaching-deadline warning has been sent. */
  markWarned(): void
}
