// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";

export class Settings {
  #difficulty = "normal";
  #tickSpeed = 1;
  
  get difficulty() { return this.#difficulty; }
  set difficulty(value) {
    this.#difficulty = value;
    world.getDimension("overworld").runCommand(`difficulty ${value}`);
  }
  
  get tickSpeed() { return this.#tickSpeed; }
  set tickSpeed(value) {
    this.#tickSpeed = value;
    world.getDimension("overworld").runCommand(`gamerule randomtickspeed ${value}`);
  }
}
