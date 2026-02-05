// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";
import { Chat, muted, highlight, success, bold, command } from "./chat.js";
import { Server } from "./server.js";
import { Settings } from "../settings/index.js";

export class Welcome {
  greet(player) {
    system.runTimeout(() => {
      const server = Server.instance;
      const settings = Settings.instance;
      const lines = [
        success`${bold`★ Welcome to ${server.name}! ★`}`,
        [muted`Difficulty:`, highlight`${settings.difficulty.current}`, muted`Tick:`, highlight`${settings.tickSpeed.current}`]
      ];
      
      const polls = Chat.instance.activePolls();
      if (polls.length > 0) {
        lines.push(muted`Active votes:`);
        for (const poll of polls) {
          const name = poll.constructor.name.replace('Poll', '');
          lines.push([muted`  •`, name]);
        }
      }
      
      lines.push([muted`Type`, command`!help`, muted`for commands`]);
      
      Chat.instance.whisper(player, ...lines);
    }, 40);
  }
}
