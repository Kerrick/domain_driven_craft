// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { DIFFICULTY_MAP } from "../types/difficulty.js";

export class Settings {
  get difficulty() {
    return DIFFICULTY_MAP[world.getDifficulty()] ?? "normal";
  }
  
  set difficulty(value) {
    world.getDimension("overworld").runCommand(`difficulty ${value}`);
  }
  
  get tickSpeed() {
    return world.gameRules.randomTickSpeed;
  }
  
  set tickSpeed(value) {
    world.gameRules.randomTickSpeed = value;
  }
}
