// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'

/**
 * The coordinate display component of the action bar. Tracks whether the player
 * has opted in and renders their current position.
 */
export declare class Coords {
  constructor(player: Player)

  /** Turns on coordinate display for this player. */
  enable(): void
  /** Turns off coordinate display for this player. */
  disable(): void
  /** Whether coordinate display is currently active. */
  readonly isEnabled: boolean
  /** The formatted coordinate string for the action bar. */
  readonly text: string
}
