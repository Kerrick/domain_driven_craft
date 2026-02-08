// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { BooleanPreference } from './boolean.preference'

/**
 * Coordinate display preference. Defaults to off because coordinates clutter
 * the action bar for most players.
 */
export declare class CoordsPreference extends BooleanPreference {
  constructor(playerName: string)
}
