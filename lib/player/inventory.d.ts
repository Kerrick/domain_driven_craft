// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Activity } from './activity'

/**
 * Players sort chests, craft, and shuttle items between a container and their
 * inventory. Inventory keeps count of those operations so presence can read
 * them as activity. A farm feeding loot into the inventory moves items too,
 * without anyone acting, so arrivals are netted against the moves before any of
 * it counts.
 */
export declare class Inventory {
  /**
   * Records an item changing slots: sorting, crafting, or moving to and from a
   * container.
   */
  itemMoved(): void
  /**
   * Records an item landing in the inventory from the world: loot, a farm's
   * output.
   */
  itemArrived(): void
  /** Credits {@link activity} for moves the world did not already account for. */
  tick(activity: Activity): void
}
