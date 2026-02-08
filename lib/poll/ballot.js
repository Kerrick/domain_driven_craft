// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Ballot {
  #votes = new Set()

  cast(player) {
    if (this.#votes.has(player.name)) return false
    this.#votes.add(player.name)
    return true
  }

  has(name) { return this.#votes.has(name) }
  remove(name) { this.#votes.delete(name) }
  get count() { return this.#votes.size }
}
