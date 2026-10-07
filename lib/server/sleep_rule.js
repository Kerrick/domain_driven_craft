// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from '@minecraft/server'

const VANILLA_PERCENTAGE = 100

export class SleepRule {
  #server

  constructor(server) { this.#server = server }
  members() { return new Set([...this.#server.overworldPlayers()].filter((p) => !p.isAfk)) }
  get size() { return this.members().size }

  enforce() {
    const percentage = this.#percentage()
    const rules = world.gameRules
    if (rules.playersSleepingPercentage === percentage) return
    rules.playersSleepingPercentage = percentage
  }

  #percentage() {
    // The game rule is a percentage of the players the engine counts, and it
    // counts the ones in the dimension where beds work. Taking the share over
    // everyone online would shrink it every time someone visits the Nether.
    const counted = this.#server.overworldPlayers().size
    if (counted === 0) return VANILLA_PERCENTAGE
    // The engine rounds the sleeper count up, so round the percentage down.
    // Rounding up demands a sleeper the count never promised: a night nobody
    // can end.
    return Math.floor((this.size * 100) / counted)
  }
}
