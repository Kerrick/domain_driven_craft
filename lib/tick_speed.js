// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// TickSpeed - Knows safe values and how to boost/reset itself

import { world, system } from "@minecraft/server";

const DEFAULT = 1;
const MAX_SAFE = 20;
const BOOST_DURATION_TICKS = 60 * 20;

class TickSpeed {
  #boosted = false;
  #resetHandle = null;
  
  safeSpeed() {
    const playerCount = world.getAllPlayers().length;
    return Math.min(Math.max(3, 11 - playerCount), MAX_SAFE);
  }
  
  isBoosted() {
    return this.#boosted;
  }
  
  current() {
    return this.#boosted ? this.safeSpeed() : DEFAULT;
  }
  
  boost() {
    const speed = this.safeSpeed();
    const playerCount = world.getAllPlayers().length;
    
    this.#boosted = true;
    world.getDimension("overworld").runCommand(`gamerule randomtickspeed ${speed}`);
    
    world.sendMessage(`§a§l[FastTick] §r§aVote passed! Tick speed: §e${speed}§a for 60 seconds`);
    world.sendMessage(`§7(${playerCount} player${playerCount !== 1 ? 's' : ''} → safe speed: ${speed})`);
    
    this.#resetHandle = system.runTimeout(() => this.reset(), BOOST_DURATION_TICKS);
  }
  
  reset() {
    if (this.#boosted) {
      world.getDimension("overworld").runCommand(`gamerule randomtickspeed ${DEFAULT}`);
      world.sendMessage(`§e[FastTick] Tick speed returned to normal (${DEFAULT})`);
    }
    
    this.#boosted = false;
    
    if (this.#resetHandle) {
      system.clearRun(this.#resetHandle);
      this.#resetHandle = null;
    }
  }
}

export default new TickSpeed();
