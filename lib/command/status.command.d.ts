// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * Server state is spread across players, settings, and active polls. This
 * command shows a consolidated snapshot of the server's current state.
 */
export declare const StatusCommand: CommandClass<Command>
