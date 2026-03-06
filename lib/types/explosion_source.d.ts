// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/** An explosion that destroys blocks in the world. */
export class ExplosionSource {
  /** Blocks this explosion may destroy, or null for default behavior. */
  blocksAllowedToImpact(
    blocks: import('@minecraft/server').Block[],
  ): import('@minecraft/server').Block[] | null
}
