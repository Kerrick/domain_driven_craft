// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Allowlist } from "./allowlist.js";

export class InvitationGrant {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  for(gamertag) {
    const residents = this.#repository.loadResidents();
    const guests = this.#repository.loadGuests();
    const allowlist = new Allowlist(residents, guests);
    allowlist.invite(gamertag);
    this.#repository.saveGuests(allowlist.guests);
    this.#repository.grant(gamertag);
    return gamertag;
  }
}
