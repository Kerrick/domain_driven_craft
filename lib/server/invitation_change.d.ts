// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Gamertag } from '../types/gamertag'
import type { Allowlist } from './allowlist'
import type { AllowlistRepository } from './allowlist_repository'

/**
 * Granting and revoking invitations share the same workflow: load the
 * allowlist, apply a change, persist it, and sync with the Minecraft API. Each
 * concrete change defines what "apply" and "sync" mean.
 */
export declare class InvitationChange {
  constructor(repository: AllowlistRepository)
  /** Applies the invitation change for the given gamertag and returns it. */
  for(gamertag: Gamertag): Gamertag
  /** Mutates the {@link Allowlist} for this kind of invitation change. */
  protected applyTo(allowlist: Allowlist, gamertag: Gamertag): void
  /** Persists the change through the Minecraft API. */
  protected syncWith(repository: AllowlistRepository, gamertag: Gamertag): void
}
