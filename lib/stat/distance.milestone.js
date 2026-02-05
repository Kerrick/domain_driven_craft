// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Milestone } from "./milestone.js";
import { DistanceWalkedStat } from "./distance_walked.stat.js";

export class DistanceMilestone extends Milestone {
  static applies(stat) {
    return stat instanceof DistanceWalkedStat;
  }
  
  static isReached(stat) {
    const km = [1000, 10000, 100000, 1000000];  // 1km, 10km, 100km, 1000km in blocks
    return km.includes(stat.count);
  }
}
