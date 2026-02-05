// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, command, warning } from "../server/chat.js";
import { Commands } from "./commands.js";

export class HelpCommand {
  static triggers = ["!help", "!?"];
  static help = { usage: "!help", description: "Show this help" };
  
  static from(message) {
    return this.triggers.includes(message.toLowerCase().trim()) 
      ? new HelpCommand() 
      : null;
  }
  
  execute(player) {
    const lines = [warning`=== Commands ===`];
    
    for (const CommandClass of Commands.all) {
      if (CommandClass.help) {
        lines.push([command`${CommandClass.help.usage}`, muted`—`, CommandClass.help.description]);
      }
    }
    
    Chat.instance.whisper(player, ...lines);
  }
}
