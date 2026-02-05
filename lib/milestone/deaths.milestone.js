// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Milestone } from "./milestone.js";

export class DeathsMilestone extends Milestone {
  static statKey = "deaths";
  
  constructor(playerName) {
    super(playerName, "Deaths", "deaths", "survived", "deaths");
  }
  
  static subscribe() {
    world.afterEvents.entityDie.subscribe((event) => {
      if (event.deadEntity.typeId === "minecraft:player") {
        new DeathsMilestone(event.deadEntity.nameTag).increment();
      }
    });
  }
}
