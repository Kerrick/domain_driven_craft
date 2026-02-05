// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Difficulty - Knows how to adjust itself based on player presence

import { world } from "@minecraft/server";

const PEACEFUL_PLAYERS = ["Lantarian", "HelloKitty3248"];
const DEFAULT = "normal";

class Difficulty {
  #current = null;
  
  current() {
    return this.#current || DEFAULT;
  }
  
  #target() {
    const online = world.getAllPlayers().map(p => p.name);
    const needsPeaceful = PEACEFUL_PLAYERS.some(name => online.includes(name));
    return needsPeaceful ? "peaceful" : DEFAULT;
  }
  
  adjust() {
    try {
      const next = this.#target();
      
      if (next !== this.#current) {
        world.getDimension("overworld").runCommand(`difficulty ${next}`);
        
        if (this.#current !== null) {
          world.sendMessage(`§e[Server] Difficulty changed to ${next}`);
        }
        
        this.#current = next;
      }
    } catch (e) {
      // World still loading
    }
  }
  
  announceJoin(playerName) {
    if (PEACEFUL_PLAYERS.includes(playerName)) {
      world.sendMessage(`§a[Server] ${playerName} joined - switching to peaceful mode`);
    }
  }
  
  announceLeave(playerName) {
    if (PEACEFUL_PLAYERS.includes(playerName)) {
      const remaining = world.getAllPlayers().map(p => p.name);
      const otherPeacefulOnline = PEACEFUL_PLAYERS.some(name => 
        name !== playerName && remaining.includes(name)
      );
      
      if (otherPeacefulOnline) {
        world.sendMessage(`§e[Server] ${playerName} left - peaceful mode continues`);
      } else {
        world.sendMessage(`§c[Server] ${playerName} left - returning to ${DEFAULT} difficulty`);
      }
    }
  }
}

export default new Difficulty();
