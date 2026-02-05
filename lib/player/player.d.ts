// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { PlayerStats } from "./player_stats";
import type { PreferenceList } from "./preference_list";

export declare class Player {
  constructor(mcPlayer: import("@minecraft/server").Player);
  
  readonly name: string;
  readonly preferences: PreferenceList;
  readonly stats: PlayerStats;
  readonly isOp: boolean;
  
  sendMessage(text: string): void;
  
  brokeBlock(): void;
  placedBlock(): void;
  died(): void;
  killedMob(): void;
}
