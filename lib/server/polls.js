// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";

const DEFAULT_TIMEOUT = 90;
const TIMEOUT_KEY = "poll_timeout";

export class Polls {
  #registry = new Map();
  
  get timeout() {
    return world.getDynamicProperty(TIMEOUT_KEY) ?? DEFAULT_TIMEOUT;
  }
  
  set timeout(value) {
    world.setDynamicProperty(TIMEOUT_KEY, Math.max(30, Math.min(300, value)));
  }
  
  propose(proposal) {
    let poll = this.#registry.get(proposal.PollClass);
    
    if (!poll) {
      poll = new proposal.PollClass(...proposal.args);
      this.#registry.set(proposal.PollClass, poll);
    }
    
    poll.vote(proposal.player);
    return poll;
  }
  
  get(PollClass) {
    return this.#registry.get(PollClass);
  }
  
  active() {
    return Array.from(this.#registry.values());
  }
  
  check() {
    for (const [cls, poll] of this.#registry.entries()) {
      if (poll.isExpired) {
        poll.announceExpiration();
        this.#registry.delete(cls);
      } else if (poll.shouldWarn) {
        poll.markWarned();
      }
    }
  }
  
  clear(poll) {
    for (const [cls, p] of this.#registry.entries()) {
      if (p === poll) {
        this.#registry.delete(cls);
        break;
      }
    }
  }
  
  notifyConditionChange() {
    for (const poll of this.#registry.values()) {
      poll.conditionChanged();
    }
  }
}
