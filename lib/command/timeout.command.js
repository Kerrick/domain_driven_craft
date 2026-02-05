// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, error, success, command } from "../server/chat.js";

export class TimeoutCommand {
  static pattern = /^!timeout\s+(\d+)$/i;
  static help = { usage: "!timeout", description: "View/set poll timeout (Op)" };
  
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
    const chat = Chat.instance;
    chat.whisper(player,
      [muted`Poll timeout:`, highlight`${chat.pollTimeout}s`],
      [muted`Usage (Op only):`, command`!timeout <seconds>`]
    );
  }
  
  #set(player) {
    if (!player.isOp) {
      Chat.instance.whisper(player, error`Only operators can change poll timeout`);
      return;
    }
    
    const chat = Chat.instance;
    chat.pollTimeout = this.#seconds;
    chat.speak([success`[Server]`, `Poll timeout set to`, highlight`${chat.pollTimeout}s`, `by`, highlight`${player.name}`]);
  }
}
