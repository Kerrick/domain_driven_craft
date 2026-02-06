// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { PlayerStats } from "./player_stats";
import type { PreferenceList } from "./preference_list";
import type { Block } from "../block/block";

export declare class Player {
  constructor(mcPlayer: import("@minecraft/server").Player);
  
  readonly name: string;
  readonly preferences: PreferenceList;
  readonly stats: PlayerStats;
  readonly isOp: boolean;
  
  sendMessage(text: string): void;
  
  // Domain actions
  brokeBlock(block: Block): void;
  gazedAt(block: Block): void;
  checkGaze(): void;
  placedBlock(): void;
  died(): void;
  killedMob(): void;
  played(seconds: number): void;
}
