// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { AllowlistRepository } from './allowlist_repository'

/**
 * Minecraft's dynamic properties persist key-value pairs across server restarts
 * without external files. This repository uses them as the storage backend for
 * the guest allowlist.
 */
export declare class DynamicPropertyAllowlistRepository implements AllowlistRepository {
  /** Loads resident gamertags from server-admin configuration. */
  loadResidents(): Set<import('../types/gamertag').Gamertag>
  /** Loads guest gamertags from dynamic properties. */
  loadGuests(): Set<import('../types/gamertag').Gamertag>
  /** Persists guest gamertags to dynamic properties. */
  saveGuests(guests: Set<import('../types/gamertag').Gamertag>): void
  /** Grants Minecraft API access to a gamertag. */
  grant(gamertag: import('../types/gamertag').Gamertag): void
  /** Revokes Minecraft API access from a gamertag. */
  revoke(gamertag: import('../types/gamertag').Gamertag): void
}
