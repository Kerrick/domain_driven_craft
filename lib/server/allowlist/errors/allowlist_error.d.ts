// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Gamertag } from '../../../types/gamertag'

/** Domain error thrown when an allowlist operation violates a business rule. */
export interface AllowlistError extends Error {
  /** The gamertag the operation targeted. */
  readonly gamertag: Gamertag
}

/** Constructor signature for {@link AllowlistError} implementations. */
export interface AllowlistErrorClass {
  new (gamertag: Gamertag): AllowlistError
}
