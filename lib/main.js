// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world, system } from "@minecraft/server";
import { Server } from "./server/server.js";
import { Chat } from "./server/chat.js";
import { Block } from "./block/index.js";

// Player lifecycle
world.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    Server.instance.playerJoined(event.player);
  }
});

world.afterEvents.playerLeave.subscribe((event) => {
  Server.instance.playerLeft(event.playerName);
});

// Chat commands
world.beforeEvents.chatSend.subscribe((event) => {
  const command = Chat.instance.hear(event.message);
  
  if (command) {
    event.cancel = true;
    const player = Server.instance.player(event.sender.name);
    if (player) {
      command.execute(player);
    }
  }
});

// Player actions → domain methods (ACL layer)
world.afterEvents.playerBreakBlock.subscribe((event) => {
  const block = Block.fromPermutation(event.brokenBlockPermutation, event.block.location);
  Server.instance.player(event.player.name)?.brokeBlock(block);
});

world.afterEvents.playerPlaceBlock.subscribe((event) => {
  Server.instance.player(event.player.name)?.placedBlock();
});

world.afterEvents.entityDie.subscribe((event) => {
  // Player death
  if (event.deadEntity.typeId === "minecraft:player") {
    Server.instance.player(event.deadEntity.nameTag)?.died();
  }
  
  // Mob kill by player
  const killer = event.damageSource?.damagingEntity;
  if (killer?.typeId === "minecraft:player" && event.deadEntity.typeId !== "minecraft:player") {
    Server.instance.player(killer.nameTag)?.killedMob();
  }
});

// Tick loop
system.runInterval(() => {
  Server.instance.tick();
  Chat.instance.checkPolls();
}, 20);
