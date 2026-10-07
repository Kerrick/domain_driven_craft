// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Inventory {
  #moves = 0
  #arrivals = 0

  itemMoved() { this.#moves++ }
  itemArrived() { this.#arrivals++ }

  tick(activity) {
    // A farm dropping loot into the inventory moves items without anyone
    // acting, so
    // arrivals are netted off before any move counts as the player's doing.
    const deliberate = this.#moves - this.#arrivals
    this.#moves = 0
    this.#arrivals = 0
    if (deliberate > 0) activity.touch()
  }
}
