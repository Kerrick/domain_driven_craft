// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Setting } from "../../types/setting.js";
import { Chat, warning } from "../../server/chat.js";

const KEY = "base_tick_speed";
const DEFAULT = 1;

/** @extends {Setting<number>} */
export class TickSpeedSetting extends Setting {
  static settingName = "tickSpeed";
  
  get name() { return TickSpeedSetting.settingName; }
  
  get current() {
    return world.gameRules.randomTickSpeed;
  }
  
  set current(value) {
    world.gameRules.randomTickSpeed = value;
  }
  
  get base() {
    return Number(world.getDynamicProperty(KEY) ?? DEFAULT);
  }
  
  set base(value) {
    world.setDynamicProperty(KEY, value);
  }
  
  parse(input) {
    const value = parseInt(input, 10);
    return isNaN(value) ? null : value;
  }
  
  announceExpiry() {
    Chat.instance.speak([warning`[Server]`, `Tick speed returned to normal`]);
  }
}
