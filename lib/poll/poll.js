// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";
import { Vote } from "./vote.js";
import { temporary } from "./effect.js";

export class Poll {
  #server;
  #tickSpeed;
  #effect;
  #votes = new Map();
  #isActive = true;
  #resetHandle = null;
  
  constructor(server, tickSpeed, durationSeconds) {
    this.#server = server;
    this.#tickSpeed = tickSpeed;
    this.#effect = temporary(durationSeconds);
  }
  
  get isActive() { return this.#isActive; }
  get votes() { return this.#votes; }
  get effect() { return this.#effect; }
  
  vote(player) {
    if (!this.#isActive) {
      this.#server.whisper(player, msg => msg.line(`§eNo active poll.`));
      return;
    }
    
    if (this.#votes.has(player.name)) {
      this.#server.whisper(player, msg => msg.line(`§eYou already voted!`));
      return;
    }
    
    this.#votes.set(player.name, new Vote(player.name));
    
    const needed = this.#server.playerCount;
    const current = this.#votes.size;
    
    if (this.#checkPassed()) {
      this.#resolve();
    } else {
      this.#server.speak(msg => {
        msg.line(`§a[FastTick] §e${player.name}§a voted! §7(${current}/${needed})`);
        msg.line(`§7Type §f!fasttick§7 to vote. Need unanimous.`);
      });
    }
  }
  
  #checkPassed() {
    const allPlayers = this.#server.allPlayers();
    return allPlayers.length > 0 && allPlayers.every(p => this.#votes.has(p.name));
  }
  
  #resolve() {
    this.#isActive = false;
    
    const speed = this.#tickSpeed;
    const duration = this.#effect.durationSeconds;
    
    this.#server.settings.tickSpeed = speed;
    this.#server.speak(msg => {
      msg.line(`§a§l[FastTick] §r§aVote passed! Tick speed: §e${speed}§a for ${duration}s`);
    });
    
    this.#resetHandle = system.runTimeout(() => this.#expire(), duration * 20);
  }
  
  #expire() {
    this.#server.settings.tickSpeed = 1;
    this.#server.speak(msg => msg.line(`§e[FastTick] Tick speed returned to normal`));
    this.#server.clearPoll();
  }
  
  playerLeft(name) {
    if (this.#votes.has(name)) {
      this.#votes.delete(name);
    }
    
    if (this.#isActive && this.#votes.size > 0) {
      this.#server.speak(msg => msg.line(`§e[FastTick] ${name} left. Vote continues.`));
      
      if (this.#checkPassed()) {
        this.#resolve();
      }
    }
  }
}
