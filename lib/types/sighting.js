// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from '@minecraft/server'

export class Sighting {
  #key

  constructor(location, type) {
    const { x, y, z } = location
    this.#key = `${type}_${Math.floor(x)}_${Math.floor(y)}_${Math.floor(z)}`
  }

  hasBeenSeenBy(player) { return world.getDynamicProperty(`${this.#key}_${player.name}`) === true }
  markSeenBy(player) { world.setDynamicProperty(`${this.#key}_${player.name}`, true) }
}
