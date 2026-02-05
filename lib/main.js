// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Server Utils - Entry Point

import { world, system } from "@minecraft/server";
import Difficulty from "./difficulty.js";
import Vote from "./vote.js";
import Server from "./server.js";
import Welcome from "./welcome.js";

// Difficulty adjusts itself every 5 seconds
system.runInterval(() => Difficulty.adjust(), 100);

// Player join
world.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    Difficulty.announceJoin(event.player.name);
    Welcome.player(event.player);
  }
});

// Player leave
world.afterEvents.playerLeave.subscribe((event) => {
  Difficulty.announceLeave(event.playerName);
  Vote.remove(event.playerName);
});

// Chat commands
world.beforeEvents.chatSend.subscribe((event) => {
  const message = event.message.toLowerCase().trim();
  const player = event.sender;
  
  switch (message) {
    case "!fasttick":
    case "!ft":
      event.cancel = true;
      Vote.cast(player);
      break;
    case "!fasttick?":
    case "!ft?":
      event.cancel = true;
      Vote.status(player);
      break;
    case "!status":
      event.cancel = true;
      Server.status(player);
      break;
    case "!help":
    case "!?":
      event.cancel = true;
      Server.help(player);
      break;
  }
});
