// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Commands } from "../command/index.js";

// Tagged template functions for semantic styling
export const muted = (strings, ...values) => `§7${String.raw(strings, ...values)}§r`;
export const highlight = (strings, ...values) => `§f${String.raw(strings, ...values)}§r`;
export const success = (strings, ...values) => `§a${String.raw(strings, ...values)}§r`;
export const warning = (strings, ...values) => `§e${String.raw(strings, ...values)}§r`;
export const error = (strings, ...values) => `§c${String.raw(strings, ...values)}§r`;
export const command = (strings, ...values) => `§f${String.raw(strings, ...values)}§r`;
export const bold = (strings, ...values) => `§l${String.raw(strings, ...values)}§r`;

function formatLine(line) {
  return Array.isArray(line) ? line.join(' ') : line;
}

let _instance = null;

export class Chat {
  #commands = new Commands();
  #polls = new Map();
  
  static get instance() {
    return _instance;
  }
  
  static initialize() {
    _instance = new Chat();
    return _instance;
  }
  
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
  
  propose(proposal) {
    let poll = this.#polls.get(proposal.PollClass);
    
    if (!poll) {
      poll = new proposal.PollClass(...proposal.args);
      this.#polls.set(proposal.PollClass, poll);
    }
    
    poll.vote(proposal.player);
    return poll;
  }
  
  poll(PollClass) {
    return this.#polls.get(PollClass);
  }
  
  activePolls() {
    return Array.from(this.#polls.values());
  }
  
  checkPolls() {
    for (const [cls, poll] of this.#polls.entries()) {
      if (poll.isExpired) {
        poll.announceExpiration();
        this.#polls.delete(cls);
      } else if (poll.shouldWarn) {
        poll.markWarned();
      }
    }
  }
  
  clearPoll(poll) {
    for (const [cls, p] of this.#polls.entries()) {
      if (p === poll) {
        this.#polls.delete(cls);
        break;
      }
    }
  }
  
  notifyConditionChange() {
    for (const poll of this.#polls.values()) {
      poll.conditionChanged();
    }
  }
}
