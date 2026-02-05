// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { DIFFICULTY_MAP, DIFFICULTIES } from "../types/difficulty.js";
import { Chat, warning, highlight } from "./chat.js";

const BASE_DIFFICULTY_KEY = "base_difficulty";
const BASE_TICK_SPEED_KEY = "base_tick_speed";
const FASTTICK_DURATION_KEY = "fasttick_duration";
const DEFAULT_BASE_DIFFICULTY = "normal";
const DEFAULT_BASE_TICK_SPEED = 1;
const DEFAULT_FASTTICK_DURATION = 900;

export class Settings {
  #restorations = new Map();  // rule → { expiresAt, announcer }
  
  // --- Difficulty ---
  
  get difficulty() {
    return DIFFICULTY_MAP[world.getDifficulty()] ?? "normal";
  }
  
  set difficulty(change) {
    this.#apply("difficulty", change, 
      (value) => world.getDimension("overworld").runCommand(`difficulty ${value}`),
      BASE_DIFFICULTY_KEY,
      () => Chat.instance.speak([warning`[Server]`, `Difficulty override expired, restored to`, highlight`${this.baseDifficulty}`])
    );
  }
  
  get baseDifficulty() {
    return world.getDynamicProperty(BASE_DIFFICULTY_KEY) ?? DEFAULT_BASE_DIFFICULTY;
  }
  
  // --- Tick Speed ---
  
  get tickSpeed() {
    return world.gameRules.randomTickSpeed;
  }
  
  set tickSpeed(change) {
    this.#apply("tickSpeed", change,
      (value) => { world.gameRules.randomTickSpeed = value; },
      BASE_TICK_SPEED_KEY,
      () => Chat.instance.speak([warning`[Server]`, `Tick speed returned to normal`])
    );
  }
  
  get baseTickSpeed() {
    return world.getDynamicProperty(BASE_TICK_SPEED_KEY) ?? DEFAULT_BASE_TICK_SPEED;
  }
  
  // --- FastTick Duration ---
  
  get fasttickDuration() {
    return world.getDynamicProperty(FASTTICK_DURATION_KEY) ?? DEFAULT_FASTTICK_DURATION;
  }
  
  set fasttickDuration(seconds) {
    world.setDynamicProperty(FASTTICK_DURATION_KEY, seconds);
  }
  
  // --- Core Logic ---
  
  #apply(rule, change, setter, baseKey, announcer) {
    setter(change.value);
    
    if (change.isTemporary) {
      this.#restorations.set(rule, { expiresAt: change.expiresAt, announcer });
    } else {
      this.#restorations.delete(rule);
      world.setDynamicProperty(baseKey, change.value);
    }
  }
  
  #baseFor(rule) {
    switch (rule) {
      case "difficulty": return this.baseDifficulty;
      case "tickSpeed": return this.baseTickSpeed;
    }
  }
  
  #setterFor(rule) {
    switch (rule) {
      case "difficulty": 
        return (value) => world.getDimension("overworld").runCommand(`difficulty ${value}`);
      case "tickSpeed":
        return (value) => { world.gameRules.randomTickSpeed = value; };
    }
  }
  
  tick() {
    const now = Date.now();
    for (const [rule, { expiresAt, announcer }] of this.#restorations) {
      if (now >= expiresAt) {
        this.#setterFor(rule)(this.#baseFor(rule));
        this.#restorations.delete(rule);
        announcer();
      }
    }
  }
  
  hasOverride(rule) {
    const restoration = this.#restorations.get(rule);
    return restoration && Date.now() < restoration.expiresAt;
  }
  
  overrideRemaining(rule) {
    const restoration = this.#restorations.get(rule);
    if (!restoration) return null;
    return Math.max(0, Math.ceil((restoration.expiresAt - Date.now()) / 1000));
  }
}
