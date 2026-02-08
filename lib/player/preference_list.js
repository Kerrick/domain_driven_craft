// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PeacefulPreference } from './preference/peaceful.preference.js'
import { CoordsPreference } from './preference/coords.preference.js'
import { HomePreference } from './preference/home.preference.js'

export class PreferenceList {
  #peaceful
  #coords
  #home

  constructor(playerName) {
    this.#peaceful = new PeacefulPreference(playerName)
    this.#coords = new CoordsPreference(playerName)
    this.#home = new HomePreference(playerName)
  }

  get peaceful() { return this.#peaceful.enabled }
  togglePeaceful() { return this.#peaceful.toggle() }
  get coords() { return this.#coords.enabled }
  toggleCoords() { return this.#coords.toggle() }
  set home(location) { this.#home.location = location }
  get homeFormatted() { return this.#home.formatted }
  get hasHome() { return this.#home.location !== null }
  get homeLocation() { return this.#home.location }
  all() { return [this.#peaceful.asReadonly(), this.#coords.asReadonly(), this.#home.asReadonly()] }
}
