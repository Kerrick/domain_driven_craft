// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Vote - Tracks unanimous consent and resolves itself

import { world } from "@minecraft/server";
import TickSpeed from "./tick_speed.js";

class Vote {
  #votes = new Set();
  
  hasVoted(playerName) {
    return this.#votes.has(playerName);
  }
  
  count() {
    return this.#votes.size;
  }
  
  needed() {
    return world.getAllPlayers().length;
  }
  
  passed() {
    const playerNames = world.getAllPlayers().map(p => p.name);
    return playerNames.length > 0 && playerNames.every(name => this.#votes.has(name));
  }
  
  cast(player) {
    const playerName = player.name;
    
    if (TickSpeed.isBoosted()) {
      player.sendMessage(`§e[FastTick] Already active! Wait for it to expire.`);
      return;
    }
    
    if (this.hasVoted(playerName)) {
      player.sendMessage(`§e[FastTick] You already voted! Waiting for others.`);
      return;
    }
    
    this.#votes.add(playerName);
    
    const total = this.needed();
    const current = this.count();
    
    if (this.passed()) {
      TickSpeed.boost();
      this.clear();
    } else {
      world.sendMessage(`§a[FastTick] §e${playerName}§a voted! §7(${current}/${total} - need unanimous)`);
      world.sendMessage(`§7Type §f!fasttick§7 to vote. Safe speed: §f${TickSpeed.safeSpeed()}`);
    }
  }
  
  remove(playerName) {
    if (this.#votes.has(playerName)) {
      this.#votes.delete(playerName);
      
      if (this.#votes.size > 0 && !TickSpeed.isBoosted()) {
        world.sendMessage(`§e[FastTick] ${playerName} left. Vote reset.`);
        this.clear();
      }
    }
  }
  
  clear() {
    this.#votes.clear();
  }
  
  status(player) {
    const playerCount = this.needed();
    const safeSpeed = TickSpeed.safeSpeed();
    
    player.sendMessage(`§6=== Fast Tick System ===`);
    player.sendMessage(`§7Type §f!fasttick§7 to vote for faster crop growth`);
    player.sendMessage(`§7Requires: §fUnanimous vote`);
    player.sendMessage(`§7Duration: §f60 seconds§7 then auto-resets`);
    player.sendMessage(`§7Players: §f${playerCount}§7 → Safe speed: §f${safeSpeed}`);
    
    if (TickSpeed.isBoosted()) {
      player.sendMessage(`§aStatus: §lACTIVE`);
    } else if (this.count() > 0) {
      player.sendMessage(`§eStatus: Voting (${this.count()}/${playerCount})`);
    } else {
      player.sendMessage(`§7Status: Inactive`);
    }
  }
}

export default new Vote();
