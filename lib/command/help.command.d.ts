// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * Players discover available commands through a help listing. This command
 * whispers all registered commands with their usage and description.
 */
export declare const HelpCommand: CommandClass<Command>
