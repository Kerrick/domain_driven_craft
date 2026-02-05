// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player as MCPlayer } from "@minecraft/server";
import type { PreferenceList } from "./preference_list";

export declare class Player {
  readonly name: string;
  readonly preferences: PreferenceList;
  readonly mcPlayer: MCPlayer;
  
  constructor(mcPlayer: MCPlayer);
  
  sendMessage(text: string): void;
}
