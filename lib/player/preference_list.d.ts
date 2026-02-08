// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Location } from '../types/location'
import type { ReadonlyPreference } from './preference/readonly_preference'

/**
 * Players personalize their experience through per-player preferences (coords
 * display, peaceful mode, etc.). This collection owns and persists them.
 */
export declare class PreferenceList {
  constructor(playerName: string)

  /** Whether this player prefers peaceful difficulty. */
  readonly peaceful: boolean
  /** Flips the peaceful preference and returns the new value. */
  togglePeaceful(): boolean
  /** Whether coordinate display is enabled. */
  readonly coords: boolean
  /** Flips the coords preference and returns the new value. */
  toggleCoords(): boolean
  /** Saves a location as this player's home. */
  set home(location: Location)
  /** Human-readable home location for display. */
  readonly homeFormatted: string
  /** Whether this player has set a home. */
  readonly hasHome: boolean
  /** The saved home location, or null if not set. */
  readonly homeLocation: Location | null
  /** All preferences as a read-only snapshot for display. */
  all(): ReadonlyPreference[]
}
