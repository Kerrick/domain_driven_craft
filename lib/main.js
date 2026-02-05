// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world, system } from "@minecraft/server";
import server from "./server/index.js";
import { parse } from "./command/index.js";

world.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    server.playerJoined(event.player);
  }
});

world.afterEvents.playerLeave.subscribe((event) => {
  server.playerLeft(event.playerName);
});

world.beforeEvents.chatSend.subscribe((event) => {
  const command = parse(event.message);
  
  if (command) {
    event.cancel = true;
    const player = server.player(event.sender.name);
    if (player) {
      command.execute(player, server);
    }
  }
});

system.runInterval(() => {
  server.recalculateDifficulty();
}, 100);
