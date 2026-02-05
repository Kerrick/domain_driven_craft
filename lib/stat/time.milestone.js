// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Milestone } from "./milestone.js";
import { PlayTimeStat } from "./play_time.stat.js";

// Human-meaningful time milestones
const THRESHOLDS = [
//  Day   Hr   Min  Sec
           1 * 60 * 60, // 1 hour
          12 * 60 * 60, // 12 hours
          24 * 60 * 60, // 1 day
    7   * 24 * 60 * 60, // 1 week
    30  * 24 * 60 * 60, // 1 month (~30 days)
    365 * 24 * 60 * 60  // 1 year
];

export class TimeMilestone extends Milestone {
  #stat;
  #threshold;
  
  constructor(stat) {
    super(stat);
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
    return stat instanceof PlayTimeStat;
  }
  
  thresholdReached() {
    const count = this.#stat.count;
    const lastCelebrated = this.#lastMilestone;
    
    for (const threshold of THRESHOLDS) {
      if (count >= threshold && threshold > lastCelebrated) {
        this.#threshold = threshold;
        return threshold;
      }
    }
    return null;
  }
  
  celebrate() {
    this.#lastMilestone = this.#threshold;
    super.celebrate();
  }
}
