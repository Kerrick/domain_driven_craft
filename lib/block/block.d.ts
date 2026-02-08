// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BlockPermutation, Vector3 } from '@minecraft/server'
import { Location } from '../types/location'
import { Player } from '../player/player'
import { AnnouncementStrategyConstructor } from './strategy/announcement.strategy'

/**
 * Players break and discover blocks throughout the world. Certain blocks
 * warrant server-wide announcements — a diamond vein, a mob spawner, ancient
 * debris. This base class matches Minecraft block permutations to domain
 * subclasses and delegates announcement behavior to a pluggable strategy.
 */
export class Block {
  /** Strategy used to announce events for this block type, or null if silent. */
  static readonly AnnouncementStrategy: AnnouncementStrategyConstructor | null

  constructor(location: Location)

  /** Adds a {@link Block} subclass to the type registry for matching. */
  static register(BlockClass: typeof Block): void
  // ACL boundary - takes MC types, translates, produces domain object
  /**
   * Translates a Minecraft block permutation and world position into the
   * matching domain {@link Block} subclass.
   */
  static fromPermutation(
    permutation: BlockPermutation,
    location: Vector3,
  ): Block
  /** Whether this subclass recognizes the given permutation. */
  protected static matches(permutation: BlockPermutation): boolean

  /** Where this block exists in the world. */
  get location(): Location
  /** Human-readable name shown in announcements. */
  get displayName(): string

  /** Notifies the announcement strategy that a player broke this block. */
  brokenBy(player: Player): void
  /** Notifies the announcement strategy that a player gazed at this block. */
  gazedAtBy(player: Player): void
}
