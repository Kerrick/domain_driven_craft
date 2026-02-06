// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, highlight } from "../server/chat.js";

export class Block {
  static #types = [];
  
  #typeId;
  
  constructor(permutation, _location) {
    this.#typeId = permutation.type.id;
  }
  
  static register(BlockClass) {
    this.#types.push(BlockClass);
  }
  
  static fromPermutation(permutation, location) {
    for (const B of this.#types) {
      if (B.matches(permutation)) return new B(permutation, location);
    }
    return new Block(permutation, location);
  }
  
  static matches(_permutation) {
    return false;
  }
  
  get isNotable() { return false; }
  
  get displayName() {
    return this.#typeId.replace("minecraft:", "").replace(/_/g, " ");
  }
  
  announceTo(player) {
    if (this.isNotable) {
      Chat.instance.celebrate(player.name, "found", highlight`${this.displayName}`);
    }
  }
}
