// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Proposal } from "./proposal.js";
import { Player } from "../player/player.js";
import { Poll } from "./poll.js";

export class ProposalDraft {
  constructor(PollClass: typeof Poll, player?: Player | null);
  static for(PollClass: typeof Poll): ProposalDraft;
  by(player: Player): ProposalDraft;
  with(...args: any[]): Proposal;
}
