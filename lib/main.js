// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Dynamic Difficulty Script
// Switches to peaceful when certain players are online

import { world, system } from "@minecraft/server";

// Players who trigger peaceful mode when online
const PEACEFUL_PLAYERS = ["Lantarian"];

// Default difficulty when peaceful players are NOT online
const DEFAULT_DIFFICULTY = "normal";

let lastDifficulty = null;

system.runInterval(() => {
  try {
    const players = world.getAllPlayers();
    const playerNames = players.map(p => p.name);
    
    const needsPeaceful = PEACEFUL_PLAYERS.some(name => 
      playerNames.includes(name)
    );
    
    const targetDifficulty = needsPeaceful ? "peaceful" : DEFAULT_DIFFICULTY;
    
    // Only change and announce if different from last check
    if (targetDifficulty !== lastDifficulty) {
      world.getDimension("overworld").runCommand(`difficulty ${targetDifficulty}`);
      
      if (lastDifficulty !== null) {
        world.sendMessage(`§e[Server] Difficulty changed to ${targetDifficulty}`);
      }
      
      lastDifficulty = targetDifficulty;
    }
  } catch (e) {
    // Silently ignore errors during world loading
  }
}, 100); // Check every 5 seconds (100 ticks)

// Announce on player join
world.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) {
    const player = event.player;
    if (PEACEFUL_PLAYERS.includes(player.name)) {
      world.sendMessage(`§a[Server] ${player.name} joined - switching to peaceful mode`);
    }
  }
});

// Announce on player leave  
world.afterEvents.playerLeave.subscribe((event) => {
  if (PEACEFUL_PLAYERS.includes(event.playerName)) {
    // Check if other peaceful players are still online
    const remainingPlayers = world.getAllPlayers().map(p => p.name);
    const otherPeacefulOnline = PEACEFUL_PLAYERS.some(name => 
      name !== event.playerName && remainingPlayers.includes(name)
    );
    
    if (otherPeacefulOnline) {
      world.sendMessage(`§e[Server] ${event.playerName} left - peaceful mode continues`);
    } else {
      world.sendMessage(`§c[Server] ${event.playerName} left - returning to ${DEFAULT_DIFFICULTY} difficulty`);
    }
  }
});
