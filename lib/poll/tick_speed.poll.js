// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { muted, highlight, success, warning, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Poll } from "./poll.js";

export class TickSpeedPoll extends Poll {
  #speed;
  
  constructor(speed, effectDurationSeconds) {
    super(effectDurationSeconds);
    this.#speed = speed;
  }
  
  get tag() { return "[FastTick]"; }
  
  announceExpiration() {
    Server.instance.speak(`${muted`${this.tag}`} Vote timed out — not enough support`);
  }
  
  announceVote(voter) {
    const needed = Server.instance.playerCount;
    Server.instance.speak(
      [success`${this.tag}`, highlight`${voter.name}`, `voted!`, muted`(${this.voteCount}/${needed})`],
      [muted`Type`, command`!fasttick`, muted`to vote.`, muted`${this.remainingSeconds}s remaining`]
    );
  }
  
  resolve() {
    Server.instance.tickSpeed = this.#speed;
    Server.instance.speak([success`${this.tag}`, `Vote passed! Tick speed:`, highlight`${this.#speed}`, `for ${this.effectDuration}s`]);
  }
  
  effectExpired() {
    Server.instance.tickSpeed = 1;
    Server.instance.speak([warning`${this.tag}`, `Tick speed returned to normal`]);
  }
  
  announcePlayerLeft(name) {
    Server.instance.speak([warning`${this.tag}`, `${name} left. Vote continues.`]);
  }
}
