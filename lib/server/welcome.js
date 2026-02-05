// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";

export class Welcome {
  #server;
  
  constructor(server) {
    this.#server = server;
  }
  
  greet(player) {
    system.runTimeout(() => {
      this.#server.whisper(player, msg => {
        msg.line(`§a§l★ Welcome to Kerrick's Bedrock Server! ★`);
        msg.line(`§7Difficulty: §f${this.#server.settings.difficulty}§7, Tick: §f${this.#server.settings.tickSpeed}`);
        msg.line(`§7Type §f!help§7 for commands`);
      });
    }, 40);
  }
}
