// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Gamertag } from '../types/gamertag'

/**
 * The allowlist persists across server restarts. Different storage backends
 * (dynamic properties, files) implement this interface so the domain layer
 * stays independent of the persistence mechanism.
 */
export interface AllowlistRepository {
  /** Loads the set of resident gamertags from configuration. */
  loadResidents(): Set<Gamertag>
  /** Loads the set of guest gamertags from persistent storage. */
  loadGuests(): Set<Gamertag>
  /** Persists the current guest set. */
  saveGuests(guests: Set<Gamertag>): void
  /** Grants Minecraft API access to a gamertag. */
  grant(gamertag: Gamertag): void
  /** Revokes Minecraft API access from a gamertag. */
  revoke(gamertag: Gamertag): void
}
