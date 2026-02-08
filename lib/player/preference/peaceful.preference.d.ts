// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { BooleanPreference } from './boolean.preference'

/**
 * Peaceful mode preference. When enabled, the server factors this player's
 * preference into the server-wide difficulty calculation.
 */
export declare class PeacefulPreference extends BooleanPreference {
  constructor(playerName: string)
}
