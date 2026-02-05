// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { system } from "@minecraft/server";
import { Ballot } from "./ballot.js";
import { Effect } from "./effect.js";

export class TickSpeedPoll {
  #server;
  #speed;
  #effect;
  #ballot = new Ballot();
  
  constructor(server, speed, durationSeconds) {
    this.#server = server;
    this.#speed = speed;
    this.#effect = Effect.temporary(durationSeconds);
  }
  
  vote(player) {
    if (!this.#ballot.cast(player)) {
      this.#server.whisper(player, msg => msg.line(msg.warning('You already voted!')));
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
    
    this.#server.speak(msg => {
      msg.line(`${msg.success('[FastTick]')} ${msg.highlight(voter.name)} voted! ${msg.muted(`(${current}/${needed})`)}`);
      msg.line(`${msg.muted('Type')} ${msg.command('!fasttick')} ${msg.muted('to vote. Need unanimous.')}`);
    });
  }
  
  #resolve() {
    this.#server.tickSpeed = this.#speed;
    
    this.#server.speak(msg => {
      msg.line(`${msg.success(msg.bold('[FastTick]'))} Vote passed! Tick speed: ${msg.highlight(this.#speed)} for ${this.#effect.durationSeconds}s`);
    });
    
    system.runTimeout(() => this.#expire(), this.#effect.durationSeconds * 20);
  }
  
  #expire() {
    this.#server.tickSpeed = 1;
    this.#server.speak(msg => msg.line(`${msg.warning('[FastTick]')} Tick speed returned to normal`));
    this.#server.clearPoll(this);
  }
  
  playerLeft(name) {
    this.#ballot.remove(name);
    
    if (this.#ballot.count > 0) {
      this.#server.speak(msg => msg.line(`${msg.warning('[FastTick]')} ${name} left. Vote continues.`));
      
      if (this.#passed()) {
        this.#resolve();
      }
    } else {
      this.#server.clearPoll(this);
    }
  }
}
