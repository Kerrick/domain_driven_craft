// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, success, warning, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Poll } from "./poll.js";
import { Change } from "../types/change.js";

export class DifficultyPoll extends Poll {
  #targetDifficulty;
  #duration;
  
  constructor(targetDifficulty, effectDurationSeconds) {
    super();
    this.#targetDifficulty = targetDifficulty;
    this.#duration = effectDurationSeconds;
  }
  
  get tag() { return "[Difficulty]"; }
  get targetDifficulty() { return this.#targetDifficulty; }
  
  conditionChanged() {
    const needsPeaceful = Server.instance.allPlayers().some(p => p.preferences.peaceful);
    
    if (needsPeaceful && this.#targetDifficulty !== "peaceful") {
      Chat.instance.speak([warning`${this.tag}`, `Peaceful player joined, vote cancelled`]);
      Chat.instance.clearPoll(this);
      Server.instance.recalculateDifficulty();
    }
  }
  
  announceExpiration() {
    Chat.instance.speak([muted`${this.tag}`, `Vote for`, highlight`${this.#targetDifficulty}`, `timed out`]);
  }
  
  announceVote(voter) {
    const needed = Server.instance.playerCount;
    Chat.instance.speak(
      [success`${this.tag}`, highlight`${voter.name}`, `voted for`, highlight`${this.#targetDifficulty}`, muted`(${this.voteCount}/${needed})`],
      [muted`Type`, command`!difficulty ${this.#targetDifficulty}`, muted`to vote.`, muted`${this.remainingSeconds}s remaining`]
    );
  }
  
  resolve() {
    Server.instance.difficulty.apply(Change.temporary(this.#targetDifficulty, this.#duration));
    Chat.instance.speak([success`${this.tag}`, `Vote passed! Difficulty:`, highlight`${this.#targetDifficulty}`, `for ${this.#duration}s`]);
  }
  
  announcePlayerLeft(name) {
    Chat.instance.speak([warning`${this.tag}`, `${name} left. Vote continues.`]);
  }
}
