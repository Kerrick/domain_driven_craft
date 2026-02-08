// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Block } from './block.js'
import { FirstSighting } from './strategy/index.js'

export class Spawner extends Block {
  static AnnouncementStrategy = FirstSighting

  static matches(permutation) { return permutation.type.id === 'minecraft:mob_spawner' }

  get displayName() { return 'spawner' }
}

Block.register(Spawner)
