// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'
import type { Poll } from '../poll/poll'
import type { Proposal } from '../poll/proposal'

/** Tagged template literal for muted (gray) text in chat. */
export declare function muted(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string
/** Tagged template literal for highlighted text in chat. */
export declare function highlight(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string
/** Tagged template literal for success (green) text in chat. */
export declare function success(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string
/** Tagged template literal for warning (yellow) text in chat. */
export declare function warning(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string
/** Tagged template literal for error (red) text in chat. */
export declare function error(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string
/** Tagged template literal for command names in chat. */
export declare function command(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string
/** Tagged template literal for command arguments in chat. */
export declare function arg(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string
/** Tagged template literal for bold text in chat. */
export declare function bold(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string

type Line = string | string[]

/**
 * The server communicates with players through Minecraft's chat system. Chat is
 * the facade for all messaging — whispers, broadcasts, celebrations — and also
 * owns the poll lifecycle.
 */
export declare class Chat {
  /** Singleton accessor. */
  static readonly instance: Chat

  /** Routes a raw chat message to the matching command, or returns null. */
  hear(message: string): import('../command/types').Command | null
  /** Sends a private message to a single player. */
  whisper(player: Player, ...lines: Line[]): void
  /** Sends a message to all players. */
  speak(...lines: Line[]): void
  /** Broadcasts a warning-styled message to all players. */
  broadcastWarning(...lines: Line[]): void
  /** Broadcasts a success-styled message to all players. */
  broadcastSuccess(...lines: Line[]): void
  /** Announces a milestone achievement server-wide. */
  celebrate(tag: string, ...messageParts: string[]): void
  // Delegation to Polls
  /** Starts or votes on a poll from a proposal. */
  propose<T extends Poll>(proposal: Proposal<T>): T
  /** Looks up an active poll by type. */
  poll<T extends Poll>(PollClass: new (...args: any[]) => T): T | undefined
  /** All currently active polls. */
  activePolls(): Poll[]
  /** Active polls formatted as styled chat lines. */
  get pollSummary(): string[][]
  /** Ticks poll deadlines and handles expirations. */
  checkPolls(): void
  /** Removes a specific poll. */
  clearPoll(poll: Poll): void
  /** Notifies polls that external conditions have changed. */
  notifyConditionChange(): void
}
