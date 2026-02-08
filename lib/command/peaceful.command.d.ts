// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * Difficulty is a server-wide setting, but individual players may prefer
 * peaceful. This command toggles the player's peaceful preference, which feeds
 * into the server's difficulty calculation.
 */
export declare const PeacefulCommand: CommandClass<Command>
