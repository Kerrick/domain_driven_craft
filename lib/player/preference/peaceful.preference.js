// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Preference } from "./preference.js";
import { Server } from "../../server/server.js";

export class PeacefulPreference extends Preference {
  constructor(playerName) {
    super(playerName, "peaceful", "!peaceful");
  }
  
  get enabled() {
    return this.storedValue === true;
  }
  
  toggle() {
    const newValue = !this.enabled;
    this.storedValue = newValue;
    Server.instance.recalculateDifficulty();
    return newValue;
  }
  
  get formatted() {
    return this.enabled ? "on" : "off";
  }
}
