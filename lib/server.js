// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Server - Knows its own status and can describe itself

import { world } from "@minecraft/server";
import Difficulty from "./difficulty.js";
import TickSpeed from "./tick_speed.js";

class Server {
  playerCount() {
    return world.getAllPlayers().length;
  }
  
  status(player) {
    const diff = Difficulty.current();
    const tick = TickSpeed.current();
    const players = this.playerCount();
    const boosted = TickSpeed.isBoosted();
    
    player.sendMessage(`§6=== Server Status ===`);
    player.sendMessage(`§7Players online: §f${players}`);
    player.sendMessage(`§7Difficulty: §f${diff}`);
    player.sendMessage(`§7Tick speed: §f${tick}${boosted ? " §a(boosted)" : ""}`);
    player.sendMessage(`§7Type §f!help§7 for commands`);
  }
  
  help(player) {
    player.sendMessage(`§6=== Commands ===`);
    player.sendMessage(`§e!status§7 - Show server status`);
    player.sendMessage(`§e!fasttick§7 - Vote for faster crop growth`);
    player.sendMessage(`§e!fasttick?§7 - Show fast tick vote status`);
    player.sendMessage(`§e!help§7 - Show this help`);
  }
}

export default new Server();
