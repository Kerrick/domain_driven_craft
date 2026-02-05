// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Milestone } from "./milestone.js";

export class BlocksBrokenMilestone extends Milestone {
  static statKey = "blocksBroken";
  
  constructor(playerName) {
    super(playerName, "Blocks Broken", "blocksBroken", "broke", "blocks");
  }
  
  static subscribe() {
    world.afterEvents.playerBreakBlock.subscribe((event) => {
      new BlocksBrokenMilestone(event.player.name).increment();
    });
  }
}
