// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Server } from "../server/server.js";

export class PreferenceList {
  #playerName;
  
  constructor(playerName) {
    this.#playerName = playerName;
  }
  
  #key(name) {
    return `pref_${this.#playerName}_${name}`;
  }
  
  get peaceful() {
    return world.getDynamicProperty(this.#key("peaceful")) === true;
  }
  
  togglePeaceful() {
    const newValue = !this.peaceful;
    world.setDynamicProperty(this.#key("peaceful"), newValue);
    Server.instance.recalculateDifficulty();
    return newValue;
  }
}
