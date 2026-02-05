// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Milestone } from "./milestone.js";

export class BlocksPlacedMilestone extends Milestone {
  static statKey = "blocksPlaced";
  
  constructor(playerName) {
    super(playerName, "Blocks Placed", "blocksPlaced", "placed", "blocks");
  }
  
  static subscribe() {
    world.afterEvents.playerPlaceBlock.subscribe((event) => {
      new BlocksPlacedMilestone(event.player.name).increment();
    });
  }
}
