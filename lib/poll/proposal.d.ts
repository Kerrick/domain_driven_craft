// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from '../player'
import type { Poll } from './poll'
import type { TickSpeedPoll } from './tick_speed.poll'

type PollClass<T extends Poll = Poll> = new (...args: any[]) => T

// Poll-specific constructor args
type TickSpeedPollArgs = [speed: number, effectDurationSeconds: number]

// Type-safe args based on poll type
type PollArgs<T extends Poll> =
  /** Resolves to the concrete argument tuple for the given poll type. */
  T extends TickSpeedPoll ? TickSpeedPollArgs : any[]

/**
 * Starting a poll requires a player, a poll type, and type-specific arguments.
 * Proposal bundles these together with a fluent builder so commands can
 * construct polls without knowing the full constructor signature.
 */
export declare class Proposal<T extends Poll = Poll> {
  /** The player who initiated this proposal. */
  readonly player: Player
  /** The poll type being proposed. */
  readonly PollClass: PollClass<T>
  /** Constructor arguments for the poll. */
  readonly args: PollArgs<T>

  /** Begins building a proposal for the given poll type. */
  static for<T extends Poll>(
    PollClass: PollClass<T>,
  ): {
    by(player: Player): {
      with(...args: PollArgs<T>): Proposal<T>
    }
  }
}
