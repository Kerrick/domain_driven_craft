// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";
import { muted, highlight, success, warning, error, command } from "../server/chat.js";
import { Ballot } from "./ballot.js";
import { Deadline } from "./deadline.js";
import { Effect } from "./effect.js";

export class DifficultyPoll {
  #server;
  #targetDifficulty;
  #effect;
  #ballot = new Ballot();
  #deadline;
  
  constructor(server, targetDifficulty, effectDurationSeconds) {
    this.#server = server;
    this.#targetDifficulty = targetDifficulty;
    this.#effect = Effect.temporary(effectDurationSeconds);
    this.#deadline = new Deadline(server.pollTimeout);
  }
  
  get targetDifficulty() { return this.#targetDifficulty; }
  get isExpired() { return this.#deadline.isExpired; }
  get shouldWarn() { return this.#deadline.shouldWarn; }
  
  markWarned() {
    this.#deadline.markWarned();
    this.#server.speak(`${warning`[Difficulty]`} ${this.#deadline.remainingSeconds}s left to vote!`);
  }
  
  announceExpiration() {
    this.#server.speak(`${error`[Difficulty]`} Vote for ${highlight`${this.#targetDifficulty}`} timed out`);
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
      `${success`[Difficulty]`} ${highlight`${voter.name}`} voted for ${highlight`${this.#targetDifficulty}`}! ${muted`(${current}/${needed})`}`,
      `${muted`Type`} ${command`!difficulty ${this.#targetDifficulty}`} ${muted`to vote.`} ${muted`${this.#deadline.remainingSeconds}s remaining`}`
    );
  }
  
  #resolve() {
    this.#server.difficulty = this.#targetDifficulty;
    
    this.#server.speak(`${success`[Difficulty]`} Vote passed! Difficulty: ${highlight`${this.#targetDifficulty}`} for ${this.#effect.durationSeconds}s`);
    
    system.runTimeout(() => this.#effectExpired(), this.#effect.durationSeconds * 20);
    this.#server.clearPoll(this);
  }
  
  #effectExpired() {
    this.#server.speak(`${warning`[Difficulty]`} Override expired, recalculating...`);
    this.#server.recalculateDifficulty();
  }
  
  conditionChanged() {
    const needsPeaceful = this.#server.allPlayers().some(p => p.preferences.peaceful);
    
    if (needsPeaceful && this.#targetDifficulty !== "peaceful") {
      this.#server.speak(`${warning`[Difficulty]`} Peaceful player joined, vote cancelled`);
      this.#server.clearPoll(this);
      this.#server.recalculateDifficulty();
    }
  }
  
  playerLeft(name) {
    this.#ballot.remove(name);
    
    if (this.#ballot.count > 0) {
      this.#server.speak(`${warning`[Difficulty]`} ${name} left. Vote continues.`);
      
      if (this.#passed()) {
        this.#resolve();
      }
    }
  }
}
