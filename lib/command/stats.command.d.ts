// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * The server tracks per-player statistics like blocks broken and distance
 * walked. Players want to see their progress (or another player's). This
 * command whispers a stat summary.
 */
export declare const StatsCommand: CommandClass<Command>
