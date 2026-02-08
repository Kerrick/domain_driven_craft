// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * Polls have a voting window. The default duration may not suit every server.
 * This command adjusts the poll timeout.
 */
export declare const TimeoutCommand: CommandClass<Command>
