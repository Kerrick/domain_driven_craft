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
        msg.line(msg.success(msg.bold(`★ Welcome to Kerrick's Bedrock Server! ★`)));
        msg.line(`${msg.muted('Difficulty:')} ${msg.highlight(this.#server.difficulty)}, ${msg.muted('Tick:')} ${msg.highlight(this.#server.tickSpeed)}`);
        msg.line(`${msg.muted('Type')} ${msg.command('!help')} ${msg.muted('for commands')}`);
      });
    }, 40);
  }
}
