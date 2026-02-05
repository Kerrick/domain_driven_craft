// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Milestone } from "./milestone.js";

export class BlocksPlacedMilestone extends Milestone {
  constructor(playerName) {
    super(playerName, "Blocks Placed", "blocksPlaced", "placed", "blocks");
  }
}
