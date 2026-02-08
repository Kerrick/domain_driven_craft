// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from '../poll/poll'
import type { Proposal } from '../poll/proposal'

/**
 * The server can have multiple polls running concurrently (e.g. fast tick while
 * another vote is open). This registry manages active polls, ticks their
 * deadlines, and handles expiration.
 */
export declare class Polls {
  /** Default timeout in seconds for new polls. */
  timeout: number

  /** Starts or votes on a poll from a proposal. */
  propose<T extends Poll>(proposal: Proposal<T>): T
  /** Looks up an active poll by type. */
  get<T extends Poll>(PollClass: new (...args: any[]) => T): T | undefined
  /** All currently active polls. */
  active(): Poll[]
  /** Active polls formatted as styled chat lines. */
  get asChatSummary(): string[][]
  /** Advances deadlines and expires any that have passed. */
  check(): void
  /** Removes a specific poll from the registry. */
  clear(poll: Poll): void
  /** Notifies all active polls that external conditions have changed. */
  notifyConditionChange(): void
}
