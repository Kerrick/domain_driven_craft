// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from "../server/chat.js";
import { muted, command, warning } from "../server/styles.js";
// eslint-disable-next-line import/no-cycle -- see doc/contributors/lint.md §1
import { ALL_COMMANDS } from "./registry.js";

export class HelpCommand {
  static get trigger() { return "!help"; }
  static aliases = ["!?"];
  static help = { usage: HelpCommand.trigger, description: "Show this help" };
  
  static from(message) {
    const msg = message.toLowerCase().trim();
    return (msg === HelpCommand.trigger || HelpCommand.aliases.includes(msg))
      ? new HelpCommand() 
      : null;
  }
  
  execute(player) {
    const lines = [warning`=== Commands ===`];
    
    for (const CommandClass of ALL_COMMANDS) {
      if (CommandClass.help) {
        lines.push([command`${CommandClass.help.usage}`, muted`—`, CommandClass.help.description]);
      }
    }
    
    Chat.instance.whisper(player, ...lines);
  }
}
