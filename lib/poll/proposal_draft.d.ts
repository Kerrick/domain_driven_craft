// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Proposal } from './proposal.js'
import { Player } from '../player/player.js'
import { Poll } from './poll.js'

/**
 * Building a poll proposal requires a poll class, a player, and configuration
 * arguments. This builder assembles them step by step so commands don't need to
 * know the proposal constructor.
 */
export class ProposalDraft {
  constructor(PollClass: typeof Poll, player?: Player | null)
  /** Starts a proposal for the given poll type. */
  static for(PollClass: typeof Poll): ProposalDraft
  /** Assigns the proposing player. */
  by(player: Player): ProposalDraft
  /** Finalizes the proposal with configuration arguments. */
  with(...args: any[]): Proposal
}
