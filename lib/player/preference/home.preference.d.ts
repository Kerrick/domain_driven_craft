// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Preference } from './preference'
import type { Location } from '../../types/location'

/**
 * Home location preference. Unlike boolean preferences, this stores a
 * {@link Location} and formats it as coordinates for display.
 */
export declare class HomePreference extends Preference {
  constructor(playerName: string)

  /** The saved home location, or null if not set. */
  location: Location | null
  /** Human-readable home coordinates for display. */
  readonly formatted: string
}
