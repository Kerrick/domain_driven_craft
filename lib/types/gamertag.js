// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Gamertag {
  static from(data) { return new Gamertag(data.name, data.xuid ?? null) }

  #name
  #xuid

  constructor(name, xuid = null) {
    this.#name = name
    this.#xuid = xuid
  }

  get name() { return this.#name }
  get xuid() { return this.#xuid }
  equals(other) { return this.#name === other.name }
  toJSON() { return this.#xuid ? { name: this.#name, xuid: this.#xuid } : { name: this.#name } }
}
