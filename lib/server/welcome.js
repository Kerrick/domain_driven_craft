// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";
import { muted, highlight, success, bold, command } from "../server/chat.js";

export class Welcome {
  #server;
  
  constructor(server) {
    this.#server = server;
  }
  
  greet(player) {
    system.runTimeout(() => {
      const lines = [
        success`${bold`★ Welcome to Kerrick's Bedrock Server! ★`}`,
        `${muted`Difficulty:`} ${highlight`${this.#server.difficulty}`}, ${muted`Tick:`} ${highlight`${this.#server.tickSpeed}`}`
      ];
      
      const polls = this.#server.activePolls();
      if (polls.length > 0) {
        lines.push(`${muted`Active votes:`}`);
        for (const poll of polls) {
          const name = poll.constructor.name.replace('Poll', '');
          lines.push(`  ${muted`•`} ${name}`);
        }
      }
      
      lines.push(`${muted`Type`} ${command`!help`} ${muted`for commands`}`);
      
      this.#server.whisper(player, ...lines);
    }, 40);
  }
}
