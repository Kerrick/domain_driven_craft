// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ExplosionSource } from '../types/explosion_source.js'
import { CreeperExplosion } from '../types/creeper_explosion.js'
import { GhastExplosion } from '../types/ghast_explosion.js'

export class ExplosionSources {
  static #typeIds = new Map([
    ['minecraft:creeper', CreeperExplosion],
    ['minecraft:ghast', GhastExplosion],
  ])

  static resolve(mcEntity) {
    const SourceClass = ExplosionSources.#typeIds.get(mcEntity?.typeId)
      ?? ExplosionSource
    return new SourceClass()
  }
}

