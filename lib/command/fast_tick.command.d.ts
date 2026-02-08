// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * Crop growth and smelting are slow at the default tick speed. Changing tick
 * speed affects all players, so it goes through a vote. This command proposes a
 * temporary fast-tick poll.
 */
export declare const FastTickCommand: CommandClass<Command>
