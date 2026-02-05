// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, error, command, arg } from "../server/chat.js";
import { Settings } from "../settings/index.js";
import { Change } from "../types/change.js";

export class TimeoutCommand {
  static get trigger() { return "!timeout"; }
  static pattern = new RegExp(`^${TimeoutCommand.trigger}\\s+(\\d+)$`, "i");
  static help = { usage: TimeoutCommand.trigger, description: "View/set poll timeout (Op)" };
  
  #seconds;
  
  constructor(seconds = null) {
    this.#seconds = seconds;
  }
  
  static from(message) {
    const match = message.match(TimeoutCommand.pattern);
    if (match) {
      return new TimeoutCommand(parseInt(match[1], 10));
    }
    
    if (message.toLowerCase() === TimeoutCommand.trigger) {
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
    const timeout = Settings.instance.pollTimeout.current;
    Chat.instance.whisper(player,
      [muted`Poll timeout:`, highlight`${timeout}s`],
      [muted`Usage (Op only):`, command`${TimeoutCommand.trigger}`, arg`<seconds>`]
    );
  }
  
  #set(player) {
    if (!player.isOp) {
      Chat.instance.whisper(player, error`Only operators can change poll timeout`);
      return;
    }
    
    Settings.instance.apply("pollTimeout", Change.permanent(this.#seconds));
    const timeout = Settings.instance.pollTimeout.current;
    Chat.instance.broadcastSuccess(`Poll timeout set to`, highlight`${timeout}s`, `by`, highlight`${player.name}`);
  }
}
