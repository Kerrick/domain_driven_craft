// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BlocksBrokenStat } from "../stat/blocks_broken.stat.js";
import { BlocksPlacedStat } from "../stat/blocks_placed.stat.js";
import { DeathsStat } from "../stat/deaths.stat.js";
import { MobKillsStat } from "../stat/mob_kills.stat.js";

export class PlayerStats {
  #blocksBroken;
  #blocksPlaced;
  #deaths;
  #mobKills;
  
  constructor(player) {
    this.#blocksBroken = new BlocksBrokenStat(player);
    this.#blocksPlaced = new BlocksPlacedStat(player);
    this.#deaths = new DeathsStat(player);
    this.#mobKills = new MobKillsStat(player);
  }
  
  get blocksBroken() { return this.#blocksBroken; }
  brokeBlock() { this.#blocksBroken.increment(); }
  get blocksPlaced() { return this.#blocksPlaced; }
  placedBlock() { this.#blocksPlaced.increment(); }
  get deaths() { return this.#deaths; }
  died() { this.#deaths.increment(); }
  get mobKills() { return this.#mobKills; }
  killedMob() { this.#mobKills.increment(); }
  
  all() {
    return [this.#blocksBroken, this.#blocksPlaced, this.#deaths, this.#mobKills];
  }
}
