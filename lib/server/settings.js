// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DifficultySetting, TickSpeedSetting, FasttickDurationSetting, PollTimeoutSetting } from "./setting/index.js";

export class Settings {
  #difficulty = new DifficultySetting();
  #tickSpeed = new TickSpeedSetting();
  #fasttickDuration = new FasttickDurationSetting();
  #pollTimeout = new PollTimeoutSetting();
  
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
