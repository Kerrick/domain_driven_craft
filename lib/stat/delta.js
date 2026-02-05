// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { TimeMilestone } from "./time.milestone.js";
import { DistanceMilestone } from "./distance.milestone.js";
import { Milestone } from "./milestone.js";

const TYPES = [TimeMilestone, DistanceMilestone, Milestone];

export class Delta {
  #stat;
  
  constructor(stat) {
    this.#stat = stat;
  }
  
  check() {
    for (const M of TYPES) {
      M.check(this.#stat);
    }
  }
}
