// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Singleton } from "../types/singleton.js";
import { Commands } from "../command/index.js";
import { Polls } from "./polls.js";

// Tagged template functions for semantic styling
export const muted = (strings, ...values) => `§7${String.raw(strings, ...values)}§r`;
export const highlight = (strings, ...values) => `§f${String.raw(strings, ...values)}§r`;
export const success = (strings, ...values) => `§a${String.raw(strings, ...values)}§r`;
export const warning = (strings, ...values) => `§e${String.raw(strings, ...values)}§r`;
export const error = (strings, ...values) => `§c${String.raw(strings, ...values)}§r`;
export const command = (strings, ...values) => `§f${String.raw(strings, ...values)}§r`;
export const arg = (strings, ...values) => `§b${String.raw(strings, ...values)}§r`;
export const bold = (strings, ...values) => `§l${String.raw(strings, ...values)}§r`;

function formatLine(line) {
  return Array.isArray(line) ? line.join(' ') : line;
}

export class Chat extends Singleton {
  #commands = new Commands();
  #polls = new Polls();
  
  hear(message) {
    return this.#commands.for(message);
  }
  
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
  
  // Delegation to Polls
  propose(proposal) { return this.#polls.propose(proposal); }
  poll(PollClass) { return this.#polls.get(PollClass); }
  activePolls() { return this.#polls.active(); }
  checkPolls() { this.#polls.check(); }
  clearPoll(poll) { this.#polls.clear(poll); }
  notifyConditionChange() { this.#polls.notifyConditionChange(); }
}
