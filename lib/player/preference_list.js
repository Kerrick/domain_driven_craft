// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PeacefulPreference } from "./preference/peaceful.preference.js";
import { HomePreference } from "./preference/home.preference.js";

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
  
  set home(location) {
    this.#home.location = location;
  }
  
  get homeFormatted() {
    return this.#home.formatted;
  }
  
  get hasHome() {
    return this.#home.location !== null;
  }
  
  get homeLocation() {
    return this.#home.location;
  }
  
  all() {
    return [this.#peaceful.asReadonly(), this.#home.asReadonly()];
  }
}
