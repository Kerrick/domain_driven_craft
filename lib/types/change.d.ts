// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Settings can be changed permanently or temporarily (e.g. a fast-tick poll
 * lasts 60 seconds). A Change captures the new value and, for temporary
 * changes, the expiration time.
 */
export declare class Change {
  /** Creates a permanent change. */
  static permanent(value: number | string): Change
  /** Creates a temporary change that expires after the given duration. */
  static temporary(value: number | string, durationSeconds: number): Change

  /** The new setting value. */
  readonly value: number | string
  /** Epoch timestamp when this change expires, or null if permanent. */
  readonly expiresAt: number | null
  /** Whether this change will automatically revert. */
  readonly isTemporary: boolean
}
