// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BooleanPreference } from './boolean.preference.js'

export class CoordsPreference extends BooleanPreference {
  constructor(playerName) { super(playerName, 'coords', '!coords') }
}
