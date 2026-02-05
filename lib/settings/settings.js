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
  #byName;
  
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
    this.#byName = new Map([
      ["difficulty", this.#difficulty],
      ["tickspeed", this.#tickSpeed],
      ["fasttickduration", this.#fasttickDuration],
      ["polltimeout", this.#pollTimeout],
    ]);
  }
  
  get difficulty() { return this.#difficulty.asReadonly(); }
  get tickSpeed() { return this.#tickSpeed.asReadonly(); }
  get fasttickDuration() { return this.#fasttickDuration.asReadonly(); }
  get pollTimeout() { return this.#pollTimeout.asReadonly(); }
  
  tick() {
    this.#difficulty.tick();
    this.#tickSpeed.tick();
  }
  
  all() {
    return Array.from(this.#byName.values()).map(s => s.asReadonly());
  }
  
  get(name) {
    return this.#byName.get(name.toLowerCase())?.asReadonly();
  }
  
  parse(name, input) {
    return this.#byName.get(name.toLowerCase())?.parse(input) ?? null;
  }
  
  apply(name, change) {
    const setting = this.#byName.get(name.toLowerCase());
    if (setting) {
      setting.apply(change);
    }
  }
}
