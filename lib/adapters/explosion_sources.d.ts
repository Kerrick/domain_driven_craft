// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ExplosionSource } from '../types/explosion_source'

/**
 * Anti-corruption layer: translates Minecraft explosion events into domain
 * value objects.
 */
export class ExplosionSources {
  /** Maps a Minecraft entity to the corresponding domain {@link ExplosionSource}. */
  static resolve(
    mcEntity: import('@minecraft/server').Entity | undefined,
  ): ExplosionSource
}
