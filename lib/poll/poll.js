// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";
import { Chat, error, warning } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Ballot } from "./ballot.js";
import { Deadline } from "./deadline.js";
import { Effect } from "./effect.js";

export class Poll {
  #ballot = new Ballot();
  #deadline;
  #effect;
  
  constructor(effectDurationSeconds) {
    this.#deadline = new Deadline(Chat.instance.pollTimeout);
    this.#effect = Effect.temporary(effectDurationSeconds);
  }
  
  get isExpired() { return this.#deadline.isExpired; }
  get shouldWarn() { return this.#deadline.shouldWarn; }
  get remainingSeconds() { return this.#deadline.remainingSeconds; }
  get effectDuration() { return this.#effect.durationSeconds; }
  get voteCount() { return this.#ballot.count; }
  
  // Template methods - subclasses override
  get tag() { throw new Error("Subclass must implement tag"); }
  conditionChanged() { /* no-op by default */ }
  announceExpiration() { throw new Error("Subclass must implement announceExpiration"); }
  announceVote(voter) { throw new Error("Subclass must implement announceVote"); }
  resolve() { throw new Error("Subclass must implement resolve"); }
  announcePlayerLeft(name) { throw new Error("Subclass must implement announcePlayerLeft"); }
  
  markWarned() {
    this.#deadline.markWarned();
    Chat.instance.speak(`${warning`${this.tag}`} ${this.remainingSeconds}s left to vote!`);
  }
  
  vote(player) {
    if (this.isExpired) {
      Chat.instance.whisper(player, error`This vote has expired`);
      return;
    }
    
    if (!this.#ballot.cast(player)) {
      Chat.instance.whisper(player, warning`You already voted!`);
      return;
    }
    
    if (this.#passed()) {
      this.#doResolve();
    } else {
      this.announceVote(player);
    }
  }
  
  #passed() {
    const all = Server.instance.allPlayers();
    return all.length > 0 && all.every(p => this.#ballot.has(p.name));
  }
  
  #doResolve() {
    this.resolve();
    system.runTimeout(() => this.effectExpired(), this.effectDuration * 20);
    Chat.instance.clearPoll(this);
  }
  
  effectExpired() { throw new Error("Subclass must implement effectExpired"); }
  
  playerLeft(name) {
    this.#ballot.remove(name);
    
    if (this.voteCount > 0) {
      this.announcePlayerLeft(name);
      
      if (this.#passed()) {
        this.#doResolve();
      }
    }
  }
  
  hasVote(name) {
    return this.#ballot.has(name);
  }
}
