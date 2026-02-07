// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Singleton } from "../types/singleton.js";
import { DifficultySetting, TickSpeedSetting, FasttickDurationSetting, PollTimeoutSetting, AfkThresholdSetting } from "./setting/index.js";

const SETTINGS = [DifficultySetting, TickSpeedSetting, FasttickDurationSetting, PollTimeoutSetting, AfkThresholdSetting];

export class Settings extends Singleton {
  #instances = SETTINGS.map(S => new S());
  #byName = new Map(this.#instances.map(s => [s.name.toLowerCase(), s]));
  
  get difficulty() { return this.#byName.get("difficulty").asReadonly(); }
  get tickSpeed() { return this.#byName.get("tickspeed").asReadonly(); }
  get fasttickDuration() { return this.#byName.get("fasttickduration").asReadonly(); }
  get pollTimeout() { return this.#byName.get("polltimeout").asReadonly(); }
  get afkThreshold() { return this.#byName.get("afkthreshold").asReadonly(); }
  
  tick() {
    this.#byName.get("difficulty").tick();
    this.#byName.get("tickspeed").tick();
  }
  
  all() {
    return this.#instances.map(s => s.asReadonly());
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
  
  force(name, value) {
    const setting = this.#byName.get(name.toLowerCase());
    if (setting) {
      setting.force(value);
    }
  }
}
