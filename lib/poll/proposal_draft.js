// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Proposal } from './proposal.js'

export class ProposalDraft {
  static for(PollClass) { return new ProposalDraft(PollClass) }

  #PollClass
  #player

  constructor(PollClass, player = null) {
    this.#PollClass = PollClass
    this.#player = player
  }

  by(player) { return new ProposalDraft(this.#PollClass, player) }
  with(...args) { return new Proposal(this.#player, this.#PollClass, ...args) }
}
