// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { PreferenceList } from "./preference_list";
import type { PlayerStats } from "./player_stats";

export declare class Player {
  readonly name: string;
  readonly preferences: PreferenceList;
  readonly stats: PlayerStats;
  readonly isOp: boolean;
  
  constructor(mcPlayer: import("@minecraft/server").Player);
  
  sendMessage(text: string): void;
}
