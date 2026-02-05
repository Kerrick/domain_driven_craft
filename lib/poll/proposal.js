// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

class ProposalDraft {
  #PollClass;
  #player;
  
  constructor(PollClass, player = null) {
    this.#PollClass = PollClass;
    this.#player = player;
  }
  
  by(player) {
    return new ProposalDraft(this.#PollClass, player);
  }
  
  with(...args) {
    return new Proposal(this.#player, this.#PollClass, ...args);
  }
}

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
  
  static for(PollClass) {
    return new ProposalDraft(PollClass);
  }
}
