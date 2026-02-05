// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { muted, highlight, error, success, command } from "../server/chat.js";
import { Server } from "../server/server.js";

export class TimeoutCommand {
  static pattern = /^!timeout\s+(\d+)$/i;
  
  #seconds;
  
  constructor(seconds = null) {
    this.#seconds = seconds;
  }
  
  static from(message) {
    const match = message.match(TimeoutCommand.pattern);
    if (match) {
      return new TimeoutCommand(parseInt(match[1], 10));
    }
    
    if (message.toLowerCase() === "!timeout") {
      return new TimeoutCommand();
    }
    
    return null;
  }
  
  execute(player) {
    if (this.#seconds === null) {
      this.#query(player);
    } else {
      this.#set(player);
    }
  }
  
  #query(player) {
    const server = Server.instance;
    server.whisper(player,
      [muted`Poll timeout:`, highlight`${server.pollTimeout}s`],
      [muted`Usage (Op only):`, command`!timeout <seconds>`]
    );
  }
  
  #set(player) {
    if (!player.isOp) {
      Server.instance.whisper(player, error`Only operators can change poll timeout`);
      return;
    }
    
    const server = Server.instance;
    server.pollTimeout = this.#seconds;
    server.speak([success`[Server]`, `Poll timeout set to`, highlight`${server.pollTimeout}s`, `by`, highlight`${player.name}`]);
  }
}
