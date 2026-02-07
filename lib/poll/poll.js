// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later


import { Chat } from "../server/chat.js";
import { error, warning } from "../server/styles.js";
import { Server } from "../server/server.js";
import { Settings } from "../settings/index.js";
import { Ballot } from "./ballot.js";
import { Deadline } from "./deadline.js";

export class Poll {
  #ballot = new Ballot();
  #deadline;
  
  constructor() {
    this.#deadline = new Deadline(Settings.instance.pollTimeout.current);
  }
  
  get isExpired() { return this.#deadline.isExpired; }
  get shouldWarn() { return this.#deadline.shouldWarn; }
  get remainingSeconds() { return this.#deadline.remainingSeconds; }
  get voteCount() { return this.#ballot.count; }
  
  // Template methods - subclasses override
  get tag() { throw new Error("Subclass must implement tag"); }
  conditionChanged() { this.#checkResolution(); }
  announceExpiration() { throw new Error("Subclass must implement announceExpiration"); }
  announceVote(_voter) { throw new Error("Subclass must implement announceVote"); }
  resolve() { throw new Error("Subclass must implement resolve"); }
  announcePlayerLeft(_name) { throw new Error("Subclass must implement announcePlayerLeft"); }
  
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
    
    this.#checkResolution() || this.announceVote(player);
  }
  
  #passed() {
    const eligible = [...Server.instance.allPlayers()].filter(p => !p.abstains);
    return eligible.length > 0 && eligible.every(p => this.#ballot.has(p.name));
  }
  
  #checkResolution() {
    if (this.#passed()) {
      this.resolve();
      Chat.instance.clearPoll(this);
      return true;
    }
    return false;
  }
  
  playerLeft(name) {
    this.#ballot.remove(name);
    
    if (this.voteCount > 0) {
      this.announcePlayerLeft(name);
      this.#checkResolution();
    }
  }
  
  hasVote(name) {
    return this.#ballot.has(name);
  }
}
