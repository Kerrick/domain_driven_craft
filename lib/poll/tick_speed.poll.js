// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";
import { muted, highlight, success, warning, error, command } from "../server/chat.js";
import { Ballot } from "./ballot.js";
import { Deadline } from "./deadline.js";
import { Effect } from "./effect.js";

export class TickSpeedPoll {
  #server;
  #speed;
  #effect;
  #ballot = new Ballot();
  #deadline;
  
  constructor(server, speed, effectDurationSeconds) {
    this.#server = server;
    this.#speed = speed;
    this.#effect = Effect.temporary(effectDurationSeconds);
    this.#deadline = new Deadline(server.pollTimeout);
  }
  
  get isExpired() { return this.#deadline.isExpired; }
  get shouldWarn() { return this.#deadline.shouldWarn; }
  
  markWarned() {
    this.#deadline.markWarned();
    this.#server.speak(`${warning`[FastTick]`} ${this.#deadline.remainingSeconds}s left to vote!`);
  }
  
  announceExpiration() {
    this.#server.speak(`${error`[FastTick]`} Vote timed out — not enough support`);
  }
  
  vote(player) {
    if (this.isExpired) {
      this.#server.whisper(player, error`This vote has expired`);
      return;
    }
    
    if (!this.#ballot.cast(player)) {
      this.#server.whisper(player, warning`You already voted!`);
      return;
    }
    
    if (this.#passed()) {
      this.#resolve();
    } else {
      this.#announce(player);
    }
  }
  
  #passed() {
    const all = this.#server.allPlayers();
    return all.length > 0 && all.every(p => this.#ballot.has(p.name));
  }
  
  #announce(voter) {
    const needed = this.#server.playerCount;
    const current = this.#ballot.count;
    
    this.#server.speak(
      `${success`[FastTick]`} ${highlight`${voter.name}`} voted! ${muted`(${current}/${needed})`}`,
      `${muted`Type`} ${command`!fasttick`} ${muted`to vote.`} ${muted`${this.#deadline.remainingSeconds}s remaining`}`
    );
  }
  
  #resolve() {
    this.#server.tickSpeed = this.#speed;
    
    this.#server.speak(`${success`[FastTick]`} Vote passed! Tick speed: ${highlight`${this.#speed}`} for ${this.#effect.durationSeconds}s`);
    
    system.runTimeout(() => this.#effectExpired(), this.#effect.durationSeconds * 20);
    this.#server.clearPoll(this);
  }
  
  #effectExpired() {
    this.#server.tickSpeed = 1;
    this.#server.speak(`${warning`[FastTick]`} Tick speed returned to normal`);
  }
  
  playerLeft(name) {
    this.#ballot.remove(name);
    
    if (this.#ballot.count > 0) {
      this.#server.speak(`${warning`[FastTick]`} ${name} left. Vote continues.`);
      
      if (this.#passed()) {
        this.#resolve();
      }
    }
  }
}
