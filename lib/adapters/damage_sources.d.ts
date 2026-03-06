// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DamageSource } from '../types/damage_source'

/**
 * Anti-corruption layer: translates Minecraft damage events into domain value
 * objects.
 */
export class DamageSources {
  /**
   * Maps a Minecraft damage source to the corresponding domain
   * {@link DamageSource}.
   */
  static resolve(
    mcDamageSource: import('@minecraft/server').EntityDamageSource,
  ): DamageSource
}
