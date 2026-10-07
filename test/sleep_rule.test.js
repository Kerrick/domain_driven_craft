// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect, beforeEach } from 'vitest'
import { world } from '@minecraft/server'
import { SleepRule } from '../lib/server/sleep_rule.js'

const here = (isAfk) => ({ isAfk, isInOverworld: true })
const elsewhere = () => ({ isAfk: false, isInOverworld: false })

function serverWith(players) {
  return {
    allPlayers: () => new Set(players),
    overworldPlayers: () => new Set(players.filter((p) => p.isInOverworld)),
  }
}

// How many sleepers the engine demands once it applies its own rounding.
function sleepersDemanded(counted) {
  const percentage = world.gameRules.playersSleepingPercentage
  return Math.ceil((counted * percentage) / 100)
}

describe('SleepRule', () => {
  beforeEach(() => {
    world.gameRules.playersSleepingPercentage = 100
  })

  it('leaves the vanilla rule alone while nobody is AFK', () => {
    new SleepRule(serverWith([here(false), here(false)])).enforce()
    expect(world.gameRules.playersSleepingPercentage).toBe(100)
  })

  it('exempts AFK players', () => {
    const requirement = new SleepRule(serverWith([here(false), here(false), here(true)]))
    requirement.enforce()
    expect(requirement.size).toBe(2)
    expect(sleepersDemanded(3)).toBe(2)
  })

  it('measures the overworld, not everyone online', () => {
    // Players elsewhere never count, so they must not dilute the share owed by
    // the players who are here.
    const requirement = new SleepRule(serverWith([here(false), here(false), elsewhere(), elsewhere()]))
    requirement.enforce()
    expect(requirement.size).toBe(2)
    expect(sleepersDemanded(2)).toBe(2)
  })

  it('demands exactly the players who have to sleep, never one more', () => {
    for (let online = 1; online <= 40; online++) {
      for (let inOverworld = 1; inOverworld <= online; inOverworld++) {
        for (let afk = 0; afk < inOverworld; afk++) {
          const players = [
            ...Array(inOverworld - afk).fill(null).map(() => here(false)),
            ...Array(afk).fill(null).map(() => here(true)),
            ...Array(online - inOverworld).fill(null).map(elsewhere),
          ]
          world.gameRules.playersSleepingPercentage = 100
          new SleepRule(serverWith(players)).enforce()
          const label = `${inOverworld - afk} of ${inOverworld} here, ${online} online`
          expect(sleepersDemanded(inOverworld), label).toBe(inOverworld - afk)
        }
      }
    }
  })

  it('demands nothing when everyone here is AFK', () => {
    const requirement = new SleepRule(serverWith([here(true), here(true)]))
    requirement.enforce()
    expect(requirement.size).toBe(0)
    expect(world.gameRules.playersSleepingPercentage).toBe(0)
  })

  it('falls back to the vanilla rule with nobody in the overworld', () => {
    new SleepRule(serverWith([elsewhere()])).enforce()
    expect(world.gameRules.playersSleepingPercentage).toBe(100)
  })
})
