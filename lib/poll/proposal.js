// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Proposal {
  #player;
  #PollClass;
  #args;
  
  constructor(player, PollClass, ...args) {
    this.#player = player;
    this.#PollClass = PollClass;
    this.#args = args;
  }
  
  get player() { return this.#player; }
  get PollClass() { return this.#PollClass; }
  get args() { return this.#args; }
}
