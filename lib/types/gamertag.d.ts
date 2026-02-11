// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Minecraft identifies players by a display name and an optional Xbox User ID.
 * This value object pairs them so the domain never confuses two players with
 * similar names.
 */
export declare class Gamertag {
  constructor(name: string, xuid?: string | null)

  /** Display name shown in chat and the player list. */
  readonly name: string
  /** Xbox User ID, if known from the allowlist. */
  readonly xuid: string | null

  /** Identity equality — two gamertags match if their names match (case-insensitive). */
  equals(other: Gamertag): boolean
  /** Serializes for persistence in dynamic properties. */
  toJSON(): { name: string; xuid?: string }
  /** Reconstitutes from persisted data. */
  static from(data: { name: string; xuid?: string }): Gamertag
}
