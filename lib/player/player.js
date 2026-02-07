// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PreferenceList } from "./preference_list.js";
import { PlayerStats } from "./player_stats.js";
import { ActionBar } from "./action_bar/action_bar.js";
import { Location } from "../types/location.js";
import { toDomainDimension } from "../types/dimension.js";
import { Block } from "../block/index.js";

export class Player {
  #mcPlayer;
  #preferences;
  #stats;
  #actionBar;
  #lastPosition;
  
  constructor(mcPlayer) {
    this.#mcPlayer = mcPlayer;
    this.#preferences = new PreferenceList(mcPlayer.name);
    this.#stats = new PlayerStats(this);
    this.#actionBar = new ActionBar(this, mcPlayer);
    this.#lastPosition = null;
    
    if (this.#preferences.coords) {
      this.#actionBar.enableCoords();
    }
  }
  
  get name() {
    return this.#mcPlayer.name;
  }
  
  get preferences() {
    return this.#preferences;
  }
  
  get stats() {
    return this.#stats;
  }
  
  get isOp() {
    return this.#mcPlayer.isOp();
  }
  
  sendMessage(text) {
    this.#mcPlayer.sendMessage(text);
  }
  
  get location() {
    const loc = this.#mcPlayer.location;
    const dimension = toDomainDimension(this.#mcPlayer.dimension.id);
    return new Location(loc.x, loc.y, loc.z, dimension);
  }
  
  set home(location) {
    this.#preferences.home = location;
  }
  
  goHome() {
    const home = this.#preferences.homeLocation;
    if (home) {
      this.#mcPlayer.teleport({ x: home.x, y: home.y, z: home.z });
    }
    return this.location;
  }
  
  toggleCoords() {
    const newValue = this.#preferences.toggleCoords();
    
    if (newValue) {
      this.#actionBar.enableCoords();
    } else {
      this.#actionBar.disableCoords();
    }
    
    return newValue;
  }
  
  showNotification(text, seconds) {
    this.#actionBar.notify(text, seconds);
  }
  
  updateActionBar() {
    this.#actionBar.tick();
  }
  
  // Domain actions - called from main.js ACL
  brokeBlock(block) {
    this.#stats.blocksBroken.increment();
    block.announceTo(this);
  }
  
  gazedAt(block) {
    block.announceTo(this);
  }
  
  checkGaze() {
    try {
      const hit = this.#mcPlayer.getBlockFromViewDirection({ maxDistance: 16 });
      if (hit) {
        const block = Block.fromPermutation(hit.block.permutation, hit.block.location);
        this.gazedAt(block);
      }
    } catch {
      // Player may have left or be in invalid state
    }
  }
  
  placedBlock() {
    this.#stats.blocksPlaced.increment();
  }
  
  died() {
    this.#stats.deaths.increment();
  }
  
  killedMob() {
    this.#stats.mobKills.increment();
  }
  
  played(seconds) {
    this.#stats.playTime.increment(seconds);
    this.#trackDistance();
  }
  
  #trackDistance() {
    try {
      const pos = this.#mcPlayer.location;
      if (this.#lastPosition) {
        const dx = pos.x - this.#lastPosition.x;
        const dy = pos.y - this.#lastPosition.y;
        const dz = pos.z - this.#lastPosition.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance > 0.1 && distance < 100) {  // Ignore teleports
          this.#stats.distanceWalked.increment(Math.floor(distance));
        }
      }
      this.#lastPosition = { x: pos.x, y: pos.y, z: pos.z };
    } catch {
      // Player may have left
    }
  }
}
