// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BlocksBrokenStat } from '../stat/blocks_broken.stat.js'
import { BlocksPlacedStat } from '../stat/blocks_placed.stat.js'
import { DeathsStat } from '../stat/deaths.stat.js'
import { MobKillsStat } from '../stat/mob_kills.stat.js'
import { PlayTimeStat } from '../stat/play_time.stat.js'
import { DistanceWalkedStat } from '../stat/distance_walked.stat.js'

export class PlayerStats {
  #blocksBroken
  #blocksPlaced
  #deaths
  #mobKills
  #playTime
  #distanceWalked

  constructor(player) {
    this.#blocksBroken = new BlocksBrokenStat(player)
    this.#blocksPlaced = new BlocksPlacedStat(player)
    this.#deaths = new DeathsStat(player)
    this.#mobKills = new MobKillsStat(player)
    this.#playTime = new PlayTimeStat(player)
    this.#distanceWalked = new DistanceWalkedStat(player)
  }

  get blocksBroken() { return this.#blocksBroken }
  get blocksPlaced() { return this.#blocksPlaced }
  get deaths() { return this.#deaths }
  get mobKills() { return this.#mobKills }
  get playTime() { return this.#playTime }
  get distanceWalked() { return this.#distanceWalked }

  all() {
    return [
      this.#blocksBroken,
      this.#blocksPlaced,
      this.#deaths,
      this.#mobKills,
      this.#playTime,
      this.#distanceWalked,
    ]
  }
}
