// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Milestone } from "./milestone.js";

export class MobKillsMilestone extends Milestone {
  constructor(playerName) {
    super(playerName, "Mob Kills", "mobKills", "slew", "mobs");
  }
}
