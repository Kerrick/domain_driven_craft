// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Poll } from "./poll";

export interface Proposal<T extends Poll = Poll> {
  readonly player: Player;
  readonly PollClass: new (...args: any[]) => T;
  readonly args: any[];
}

interface ProposalBuilder<T extends Poll> {
  with(...args: any[]): Proposal<T>;
}

interface ProposalFactory<T extends Poll> {
  by(player: Player): ProposalBuilder<T>;
}

export declare class Proposal {
  static for<T extends Poll>(PollClass: new (...args: any[]) => T): ProposalFactory<T>;
}
