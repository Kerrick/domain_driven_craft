// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Stat } from "./stat.js";

export class PlayTimeStat extends Stat {
  constructor(player) {
    super(player, "Play Time", "playTime", "played for", "hours");
  }
  
  get formatted() {
    const totalSeconds = this.count;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
}
