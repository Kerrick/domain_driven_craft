// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'
import { Singleton } from '../types/singleton.js'

/**
 * Chat messages arrive as raw strings with no routing metadata. Something to
 * match each message to the right {@link CommandClass}. This registry holds all
 * registered commands and dispatches messages to them.
 */
export declare class Commands extends Singleton {
  /** Singleton accessor. */
  static readonly instance: Commands
  /** Adds one or more command classes to the registry. */
  register(...CommandClasses: CommandClass[]): void
  /** Finds the first command that claims the message, or returns null. */
  for(message: string): Command | null
  /** All registered command classes. */
  all(): Set<CommandClass>
}
