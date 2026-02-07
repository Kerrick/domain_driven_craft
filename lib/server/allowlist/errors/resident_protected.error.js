// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class ResidentProtected extends Error {
  constructor(gamertag) {
    super(`${gamertag.name} is a seed player`);
    this.gamertag = gamertag;
  }
}
