// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * Players need to mark a location before they can teleport back to it. This
 * command saves the player's current position as home.
 */
export declare const SetHomeCommand: CommandClass<Command>
