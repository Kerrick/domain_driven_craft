// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Milestone } from "./milestone.js";

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
  static applies(stat) {
    return stat.statKey === "playTime";
  }
  
  static get thresholds() {
    return THRESHOLDS;
  }
}
