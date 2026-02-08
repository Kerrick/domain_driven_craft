// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Notification } from './notification'

/**
 * The notification queue for a player's action bar. Multiple notifications can
 * overlap; expired ones are automatically pruned on iteration.
 */
export declare class Notifications {
  /** Enqueues a new notification with the given display duration. */
  add(text: string, seconds: number): void
  /** Whether all notifications have expired (or none were added). */
  readonly isEmpty: boolean;
  /** Yields active (non-expired) notifications. */
  [Symbol.iterator](): Iterator<Notification>
}
