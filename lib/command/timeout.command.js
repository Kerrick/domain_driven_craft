// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { muted, highlight, command } from "../server/chat.js";

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
  
  execute(player, server) {
    if (this.#seconds === null) {
      this.#query(player, server);
    } else {
      this.#set(player, server);
    }
  }
  
  #query(player, server) {
    server.whisper(player,
      `${muted`Poll timeout:`} ${highlight`${server.pollTimeout}`}s`,
      `${muted`Usage (Op only):`} ${command`!timeout <seconds>`}`
    );
  }
  
  #set(player, server) {
    if (!player.isOp) {
      server.whisper(player, `${muted`Only operators can change poll timeout`}`);
      return;
    }
    
    server.pollTimeout = this.#seconds;
    server.speak(`${highlight`[Server]`} Poll timeout set to ${highlight`${server.pollTimeout}`}s by ${highlight`${player.name}`}`);
  }
}
