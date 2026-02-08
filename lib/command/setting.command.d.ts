// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * The server has named settings like difficulty and tick speed. This command is
 * the general-purpose interface for viewing and adjusting any of them.
 */
export declare const SettingCommand: CommandClass<Command>
