// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Block } from "./block.js";
import { Chat, highlight } from "../server/chat.js";

export class Spawner extends Block {
  #location;
  
  constructor(permutation, location) {
    super(permutation);
    this.#location = location;
  }
  
  static matches(permutation) {
    return permutation.type.id === "minecraft:mob_spawner";
  }
  
  get displayName() { return "spawner"; }
  
  get #sightingKey() {
    const { x, y, z } = this.#location;
    return `spawner_${Math.floor(x)}_${Math.floor(y)}_${Math.floor(z)}`;
  }
  
  #hasBeenSeenBy(player) {
    return world.getDynamicProperty(`${this.#sightingKey}_${player.name}`) === true;
  }
  
  #markSeenBy(player) {
    world.setDynamicProperty(`${this.#sightingKey}_${player.name}`, true);
  }
  
  announceTo(player) {
    if (!this.#hasBeenSeenBy(player)) {
      this.#markSeenBy(player);
      Chat.instance.celebrate(player.name, "discovered a", highlight`${this.displayName}`);
    }
  }
}

Block.register(Spawner);
