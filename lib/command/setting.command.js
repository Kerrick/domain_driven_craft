// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, error, command, arg } from "../server/chat.js";
import { Settings } from "../settings/index.js";
import { Change } from "../types/change.js";

export class SettingCommand {
  static get trigger() { return "!setting"; }
  static pattern = new RegExp(`^${SettingCommand.trigger}(?:\\s+(\\w+)(?:\\s+(.+))?)?$`, "i");
  static help = { usage: `${SettingCommand.trigger} <name> [value]`, description: "View/set server settings (Op)" };
  
  #name;
  #value;
  
  constructor(name = null, value = null) {
    this.#name = name?.toLowerCase();
    this.#value = value;
  }
  
  static from(message) {
    const match = message.match(SettingCommand.pattern);
    if (match) {
      return new SettingCommand(match[1], match[2]);
    }
    return null;
  }
  
  execute(player) {
    if (!this.#name) {
      this.#showAll(player);
      return;
    }
    
    const setting = Settings.instance.get(this.#name);
    if (!setting) {
      Chat.instance.whisper(player, error`Unknown setting: ${this.#name}`);
      return;
    }
    
    if (!this.#value) {
      this.#show(player, setting);
    } else {
      this.#set(player, setting);
    }
  }
  
  #showAll(player) {
    const lines = [muted`=== Server Settings ===`];
    
    for (const setting of Settings.instance.all()) {
      lines.push([muted`${setting.name}:`, highlight`${setting.current}`]);
    }
    
    lines.push([muted`Usage:`, command`${SettingCommand.trigger}`, arg`<name>`, arg`<value>`]);
    Chat.instance.whisper(player, ...lines);
  }
  
  #show(player, setting) {
    Chat.instance.whisper(player, [muted`${setting.name}:`, highlight`${setting.current}`]);
  }
  
  #set(player, setting) {
    if (!player.isOp) {
      Chat.instance.whisper(player, error`Only operators can change settings`);
      return;
    }
    
    const parsed = Settings.instance.parse(setting.name, this.#value);
    if (parsed === null) {
      Chat.instance.whisper(player, error`Invalid value for ${setting.name}: ${this.#value}`);
      return;
    }
    
    Settings.instance.apply(setting.name, Change.permanent(parsed));
    Chat.instance.broadcastSuccess(`${setting.name} set to`, highlight`${Settings.instance.get(setting.name).current}`, `by`, highlight`${player.name}`);
  }
}
