// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Milestone } from "./milestone.js";
import { DistanceWalkedStat } from "./distance_walked.stat.js";

// Distance thresholds in blocks (1 block ≈ 1 meter)
const THRESHOLDS = [1000, 10000, 100000, 1000000];  // 1km, 10km, 100km, 1000km

export class DistanceMilestone extends Milestone {
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
    return stat instanceof DistanceWalkedStat;
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
