// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, success, warning, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Poll } from "./poll.js";
import { Change } from "../types/change.js";

export class TickSpeedPoll extends Poll {
  #speed;
  #duration;
  
  constructor(speed, effectDurationSeconds) {
    super();
    this.#speed = speed;
    this.#duration = effectDurationSeconds;
  }
  
  get tag() { return "[FastTick]"; }
  
  announceExpiration() {
    Chat.instance.speak(`${muted`${this.tag}`} Vote timed out — not enough support`);
  }
  
  announceVote(voter) {
    const needed = Server.instance.playerCount;
    Chat.instance.speak(
      [success`${this.tag}`, highlight`${voter.name}`, `voted!`, muted`(${this.voteCount}/${needed})`],
      [muted`Type`, command`!fasttick`, muted`to vote.`, muted`${this.remainingSeconds}s remaining`]
    );
  }
  
  resolve() {
    Server.instance.tickSpeed = Change.temporary(this.#speed, this.#duration);
    Chat.instance.speak([success`${this.tag}`, `Vote passed! Tick speed:`, highlight`${this.#speed}`, `for ${this.#duration}s`]);
  }
  
  announcePlayerLeft(name) {
    Chat.instance.speak([warning`${this.tag}`, `${name} left. Vote continues.`]);
  }
}
