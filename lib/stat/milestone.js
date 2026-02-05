// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Chat, bold } from "../server/chat.js";

export class Milestone {
  #stat;
  #threshold;
  
  constructor(stat) {
    this.#stat = stat;
    this.#threshold = null;
  }
  
  get #milestoneKey() {
    return `milestone_${this.#stat.playerName}_${this.#stat.statKey}`;
  }
  
  get #lastMilestone() {
    return Number(world.getDynamicProperty(this.#milestoneKey) ?? 0);
  }
  
  set #lastMilestone(threshold) {
    world.setDynamicProperty(this.#milestoneKey, threshold);
  }
  
  static applies(stat) {
    return true;  // fallback for count-based stats
  }
  
  // Returns the threshold reached, or null if none
  thresholdReached() {
    const count = this.#stat.count;
    const lastCelebrated = this.#lastMilestone;
    
    // Powers of 10: 10, 100, 1000, ...
    for (let threshold = 10; threshold <= 1e9; threshold *= 10) {
      if (count >= threshold && threshold > lastCelebrated) {
        this.#threshold = threshold;
        return threshold;
      }
    }
    return null;
  }
  
  check() {
    if (this.thresholdReached() !== null) {
      this.celebrate();
    }
  }
  celebrate() {
    this.#lastMilestone = this.#threshold;
    
    Chat.instance.celebrate(
      this.#stat.playerName,
      this.#stat.verb,
      bold`${this.#stat.formatted}`,
      this.#stat.noun
    );
  }
}
