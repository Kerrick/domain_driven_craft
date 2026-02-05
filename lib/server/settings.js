// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world, Difficulty } from "@minecraft/server";

const DIFFICULTY_MAP = {
  [Difficulty.Peaceful]: "peaceful",
  [Difficulty.Easy]: "easy",
  [Difficulty.Normal]: "normal",
  [Difficulty.Hard]: "hard"
};

const DEFAULT_POLL_TIMEOUT = 90;

export class Settings {
  #pollTimeout = DEFAULT_POLL_TIMEOUT;
  
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
  
  get pollTimeout() {
    return this.#pollTimeout;
  }
  
  set pollTimeout(value) {
    this.#pollTimeout = Math.max(30, Math.min(300, value));
  }
}
