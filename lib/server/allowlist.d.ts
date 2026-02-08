// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Gamertag } from '../types/gamertag'

/**
 * The allowlist controls who can join the server. It distinguishes between
 * residents (permanent seed players) and guests (invited at runtime). Residents
 * cannot be removed through commands.
 */
export declare class Allowlist {
  constructor(residents: Iterable<Gamertag>, guests: Iterable<Gamertag>)

  /** Adds a gamertag to the guest list. */
  invite(gamertag: Gamertag): void
  /** Removes a gamertag from the guest list. */
  uninvite(gamertag: Gamertag): void
  /** Whether this gamertag is on the allowlist (resident or guest). */
  has(gamertag: Gamertag): boolean
  /** Whether this gamertag is a permanent resident. */
  isResident(gamertag: Gamertag): boolean
  /** Whether this gamertag is a runtime guest. */
  isGuest(gamertag: Gamertag): boolean
  /** All current guests. */
  readonly guests: Set<Gamertag>;

  /** Yields all gamertags (residents and guests). */
  [Symbol.iterator](): Iterator<Gamertag>
}
