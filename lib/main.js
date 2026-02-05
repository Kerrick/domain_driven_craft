// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world, system } from "@minecraft/server";
import { Server } from "./server/server.js";
import { Chat } from "./server/chat.js";

world.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    Server.instance.playerJoined(event.player);
  }
});

world.afterEvents.playerLeave.subscribe((event) => {
  Server.instance.playerLeft(event.playerName);
});

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

// Milestone event tracking
world.afterEvents.playerBreakBlock.subscribe((event) => {
  const player = Server.instance.player(event.player.name);
  if (player) player.stats._mutableBlocksBroken().increment();
});

world.afterEvents.playerPlaceBlock.subscribe((event) => {
  const player = Server.instance.player(event.player.name);
  if (player) player.stats._mutableBlocksPlaced().increment();
});

world.afterEvents.entityDie.subscribe((event) => {
  // Player death
  if (event.deadEntity.typeId === "minecraft:player") {
    const player = Server.instance.player(event.deadEntity.nameTag);
    if (player) player.stats._mutableDeaths().increment();
  }
  
  // Mob kill by player
  const killer = event.damageSource?.damagingEntity;
  if (killer?.typeId === "minecraft:player" && event.deadEntity.typeId !== "minecraft:player") {
    const player = Server.instance.player(killer.nameTag);
    if (player) player.stats._mutableMobKills().increment();
  }
});

system.runInterval(() => {
  Server.instance.tick();
  Chat.instance.checkPolls();
}, 20);
