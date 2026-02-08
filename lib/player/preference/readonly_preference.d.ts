// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * A read-only snapshot of a preference, safe for display in commands like
 * !preferences. Decoupled from the persistence layer so display code cannot
 * mutate state.
 */
export declare class ReadonlyPreference {
  constructor(name: string, formatted: string, command: string)

  /** Human-readable preference name. */
  readonly name: string
  /** Human-readable current value. */
  readonly formatted: string
  /** The chat command that toggles this preference. */
  readonly command: string
}
