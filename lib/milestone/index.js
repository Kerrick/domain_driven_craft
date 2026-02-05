// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BlocksBrokenMilestone } from "./blocks_broken.milestone.js";
import { BlocksPlacedMilestone } from "./blocks_placed.milestone.js";
import { DeathsMilestone } from "./deaths.milestone.js";
import { MobKillsMilestone } from "./mob_kills.milestone.js";

export { Milestone } from "./milestone.js";
export { BlocksBrokenMilestone } from "./blocks_broken.milestone.js";
export { BlocksPlacedMilestone } from "./blocks_placed.milestone.js";
export { DeathsMilestone } from "./deaths.milestone.js";
export { MobKillsMilestone } from "./mob_kills.milestone.js";

export const MILESTONE_CLASSES = [
  BlocksBrokenMilestone,
  BlocksPlacedMilestone,
  DeathsMilestone,
  MobKillsMilestone
];

export const Milestones = {
  subscribeAll() {
    for (const M of MILESTONE_CLASSES) {
      M.subscribe();
    }
  }
};
