// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Milestone } from "./milestone.js";

export class MobKillsMilestone extends Milestone {
  static statKey = "mobKills";
  
  constructor(playerName) {
    super(playerName, "Mob Kills", "mobKills", "slew", "mobs");
  }
  
  static subscribe() {
    world.afterEvents.entityDie.subscribe((event) => {
      const killer = event.damageSource?.damagingEntity;
      if (killer?.typeId === "minecraft:player" && event.deadEntity.typeId !== "minecraft:player") {
        new MobKillsMilestone(killer.nameTag).increment();
      }
    });
  }
}
