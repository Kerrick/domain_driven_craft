// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export interface Ballot {
  cast(player: Player): boolean;
  has(name: string): boolean;
  remove(name: string): void;
  readonly count: number;
}
