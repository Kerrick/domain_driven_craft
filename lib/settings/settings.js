// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DifficultySetting, TickSpeedSetting, FasttickDurationSetting, PollTimeoutSetting } from "./setting/index.js";

const INIT_KEY = Symbol("Settings.initialize");
let _instance = null;

export class Settings {
  #difficulty = new DifficultySetting();
  #tickSpeed = new TickSpeedSetting();
  #fasttickDuration = new FasttickDurationSetting();
  #pollTimeout = new PollTimeoutSetting();
  
  static get instance() {
    return _instance;
  }
  
  static initialize() {
    _instance = new Settings(INIT_KEY);
    return _instance;
  }
  
  constructor(key) {
    if (key !== INIT_KEY) {
      throw new Error("Use Settings.initialize() instead of new Settings()");
    }
  }
  
  get difficulty() { return this.#difficulty; }
  get tickSpeed() { return this.#tickSpeed; }
  get fasttickDuration() { return this.#fasttickDuration; }
  get pollTimeout() { return this.#pollTimeout; }
  
  tick() {
    this.#difficulty.tick();
    this.#tickSpeed.tick();
  }
  
  all() {
    return [this.#difficulty, this.#tickSpeed, this.#fasttickDuration, this.#pollTimeout];
  }
  
  get(name) {
    return this.all().find(s => s.name.toLowerCase() === name.toLowerCase());
  }
}
