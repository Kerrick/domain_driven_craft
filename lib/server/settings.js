// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { DIFFICULTY_MAP } from "../types/difficulty.js";
import { Setting } from "../types/setting.js";
import { Chat, warning, highlight } from "./chat.js";

const BASE_DIFFICULTY_KEY = "base_difficulty";
const BASE_TICK_SPEED_KEY = "base_tick_speed";
const FASTTICK_DURATION_KEY = "fasttick_duration";
const POLL_TIMEOUT_KEY = "poll_timeout";

const DEFAULT_BASE_DIFFICULTY = "normal";
const DEFAULT_BASE_TICK_SPEED = 1;
const DEFAULT_FASTTICK_DURATION = 900;
const DEFAULT_POLL_TIMEOUT = 120;

export class Settings {
  #difficulty;
  #tickSpeed;
  #fasttickDuration;
  #pollTimeout;
  
  constructor() {
    this.#difficulty = new Setting(
      "difficulty",
      () => DIFFICULTY_MAP[world.getDifficulty()] ?? "normal",
      (value) => world.getDimension("overworld").runCommand(`difficulty ${value}`),
      () => world.getDynamicProperty(BASE_DIFFICULTY_KEY) ?? DEFAULT_BASE_DIFFICULTY,
      (value) => world.setDynamicProperty(BASE_DIFFICULTY_KEY, value),
      () => Chat.instance.speak([warning`[Server]`, `Difficulty override expired, restored to`, highlight`${this.#difficulty.base}`])
    );
    
    this.#tickSpeed = new Setting(
      "tickSpeed",
      () => world.gameRules.randomTickSpeed,
      (value) => { world.gameRules.randomTickSpeed = value; },
      () => world.getDynamicProperty(BASE_TICK_SPEED_KEY) ?? DEFAULT_BASE_TICK_SPEED,
      (value) => world.setDynamicProperty(BASE_TICK_SPEED_KEY, value),
      () => Chat.instance.speak([warning`[Server]`, `Tick speed returned to normal`])
    );
    
    this.#fasttickDuration = new Setting(
      "fasttickDuration",
      () => world.getDynamicProperty(FASTTICK_DURATION_KEY) ?? DEFAULT_FASTTICK_DURATION,
      (value) => world.setDynamicProperty(FASTTICK_DURATION_KEY, value),
      () => DEFAULT_FASTTICK_DURATION,
      () => {},  // no base persistence for this one
      () => {}   // no expiry announcer
    );
    
    this.#pollTimeout = new Setting(
      "pollTimeout",
      () => world.getDynamicProperty(POLL_TIMEOUT_KEY) ?? DEFAULT_POLL_TIMEOUT,
      (value) => world.setDynamicProperty(POLL_TIMEOUT_KEY, value),
      () => DEFAULT_POLL_TIMEOUT,
      () => {},
      () => {}
    );
  }
  
  get difficulty() { return this.#difficulty; }
  get tickSpeed() { return this.#tickSpeed; }
  get fasttickDuration() { return this.#fasttickDuration; }
  get pollTimeout() { return this.#pollTimeout; }
  
  tick() {
    this.#difficulty.tick();
    this.#tickSpeed.tick();
  }
  
  // For iteration by SettingCommand
  all() {
    return [this.#difficulty, this.#tickSpeed, this.#fasttickDuration, this.#pollTimeout];
  }
  
  get(name) {
    return this.all().find(s => s.name.toLowerCase() === name.toLowerCase());
  }
}
