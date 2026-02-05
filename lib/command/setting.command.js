// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, error, success, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { DIFFICULTIES } from "../types/difficulty.js";

export class SettingCommand {
  static get trigger() { return "!setting"; }
  static pattern = new RegExp(`^${SettingCommand.trigger}(?:\\s+(\\w+)(?:\\s+(.+))?)?$`, "i");
  static help = { usage: `${SettingCommand.trigger} <name> [value]`, description: "View/set server settings (Op)" };
  
  #name;
  #value;
  
  constructor(name = null, value = null) {
    this.#name = name?.toLowerCase();
    this.#value = value;
  }
  
  static from(message) {
    const match = message.match(SettingCommand.pattern);
    if (match) {
      return new SettingCommand(match[1], match[2]);
    }
    return null;
  }
  
  execute(player) {
    if (!this.#name) {
      this.#showAll(player);
    } else if (!this.#value) {
      this.#showOne(player);
    } else {
      this.#setOne(player);
    }
  }
  
  #showAll(player) {
    const server = Server.instance;
    const chat = Chat.instance;
    Chat.instance.whisper(player,
      muted`=== Server Settings ===`,
      [muted`timeout:`, highlight`${chat.pollTimeout}s`],
      [muted`difficulty:`, highlight`${server.baseDifficulty}`],
      [muted`Usage:`, command`${SettingCommand.trigger} <name> <value>`]
    );
  }
  
  #showOne(player) {
    const server = Server.instance;
    const chat = Chat.instance;
    
    switch (this.#name) {
      case "timeout":
        chat.whisper(player, [muted`timeout:`, highlight`${chat.pollTimeout}s`]);
        break;
      case "difficulty":
        chat.whisper(player, [muted`difficulty:`, highlight`${server.baseDifficulty}`]);
        break;
      default:
        chat.whisper(player, error`Unknown setting: ${this.#name}`);
    }
  }
  
  #setOne(player) {
    if (!player.isOp) {
      Chat.instance.whisper(player, error`Only operators can change settings`);
      return;
    }
    
    const server = Server.instance;
    const chat = Chat.instance;
    
    switch (this.#name) {
      case "timeout":
        const seconds = parseInt(this.#value, 10);
        if (isNaN(seconds)) {
          chat.whisper(player, error`Invalid timeout: ${this.#value}`);
          return;
        }
        chat.pollTimeout = seconds;
        chat.speak([success`[Server]`, `Poll timeout set to`, highlight`${chat.pollTimeout}s`, `by`, highlight`${player.name}`]);
        break;
        
      case "difficulty":
        const difficulty = this.#value.toLowerCase();
        if (!DIFFICULTIES.includes(difficulty)) {
          chat.whisper(player, error`Invalid difficulty: ${this.#value}`);
          return;
        }
        server.baseDifficulty = difficulty;
        server.recalculateDifficulty();
        chat.speak([success`[Server]`, `Base difficulty set to`, highlight`${difficulty}`, `by`, highlight`${player.name}`]);
        break;
        
      default:
        chat.whisper(player, error`Unknown setting: ${this.#name}`);
    }
  }
}
