// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Stat } from "../stat/stat";

export declare class PlayerStats {
  constructor(player: import("./player").Player);
  
  readonly blocksBroken: Stat;
  readonly blocksPlaced: Stat;
  readonly deaths: Stat;
  readonly mobKills: Stat;
  readonly playTime: Stat;
  readonly distanceWalked: Stat;
  
  all(): Stat[];
}
