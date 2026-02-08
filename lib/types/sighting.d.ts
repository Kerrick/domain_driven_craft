// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Location } from './location'
import { Player } from '../player/player'

/**
 * Some block announcements should only fire once per player (e.g. first
 * sighting of a spawner). This value object tracks which players have already
 * seen a specific block at a specific location.
 */
export class Sighting {
  constructor(location: Location, type: string)
  /** Whether this player has already been notified about this block. */
  hasBeenSeenBy(player: Player): boolean
  /** Records that this player has now seen this block. */
  markSeenBy(player: Player): void
}
