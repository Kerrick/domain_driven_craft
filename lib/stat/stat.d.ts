// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player/player";

export declare class Stat {
  constructor(player: Player, name: string, statKey: string, verb: string, noun: string);
  
  readonly name: string;
  readonly statKey: string;
  readonly playerName: string;
  readonly verb: string;
  readonly noun: string;
  readonly count: number;
  
  increment(amount?: number): number;
  readonly formatted: string;
}
