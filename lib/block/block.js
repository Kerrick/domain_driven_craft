// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Block {
  static #types = [];
  
  #typeId;
  
  constructor(permutation) {
    this.#typeId = permutation.type.id;
  }
  
  static register(BlockClass) {
    this.#types.push(BlockClass);
  }
  
  static fromPermutation(permutation) {
    for (const B of this.#types) {
      if (B.matches(permutation)) return new B(permutation);
    }
    return new Block(permutation);
  }
  
  static matches(_permutation) {
    return false;
  }
  
  get isNotable() { return false; }
  
  get displayName() {
    return this.#typeId.replace("minecraft:", "").replace(/_/g, " ");
  }
}
