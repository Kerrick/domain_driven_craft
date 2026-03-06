// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'

/**
 * The server aggregate root tracks all connected players and coordinates
 * per-tick processing. It translates Minecraft player-join and player-leave
 * events into domain objects.
 */
export declare class Server {
  /** Singleton accessor. */
  static readonly instance: Server

  /** Number of players currently online. */
  readonly playerCount: number
  /** World name from Minecraft. */
  readonly name: string
  /** Server-wide operator-configurable settings. */
  readonly settings: import('../settings/settings').Settings

  /** Advances all per-tick processing (settings, polls, presence). */
  tick(): void

  /** Looks up a connected player by gamertag. */
  player(name: string): Player | undefined
  /** Every connected player, including AFK ones. */
  allPlayers(): Set<Player>
  /** Only players who are not AFK. */
  activePlayers(): Set<Player>

  /** Wraps a Minecraft player in a domain {@link Player} and tracks it. */
  playerJoined(mcPlayer: import('@minecraft/server').Player): void
  /** Removes the named player from tracking. */
  playerLeft(name: string): void
}
