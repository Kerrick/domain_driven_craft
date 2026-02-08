// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Preference } from './preference'

/**
 * Many player preferences are simple on/off toggles — coordinates display,
 * peaceful mode. This base class adds toggle and formatting behavior to
 * {@link Preference} for boolean-valued settings.
 */
export declare class BooleanPreference extends Preference {
  /** Whether this preference is currently on. */
  readonly enabled: boolean
  /** Flips the preference and returns the new value. */
  toggle(): boolean
  /** Human-readable "on" or "off" for display in chat. */
  readonly formatted: string
}
