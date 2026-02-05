// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, warning, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Settings } from "../settings/index.js";

export class StatusCommand {
  static get trigger() { return "!status"; }
  static help = { usage: StatusCommand.trigger, description: "Show server status" };
  
  static from(message) {
    return message.toLowerCase().trim() === StatusCommand.trigger
      ? new StatusCommand() 
      : null;
  }
  
  execute(player) {
    const server = Server.instance;
    const settings = Settings.instance;
    const lines = [
      warning`=== Server Status ===`,
      [muted`Players:`, highlight`${server.playerCount}`],
      [muted`Difficulty:`, highlight`${settings.difficulty.current}`],
      [muted`Tick speed:`, highlight`${settings.tickSpeed.current}`]
    ];
    
    const polls = Chat.instance.activePolls();
    if (polls.length > 0) {
      lines.push(warning`Active votes:`);
      for (const poll of polls) {
        const name = poll.constructor.name.replace('Poll', '');
        lines.push([muted`  •`, name]);
      }
    }
    
    lines.push([muted`Type`, command`!help`, muted`for commands`]);
    
    Chat.instance.whisper(player, ...lines);
  }
}
