// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Milestone } from "./milestone.js";
import { TimeMilestone } from "./time.milestone.js";
import { DistanceMilestone } from "./distance.milestone.js";

const TYPES = [TimeMilestone, DistanceMilestone, Milestone];

export class Milestones {
  static check(stat) {
    for (const M of TYPES) {
      if (M.applies(stat) && M.isReached(stat)) {
        new M(stat).celebrate();
        return;
      }
    }
  }
}
