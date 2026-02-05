// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { DIFFICULTY_MAP, DIFFICULTIES } from "../types/difficulty.js";

const BASE_DIFFICULTY_KEY = "base_difficulty";
const DEFAULT_BASE_DIFFICULTY = "normal";

export class Settings {
  get difficulty() {
    return DIFFICULTY_MAP[world.getDifficulty()] ?? "normal";
  }
  
  set difficulty(value) {
    world.getDimension("overworld").runCommand(`difficulty ${value}`);
  }
  
  get baseDifficulty() {
    return world.getDynamicProperty(BASE_DIFFICULTY_KEY) ?? DEFAULT_BASE_DIFFICULTY;
  }
  
  set baseDifficulty(value) {
    if (DIFFICULTIES.includes(value)) {
      world.setDynamicProperty(BASE_DIFFICULTY_KEY, value);
    }
  }
  
  get tickSpeed() {
    return world.gameRules.randomTickSpeed;
  }
  
  set tickSpeed(value) {
    world.gameRules.randomTickSpeed = value;
  }
}
