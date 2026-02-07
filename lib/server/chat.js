// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Singleton } from "../types/singleton.js";
import { Polls } from "./polls.js";

// Re-export styles for convenience
export { muted, highlight, success, warning, error, command, arg, bold } from "./styles.js";
import { success, warning, highlight, bold } from "./styles.js";

function formatLine(line) {
  return Array.isArray(line) ? line.join(' ') : line;
}

export class Chat extends Singleton {
  #polls = new Polls();
  
  whisper(player, ...lines) {
    for (const line of lines) {
      player.sendMessage(formatLine(line));
    }
  }
  
  speak(...lines) {
    for (const line of lines) {
      world.sendMessage(formatLine(line));
    }
  }
  
  broadcastWarning(...messageParts) {
    this.speak([warning`[Server]`, ...messageParts]);
  }
  
  broadcastSuccess(...messageParts) {
    this.speak([success`[Server]`, ...messageParts]);
  }
  
  celebrate(tag, ...messageParts) {
    this.speak([success`${bold`★`}`, highlight`${tag}`, ...messageParts, success`${bold`★`}`]);
  }
  
  // Delegation to Polls
  propose(proposal) { return this.#polls.propose(proposal); }
  poll(PollClass) { return this.#polls.get(PollClass); }
  activePolls() { return this.#polls.active(); }
  checkPolls() { this.#polls.check(); }
  clearPoll(poll) { this.#polls.clear(poll); }
  notifyConditionChange() { this.#polls.notifyConditionChange(); }
}
