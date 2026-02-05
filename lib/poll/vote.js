// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Vote {
  #playerName;
  #timestamp;
  
  constructor(playerName) {
    this.#playerName = playerName;
    this.#timestamp = Date.now();
  }
  
  get playerName() { return this.#playerName; }
  get timestamp() { return this.#timestamp; }
}
