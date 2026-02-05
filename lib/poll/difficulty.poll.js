// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, success, warning, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Poll } from "./poll.js";

export class DifficultyPoll extends Poll {
  #targetDifficulty;
  
  constructor(targetDifficulty, effectDurationSeconds) {
    super(effectDurationSeconds);
    this.#targetDifficulty = targetDifficulty;
  }
  
  get tag() { return "[Difficulty]"; }
  get targetDifficulty() { return this.#targetDifficulty; }
  
  conditionChanged() {
    const needsPeaceful = Server.instance.allPlayers().some(p => p.preferences.peaceful);
    
    if (needsPeaceful && this.#targetDifficulty !== "peaceful") {
      Server.instance.speak([warning`${this.tag}`, `Peaceful player joined, vote cancelled`]);
      Chat.instance.clearPoll(this);
      Server.instance.recalculateDifficulty();
    }
  }
  
  announceExpiration() {
    Server.instance.speak([muted`${this.tag}`, `Vote for`, highlight`${this.#targetDifficulty}`, `timed out`]);
  }
  
  announceVote(voter) {
    const needed = Server.instance.playerCount;
    Server.instance.speak(
      [success`${this.tag}`, highlight`${voter.name}`, `voted for`, highlight`${this.#targetDifficulty}`, muted`(${this.voteCount}/${needed})`],
      [muted`Type`, command`!difficulty ${this.#targetDifficulty}`, muted`to vote.`, muted`${this.remainingSeconds}s remaining`]
    );
  }
  
  resolve() {
    Server.instance.difficulty = this.#targetDifficulty;
    Server.instance.speak([success`${this.tag}`, `Vote passed! Difficulty:`, highlight`${this.#targetDifficulty}`, `for ${this.effectDuration}s`]);
  }
  
  effectExpired() {
    Server.instance.speak([warning`${this.tag}`, `Override expired, recalculating...`]);
    Server.instance.recalculateDifficulty();
  }
  
  announcePlayerLeft(name) {
    Server.instance.speak([warning`${this.tag}`, `${name} left. Vote continues.`]);
  }
}
