// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ExplosionSource } from './explosion_source'

/** An explosion from a Creeper's self-destruction attack. */
export class CreeperExplosion extends ExplosionSource {
  /** Always returns an empty list — creepers destroy no blocks. */
  blocksAllowedToImpact(blocks: import('@minecraft/server').Block[]): []
}
