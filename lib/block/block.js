// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Location } from "../types/location.js";
import { toDomainDimension } from "../types/dimension.js";

export class Block {
  static #types = [];
  static AnnouncementStrategy = null;
  
  #location;
  #strategy;
  
  constructor(location) {
    this.#location = location;
    this.#strategy = this.constructor.AnnouncementStrategy 
      ? new this.constructor.AnnouncementStrategy(this) 
      : null;
  }
  
  static register(BlockClass) {
    this.#types.push(BlockClass);
  }
  
  // ACL boundary - translates MC types to domain types
  static fromPermutation(permutation, mcLocation) {
    const location = new Location(mcLocation.x, mcLocation.y, mcLocation.z, toDomainDimension("overworld"));
    
    for (const B of this.#types) {
      if (B.matches(permutation)) {
        return new B(location);
      }
    }
    return new Block(location);
  }
  
  static matches(_permutation) {
    return false;
  }
  
  get location() {
    return this.#location;
  }
  
  get displayName() {
    return "block";
  }
  
  announceTo(player) {
    this.#strategy?.announce(player);
  }
}
