// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, warning, command } from "../server/chat.js";
import { Server } from "../server/server.js";

export class StatusCommand {
  static triggers = ["!status"];
  
  static from(message) {
    return this.triggers.includes(message.toLowerCase().trim()) 
      ? new StatusCommand() 
      : null;
  }
  
  execute(player) {
    const server = Server.instance;
    const lines = [
      warning`=== Server Status ===`,
      `${muted`Players:`} ${highlight`${server.playerCount}`}`,
      `${muted`Difficulty:`} ${highlight`${server.difficulty}`}`,
      `${muted`Tick speed:`} ${highlight`${server.tickSpeed}`}`
    ];
    
    const polls = Chat.instance.activePolls();
    if (polls.length > 0) {
      lines.push(warning`Active votes:`);
      for (const poll of polls) {
        const name = poll.constructor.name.replace('Poll', '');
        lines.push(`  ${muted`•`} ${name}`);
      }
    }
    
    lines.push(`${muted`Type`} ${command`!help`} ${muted`for commands`}`);
    
    server.whisper(player, ...lines);
  }
}
