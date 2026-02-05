// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Poll } from "./poll";
import type { DifficultyPoll } from "./difficulty.poll";
import type { TickSpeedPoll } from "./tick_speed.poll";
import type { DifficultyName } from "../types/difficulty";

type PollClass<T extends Poll = Poll> = new (...args: any[]) => T;

// Poll-specific constructor args
type DifficultyPollArgs = [targetDifficulty: DifficultyName, effectDurationSeconds: number];
type TickSpeedPollArgs = [speed: number, effectDurationSeconds: number];

// Type-safe args based on poll type
type PollArgs<T extends Poll> = 
  T extends DifficultyPoll ? DifficultyPollArgs :
  T extends TickSpeedPoll ? TickSpeedPollArgs :
  any[];

export declare class Proposal<T extends Poll = Poll> {
  readonly player: Player;
  readonly PollClass: PollClass<T>;
  readonly args: PollArgs<T>;
  
  static for<T extends Poll>(PollClass: PollClass<T>): {
    by(player: Player): {
      with(...args: PollArgs<T>): Proposal<T>;
    };
  };
}
