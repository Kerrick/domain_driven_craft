// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world, system } from "@minecraft/server";
import { Server } from "./server/server.js";
import { Chat } from "./server/chat.js";
import { Milestones } from "./milestone/index.js";

Milestones.subscribeAll();

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

system.runInterval(() => {
  Server.instance.tick();
  Chat.instance.checkPolls();
}, 20);
