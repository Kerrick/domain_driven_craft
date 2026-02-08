// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReadonlyPreference } from './readonly_preference'

/**
 * Base class for per-player preferences. Each preference has a name, a toggle
 * command, and a persisted value keyed by player name.
 */
export declare class Preference {
  constructor(playerName: string, name: string, command: string)

  /** Human-readable preference name (e.g. "Coords"). */
  readonly name: string
  /** The chat command that toggles this preference. */
  readonly command: string
  /** The player this preference belongs to. */
  readonly playerName: string
  /** The persisted value, read from dynamic properties. */
  protected storedValue: unknown
  /** Human-readable current value for display. */
  readonly formatted: string
  /** Returns a read-only snapshot for safe display. */
  asReadonly(): ReadonlyPreference
}
