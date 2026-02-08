// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Preference } from './preference.js'

export class BooleanPreference extends Preference {
  get enabled() { return this.storedValue === true }

  toggle() {
    const newValue = !this.enabled
    this.storedValue = newValue
    return newValue
  }

  get formatted() { return this.enabled ? 'on' : 'off' }
}
