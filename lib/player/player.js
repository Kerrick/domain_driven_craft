// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PreferenceList } from "./preference_list.js";
import { PlayerStats } from "./player_stats.js";
import { ActionBar } from "./action_bar/action_bar.js";
import { Activity } from "./activity.js";
import { Presence } from "./presence.js";
import { Location } from "../types/location.js";
import { toDomainDimension } from "../types/dimension.js";
import { Block } from "../block/index.js";

export class Player {
  #mcPlayer;
  #preferences;
  #stats;
  #actionBar;
  #activity;
  #presence;
  
  constructor(mcPlayer) {
    this.#mcPlayer = mcPlayer;
    this.#preferences = new PreferenceList(mcPlayer.name);
    this.#stats = new PlayerStats(this);
    this.#actionBar = new ActionBar(this, mcPlayer);
    this.#activity = new Activity();
    this.#presence = new Presence(mcPlayer.name);
    
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
  
  get abstains() {
    return this.#presence.isAfk;
  }
  
  get isAfk() {
    return this.#presence.isAfk;
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
    this.#activity.touch();
    this.#stats.blocksBroken.increment();
    block.brokenBy(this);
  }
  
  gazedAt(block) {
    block.gazedAtBy(this);
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
    this.#activity.touch();
    this.#stats.blocksPlaced.increment();
  }
  
  died() {
    this.#activity.touch();
    this.#stats.deaths.increment();
  }
  
  killedMob() {
    this.#activity.touch();
    this.#stats.mobKills.increment();
  }
  
  changedHotbarSlot() {
    this.#activity.touch();
  }
  
  played(seconds) {
    try {
      this.#activity.tick(this.location, seconds);
    } catch {
      // Player may have left or be in invalid state
    }
    this.#presence.tick(this.#activity);
    
    if (!this.#presence.isAfk) {
      this.#stats.playTime.increment(seconds);
    }
    
    const distance = this.#activity.distanceMoved;
    if (distance > 0) {
      this.#stats.distanceWalked.increment(distance);
    }
  }
}
