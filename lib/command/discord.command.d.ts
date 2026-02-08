// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * The server community communicates outside the game on Discord. Players need
 * the invite link without leaving the game. This command shares it.
 */
export declare const DiscordCommand: CommandClass<Command>
