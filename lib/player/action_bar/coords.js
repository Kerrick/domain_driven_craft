// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Coords {
  #player
  #enabled

  constructor(player) {
    this.#player = player
    this.#enabled = false
  }

  enable() { this.#enabled = true }
  disable() { this.#enabled = false }
  get isEnabled() { return this.#enabled }
  get text() { return this.#player.location.formatted }
}
