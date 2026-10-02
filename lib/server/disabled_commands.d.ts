// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from '../command/types'
import { Singleton } from '../types/singleton.js'

/**
 * Server operators turn commands off for a season through deploy configuration.
 * Players who run a disabled command need to hear why it stays off. This
 * registry maps disabled triggers to their operator-written explanations.
 */
export declare class DisabledCommands extends Singleton {
  /** Singleton accessor. */
  static readonly instance: DisabledCommands
  /** Reads server-admin variables once and caches disabled triggers. */
  load(): void
  /** Reports whether the given command instance stays disabled. */
  isDisabled(command: Command): boolean
  /** Reports whether the given command class stays disabled. */
  isDisabledClass(CommandClass: CommandClass): boolean
  /** Returns the operator-written explanation for the command, or null. */
  messageFor(command: Command): string | null
  /** All disabled triggers with their explanations, sorted by trigger. */
  all(): Array<{ trigger: string; message: string }>
}
