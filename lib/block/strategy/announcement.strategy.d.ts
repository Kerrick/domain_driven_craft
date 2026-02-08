// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Block } from '../block'
import { Player } from '../../player/player'

/**
 * Different blocks need different announcement rules — diamond ore announces
 * every break, while a mob spawner only announces the first visual discovery.
 * This interface defines the two event hooks a strategy must handle.
 */
export interface AnnouncementStrategy {
  /** Reacts to a player breaking the block. */
  onBrokenBy(player: Player): void
  /** Reacts to a player looking directly at the block. */
  onGazedAtBy(player: Player): void
}

/** Constructor signature for instantiating an {@link AnnouncementStrategy}. */
export interface AnnouncementStrategyConstructor {
  new (block: Block): AnnouncementStrategy
}
