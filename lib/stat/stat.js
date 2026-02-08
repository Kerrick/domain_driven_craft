// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from '@minecraft/server'
import { Delta } from './delta.js'

export class Stat {
  #player
  #name
  #statKey
  #verb
  #noun

  // eslint-disable-next-line max-params -- Should consider how to refactor.
  constructor(player, name, statKey, verb, noun) {
    this.#player = player
    this.#name = name
    this.#statKey = statKey
    this.#verb = verb
    this.#noun = noun
  }

  get name() { return this.#name }
  get statKey() { return this.#statKey }
  get playerName() { return this.#player.name }
  get verb() { return this.#verb }
  get noun() { return this.#noun }
  get count() { return Number(world.getDynamicProperty(this.#key) ?? 0) }
  get formatted() { return this.count.toLocaleString() }

  increment(amount = 1) {
    const newCount = this.count + amount
    world.setDynamicProperty(this.#key, newCount)
    new Delta(this).check()
    return newCount
  }

  get #key() { return `stats_${this.#player.name}_${this.#statKey}` }
}
