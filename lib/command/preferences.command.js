// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from "../server/chat.js";
import { muted, highlight, warning, command } from "../server/styles.js";

export class PreferencesCommand {
  static get trigger() { return "!prefs"; }
  static help = { usage: "!prefs", description: "View your preferences" };
  
  static from(message) {
    return message.toLowerCase().trim() === "!prefs" ? new PreferencesCommand() : null;
  }
  
  execute(player) {
    const lines = [warning`=== Your Preferences ===`];
    
    for (const pref of player.preferences.all()) {
      lines.push([muted`${pref.name}:`, highlight`${pref.formatted}`, muted`—`, command`${pref.command}`]);
    }
    
    Chat.instance.whisper(player, ...lines);
  }
}
