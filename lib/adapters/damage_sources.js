// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DamageSource } from '../types/damage_source.js'
import { HostileDamageSource } from '../types/hostile_damage_source.js'

export class DamageSources {
  static #families = new Map([
    ['monster', HostileDamageSource],
  ])

  static resolve(mcDamageSource) {
    const attacker = mcDamageSource.damagingEntity
      ?? mcDamageSource.damagingProjectile
    return attacker ? DamageSources.#sourceFor(attacker) : new DamageSource()
  }

  static #sourceFor(attacker) {
    let result = null
    for (const [family, Source] of DamageSources.#families) result ??= DamageSources.#match(attacker, family, Source)
    return result ?? new DamageSource()
  }

  static #match(attacker, family, Source) {
    if (attacker.matches({ families: [family] })) return new Source()
    return null
  }
}

