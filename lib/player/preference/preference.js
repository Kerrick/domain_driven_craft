// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { ReadonlyPreference } from "./readonly_preference.js";

export class Preference {
  #playerName;
  #name;
  #key;
  #command;
  
  constructor(playerName, name, command) {
    this.#playerName = playerName;
    this.#name = name;
    this.#key = `pref_${playerName}_${name}`;
    this.#command = command;
  }
  
  get name() { return this.#name; }
  get command() { return this.#command; }
  get playerName() { return this.#playerName; }
  
  get storedValue() {
    return world.getDynamicProperty(this.#key);
  }
  
  set storedValue(val) {
    world.setDynamicProperty(this.#key, val);
  }
  
  get formatted() {
    throw new Error("Subclass must implement formatted");
  }
  
  asReadonly() {
    return new ReadonlyPreference(this.#name, this.formatted, this.#command);
  }
}
