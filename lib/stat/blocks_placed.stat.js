// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Stat } from "./stat.js";

export class BlocksPlacedStat extends Stat {
  constructor(player) {
    super(player, "Blocks Placed", "blocksPlaced", "placed", "blocks");
  }
}
