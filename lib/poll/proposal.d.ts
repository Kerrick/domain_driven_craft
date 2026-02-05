// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Poll } from "./poll";

type PollClass<T extends Poll = Poll> = new (...args: any[]) => T;

declare class ProposalDraft<T extends Poll = Poll> {
  by(player: Player): ProposalDraft<T>;
  with(...args: any[]): Proposal<T>;
}

export declare class Proposal<T extends Poll = Poll> {
  readonly player: Player;
  readonly PollClass: PollClass<T>;
  readonly args: any[];
  
  static for<T extends Poll>(PollClass: PollClass<T>): ProposalDraft<T>;
}
