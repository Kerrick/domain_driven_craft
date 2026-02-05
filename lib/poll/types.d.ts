// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export interface Poll {
  vote(player: Player): void;
  playerLeft(name: string): void;
}
