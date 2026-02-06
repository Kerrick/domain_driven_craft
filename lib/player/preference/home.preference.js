// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Preference } from "./preference.js";
import { Location } from "../../types/location.js";

export class HomePreference extends Preference {
  #location = null;
  
  constructor(playerName) {
    super(playerName, "home", "!sethome");
    const stored = this.storedValue;
    if (stored) {
      this.#location = Location.fromJSON(stored);
    }
  }
  
  get location() {
    return this.#location;
  }
  
  set location(loc) {
    this.#location = loc;
    this.storedValue = JSON.stringify(loc.toJSON());
  }
  
  get formatted() {
    return this.#location ? this.#location.formatted : "not set";
  }
}
