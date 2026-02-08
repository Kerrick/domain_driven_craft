// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AlreadyInvited } from './allowlist/errors/already_invited.error.js'
import { ResidentProtected } from './allowlist/errors/resident_protected.error.js'

export class Allowlist {
  #residents
  #guests

  constructor(residents, guests) {
    this.#residents = new Set(residents)
    this.#guests = new Set(guests)
  }

  invite(gamertag) {
    if (this.has(gamertag)) throw new AlreadyInvited(gamertag)
    this.#guests.add(gamertag)
  }

  uninvite(gamertag) {
    if (this.isResident(gamertag)) throw new ResidentProtected(gamertag)
    const found = [...this.#guests].find((g) => g.equals(gamertag))
    if (found) this.#guests.delete(found)
  }

  has(gamertag) { return this.isResident(gamertag) || this.isGuest(gamertag) }
  isResident(gamertag) { return [...this.#residents].some((r) => r.equals(gamertag)) }
  isGuest(gamertag) { return [...this.#guests].some((g) => g.equals(gamertag)) }
  get guests() { return new Set(this.#guests) }

  *[Symbol.iterator]() {
    yield* this.#residents
    yield* this.#guests
  }
}
