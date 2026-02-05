// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Setting } from "../../types/setting.js";
import { DIFFICULTY_MAP, DIFFICULTIES } from "../../types/difficulty.js";
import { Chat, warning, highlight } from "../chat.js";

const KEY = "base_difficulty";
const DEFAULT = "normal";

/** @extends {Setting<import("../../types/difficulty.js").DifficultyName>} */
export class DifficultySetting extends Setting {
  get name() { return "difficulty"; }
  
  get current() {
    return DIFFICULTY_MAP[world.getDifficulty()] ?? "normal";
  }
  
  set current(value) {
    world.getDimension("overworld").runCommand(`difficulty ${value}`);
  }
  
  get base() {
    return String(world.getDynamicProperty(KEY) ?? DEFAULT);
  }
  
  set base(value) {
    world.setDynamicProperty(KEY, value);
  }
  
  parse(input) {
    const value = input.toLowerCase();
    return DIFFICULTIES.includes(value) ? value : null;
  }
  
  announceExpiry() {
    Chat.instance.speak([warning`[Server]`, `Difficulty override expired, restored to`, highlight`${this.base}`]);
  }
}
