// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Location } from '../types/location'

/**
 * Players move, idle, and accumulate distance. Activity tracks a player's
 * real-time movement and idle duration so the presence system can detect AFK
 * status and stats can record distance walked.
 */
export declare class Activity {
  /** Updates position and accumulates distance and idle time. */
  tick(location: Location, elapsedSeconds: number): void
  /** Resets the idle timer (e.g. on chat or interaction). */
  touch(): void
  /** Seconds since the player last moved or interacted. */
  readonly idleSeconds: number
  /** Cumulative distance moved this session, in blocks. */
  readonly distanceMoved: number
}
