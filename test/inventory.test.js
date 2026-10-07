// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest'
import { Inventory } from '../lib/player/inventory.js'
import { Activity } from '../lib/player/activity.js'
import { Location } from '../lib/types/location.js'

// A player rooted to one spot: movement never resets the idle timer.
function standStill(activity, seconds) {
  activity.tick(new Location(0, 64, 0, 'overworld'), seconds)
}

describe('Inventory', () => {
  it('reads an item move as activity', () => {
    const activity = new Activity()
    standStill(activity, 200)
    const inventory = new Inventory()
    inventory.itemMoved()
    inventory.tick(activity)
    expect(activity.idleSeconds).toBe(0)
  })

  it('does not read loot a farm delivers as activity', () => {
    const activity = new Activity()
    standStill(activity, 200)
    const inventory = new Inventory()
    inventory.itemArrived()
    inventory.itemMoved()
    inventory.tick(activity)
    expect(activity.idleSeconds).toBe(200)
  })

  it('credits the player when they move more than the farm delivers', () => {
    const activity = new Activity()
    standStill(activity, 200)
    const inventory = new Inventory()
    inventory.itemArrived()
    inventory.itemMoved()
    inventory.itemMoved()
    inventory.tick(activity)
    expect(activity.idleSeconds).toBe(0)
  })

  it('settles the ledger every tick', () => {
    const activity = new Activity()
    const inventory = new Inventory()
    inventory.itemMoved()
    inventory.tick(activity)
    standStill(activity, 30)
    inventory.tick(activity)
    expect(activity.idleSeconds).toBe(30)
  })
})
