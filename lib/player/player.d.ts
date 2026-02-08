// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { PlayerStats } from './player_stats'
import type { PreferenceList } from './preference_list'
import type { Location } from '../types/location'
import type { Block } from '../block/block'

/**
 * A player on the server. Wraps the Minecraft Player API with domain-specific
 * behavior: preferences, statistics, action bar, and block interactions.
 */
export declare class Player {
  constructor(mcPlayer: import('@minecraft/server').Player)

  /** In-game display name. */
  readonly name: string
  /** Per-player settings like coords display and peaceful mode. */
  readonly preferences: PreferenceList
  /** Cumulative gameplay statistics. */
  readonly stats: PlayerStats
  /** Whether this player has operator privileges. */
  readonly isOp: boolean
  /** Whether this player is excluded from poll quorum (e.g. AFK). */
  readonly abstains: boolean
  /** Whether this player is away from keyboard. */
  readonly isAfk: boolean
  /** Current position in the world. */
  readonly location: Location

  /** Sends a raw message to this player's chat. */
  sendMessage(text: string): void
  /** Saves a location as this player's home. */
  set home(location: Location)
  /** Teleports the player to their saved home and returns the destination. */
  goHome(): Location

  /** Toggles coordinate display on the action bar. */
  toggleCoords(): boolean
  /** Shows a temporary notification on the action bar. */
  showNotification(text: string, seconds: number): void
  /** Refreshes the action bar text for the current tick. */
  updateActionBar(): void

  // Domain actions
  /** Records that this player broke a block. */
  brokeBlock(block: Block): void
  /** Records that this player is looking at a block (for visual discovery). */
  gazedAt(block: Block): void
  /** Processes any pending gaze-based announcements. */
  checkGaze(): void
  /** Records that this player placed a block. */
  placedBlock(): void
  /** Records that this player died. */
  died(): void
  /** Records that this player killed a mob. */
  killedMob(): void
  /** Records a hotbar slot change (resets AFK timer). */
  changedHotbarSlot(): void
  /** Accumulates play time for this tick interval. */
  played(seconds: number): void
}
