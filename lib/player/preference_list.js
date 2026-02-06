// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PeacefulPreference } from "./preference/peaceful.preference.js";
import { HomePreference } from "./preference/home.preference.js";
import { Location } from "../types/location.js";

export class PreferenceList {
  #peaceful;
  #home;
  
  constructor(playerName) {
    this.#peaceful = new PeacefulPreference(playerName);
    this.#home = new HomePreference(playerName);
  }
  
  get peaceful() {
    return this.#peaceful.enabled;
  }
  
  togglePeaceful() {
    return this.#peaceful.toggle();
  }
  
  setHome(x, y, z, dimension) {
    this.#home.location = new Location(x, y, z, dimension);
  }
  
  get homeFormatted() {
    return this.#home.formatted;
  }
  
  all() {
    return [this.#peaceful, this.#home];
  }
}
