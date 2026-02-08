// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * Each player has per-player preferences (coords display, peaceful mode, home
 * location). This command lists them all with their current values and toggle
 * commands.
 */
export declare const PreferencesCommand: CommandClass<Command>
