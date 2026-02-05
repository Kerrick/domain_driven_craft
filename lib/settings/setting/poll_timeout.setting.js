// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Setting } from "../../types/setting.js";

const KEY = "poll_timeout";
const DEFAULT = 120;

/** @extends {Setting<number>} */
export class PollTimeoutSetting extends Setting {
  static settingName = "pollTimeout";
  
  get name() { return PollTimeoutSetting.settingName; }
  
  get current() {
    return Number(world.getDynamicProperty(KEY) ?? DEFAULT);
  }
  
  set current(value) {
    world.setDynamicProperty(KEY, Math.max(30, Math.min(300, Number(value))));
  }
  
  get base() {
    return DEFAULT;
  }
  
  set base(value) {
    // No base persistence
  }
  
  parse(input) {
    const value = parseInt(input, 10);
    return isNaN(value) ? null : value;
  }
}
