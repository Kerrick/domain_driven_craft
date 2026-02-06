// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Stat } from "./stat.js";

export class DistanceWalkedStat extends Stat {
  constructor(player) {
    // noun is empty because formatted already includes distance units (e.g., "0.5 km" or "500 m")
    super(player, "Distance Walked", "distanceWalked", "walked", "");
  }
  
  get formatted() {
    const km = this.count / 1000;  // stored in blocks (1 block ≈ 1 meter)
    if (km >= 1) {
      return `${km.toFixed(1)} km`;
    }
    return `${this.count} m`;
  }
}
