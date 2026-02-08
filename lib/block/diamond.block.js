// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Block } from './block.js'
import { EveryBreak } from './strategy/index.js'

export class DiamondOre extends Block {
  static AnnouncementStrategy = EveryBreak

  static matches(permutation) {
    const id = permutation.type.id
    return id === 'minecraft:diamond_ore' || id === 'minecraft:deepslate_diamond_ore'
  }

  get displayName() { return 'diamonds' }
}

Block.register(DiamondOre)
