// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";
import { Chat, muted, highlight, success, warning, error, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Ballot } from "./ballot.js";
import { Deadline } from "./deadline.js";
import { Effect } from "./effect.js";

export class TickSpeedPoll {
  #speed;
  #effect;
  #ballot = new Ballot();
  #deadline;
  
  constructor(speed, effectDurationSeconds) {
    this.#speed = speed;
    this.#effect = Effect.temporary(effectDurationSeconds);
    this.#deadline = new Deadline(Server.instance.pollTimeout);
  }
  
  get isExpired() { return this.#deadline.isExpired; }
  get shouldWarn() { return this.#deadline.shouldWarn; }
  
  markWarned() {
    this.#deadline.markWarned();
    Server.instance.speak(`${warning`[FastTick]`} ${this.#deadline.remainingSeconds}s left to vote!`);
  }
  
  announceExpiration() {
    Server.instance.speak(`${error`[FastTick]`} Vote timed out — not enough support`);
  }
  
  conditionChanged() {
    // No-op: tick speed polls don't react to player conditions
  }
  
  vote(player) {
    if (this.isExpired) {
      Server.instance.whisper(player, error`This vote has expired`);
      return;
    }
    
    if (!this.#ballot.cast(player)) {
      Server.instance.whisper(player, warning`You already voted!`);
      return;
    }
    
    if (this.#passed()) {
      this.#resolve();
    } else {
      this.#announce(player);
    }
  }
  
  #passed() {
    const all = Server.instance.allPlayers();
    return all.length > 0 && all.every(p => this.#ballot.has(p.name));
  }
  
  #announce(voter) {
    const needed = Server.instance.playerCount;
    const current = this.#ballot.count;
    
    Server.instance.speak(
      `${success`[FastTick]`} ${highlight`${voter.name}`} voted! ${muted`(${current}/${needed})`}`,
      `${muted`Type`} ${command`!fasttick`} ${muted`to vote.`} ${muted`${this.#deadline.remainingSeconds}s remaining`}`
    );
  }
  
  #resolve() {
    Server.instance.tickSpeed = this.#speed;
    
    Server.instance.speak(`${success`[FastTick]`} Vote passed! Tick speed: ${highlight`${this.#speed}`} for ${this.#effect.durationSeconds}s`);
    
    system.runTimeout(() => this.#effectExpired(), this.#effect.durationSeconds * 20);
    Chat.instance.clearPoll(this);
  }
  
  #effectExpired() {
    Server.instance.tickSpeed = 1;
    Server.instance.speak(`${warning`[FastTick]`} Tick speed returned to normal`);
  }
  
  playerLeft(name) {
    this.#ballot.remove(name);
    
    if (this.#ballot.count > 0) {
      Server.instance.speak(`${warning`[FastTick]`} ${name} left. Vote continues.`);
      
      if (this.#passed()) {
        this.#resolve();
      }
    }
  }
}
