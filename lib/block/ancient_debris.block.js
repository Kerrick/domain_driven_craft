// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Block } from "./block.js";
import { EveryBreak } from "./strategy/index.js";

export class AncientDebris extends Block {
  static AnnouncementStrategy = EveryBreak;
  
  static matches(permutation) {
    return permutation.type.id === "minecraft:ancient_debris";
  }
  
  get displayName() { return "ancient debris"; }
}

Block.register(AncientDebris);
