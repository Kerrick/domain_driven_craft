// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MILESTONE_CLASSES } from "../milestone/index.js";

export class PlayerStats {
  #playerName;
  #byKey = new Map();
  
  constructor(playerName) {
    this.#playerName = playerName;
    for (const M of MILESTONE_CLASSES) {
      const m = new M(playerName);
      this.#byKey.set(m.statKey, m);
    }
  }
  
  get blocksBroken() { return this.#byKey.get("blocksBroken").asReadonly(); }
  get blocksPlaced() { return this.#byKey.get("blocksPlaced").asReadonly(); }
  get deaths() { return this.#byKey.get("deaths").asReadonly(); }
  get mobKills() { return this.#byKey.get("mobKills").asReadonly(); }
  
  milestones() {
    return Array.from(this.#byKey.values()).map(m => m.asReadonly());
  }
  
  /** @internal */
  _mutableBlocksBroken() { return this.#byKey.get("blocksBroken"); }
  /** @internal */
  _mutableBlocksPlaced() { return this.#byKey.get("blocksPlaced"); }
  /** @internal */
  _mutableDeaths() { return this.#byKey.get("deaths"); }
  /** @internal */
  _mutableMobKills() { return this.#byKey.get("mobKills"); }
}
