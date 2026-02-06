// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Block } from "./block.js";

export class EmeraldOre extends Block {
  static matches(permutation) {
    const id = permutation.type.id;
    return id === "minecraft:emerald_ore" || id === "minecraft:deepslate_emerald_ore";
  }
  
  get isNotable() { return true; }
  get displayName() { return "emeralds"; }
}

Block.register(EmeraldOre);
