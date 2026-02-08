// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'

/**
 * The action bar is the single text line above the hotbar. It multiplexes
 * coordinates, notifications, and the default hotbar text for each player.
 */
export declare class ActionBar {
  constructor(player: Player, mcPlayer: import('@minecraft/server').Player)

  /** Turns on coordinate display. */
  enableCoords(): void
  /** Turns off coordinate display. */
  disableCoords(): void
  /** Queues a temporary notification on the action bar. */
  notify(text: string, seconds: number): void
  /** Advances timers and refreshes the display for this tick. */
  tick(): void
  /** The current text to display, or null if nothing is active. */
  readonly asText: string | null;
  /** Iterates over active display items. */
  [Symbol.iterator](): Iterator<{ text: string }>
  /** Iterates over active display items with a callback. */
  forEach(fn: (item: { text: string }) => void): void
}
