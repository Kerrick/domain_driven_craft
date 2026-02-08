// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * Players explore far from their base and want a way back. This command
 * teleports the player to their saved home location.
 */
export declare const GoHomeCommand: CommandClass<Command>
