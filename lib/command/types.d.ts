// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'

/** Structured help entry displayed by the help command. */
export interface CommandHelp {
  /** Chat syntax shown to the player. */
  usage: string
  /** One-line explanation of what the command does. */
  description: string
}

/**
 * Players interact with the server through chat messages. Each message that
 * matches a trigger becomes a parsed command instance ready to execute.
 */
export interface Command {
  /** Carries out the command's effect for the given {@link Player}. */
  execute(player: Player): void
}

/**
 * Static surface of a command class — trigger, matching, and help. Each command
 * owns its own syntax, so adding a new command never touches a central parser.
 */
export interface CommandClass<T extends Command = Command> {
  /** Constructs a command instance. */
  new (...args: any[]): T
  /** Primary chat prefix that identifies this command. */
  readonly trigger: string
  /** Alternate triggers that also match. */
  readonly aliases?: readonly string[]
  /** Extracts arguments from the chat message. */
  readonly pattern?: RegExp
  /** Usage and description pair for the help listing. */
  readonly help?: CommandHelp
  /** Parses a chat message into a command, or returns null to decline. */
  from(message: string): T | null
}
