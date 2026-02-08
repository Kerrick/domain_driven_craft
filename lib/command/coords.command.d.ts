// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'

/**
 * The action bar does not show coordinates by default. Players who want
 * positional awareness can toggle them on. This command switches the coordinate
 * display for the issuing player.
 */
export declare const CoordsCommand: CommandClass<Command>
