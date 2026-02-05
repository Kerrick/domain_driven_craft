// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Chat, bold } from "../server/chat.js";

const POWERS_OF_TEN = Array.from({ length: 10 }, (_, i) => 10 ** (i + 1));

export class Milestone {
  #stat;
  #threshold;
  
  constructor(stat, threshold) {
    this.#stat = stat;
    this.#threshold = threshold;
  }
  
  // Key generation
  static #keyFor(stat) {
    return `milestone_${stat.playerName}_${stat.statKey}`;
  }
  
  static applies(stat) {
    return true;  // fallback for count-based stats
  }
  
  // Override in subclasses to provide custom thresholds
  static get thresholds() {
    return POWERS_OF_TEN;
  }
  
  static check(stat) {
    if (!this.applies(stat)) return;
    
    const count = stat.count;
    const lastCelebrated = Number(world.getDynamicProperty(Milestone.#keyFor(stat)) ?? 0);
    
    for (const threshold of this.thresholds) {
      if (count >= threshold && threshold > lastCelebrated) {
        new this(stat, threshold).celebrate();
        return;
      }
    }
  }
  
  celebrate() {
    world.setDynamicProperty(Milestone.#keyFor(this.#stat), this.#threshold);
    
    Chat.instance.celebrate(
      this.#stat.playerName,
      this.#stat.verb,
      bold`${this.#stat.formatted}`,
      this.#stat.noun
    );
  }
}
