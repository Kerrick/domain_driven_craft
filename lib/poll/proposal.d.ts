// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Poll } from "./types";

export interface Proposal<T extends Poll = Poll> {
  readonly player: Player;
  readonly PollClass: new (...args: any[]) => T;
  readonly args: any[];
}
