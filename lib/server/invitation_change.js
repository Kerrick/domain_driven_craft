// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Allowlist } from './allowlist.js'

export class InvitationChange {
  #repository

  constructor(repository) { this.#repository = repository }

  for(gamertag) {
    const residents = this.#repository.loadResidents()
    const guests = this.#repository.loadGuests()
    const allowlist = new Allowlist(residents, guests)
    this.applyTo(allowlist, gamertag)
    this.#repository.saveGuests(allowlist.guests)
    this.syncWith(this.#repository, gamertag)
    return gamertag
  }

  applyTo(_allowlist, _gamertag) { throw new Error('Subclass must implement applyTo') }
  syncWith(_repository, _gamertag) { throw new Error('Subclass must implement syncWith') }
}
