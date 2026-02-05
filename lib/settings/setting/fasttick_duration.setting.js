// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Setting } from "../../types/setting.js";

const KEY = "fasttick_duration";
const DEFAULT = 900;

/** @extends {Setting<number>} */
export class FasttickDurationSetting extends Setting {
  static settingName = "fasttickDuration";
  
  get name() { return FasttickDurationSetting.settingName; }
  
  get current() {
    return Number(world.getDynamicProperty(KEY) ?? DEFAULT);
  }
  
  set current(value) {
    world.setDynamicProperty(KEY, value);
  }
  
  get base() {
    return DEFAULT;
  }
  
  set base(value) {
    // No base persistence - default is hardcoded
  }
  
  parse(input) {
    const value = parseInt(input, 10);
    return isNaN(value) ? null : value;
  }
}
