// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BlockPermutation, Vector3 } from "@minecraft/server";
import { Player } from "../player/player.js";

export class Block {
  constructor(permutation: BlockPermutation, location?: Vector3);
  
  static register(BlockClass: typeof Block): void;
  static fromPermutation(permutation: BlockPermutation, location?: Vector3): Block;
  static matches(permutation: BlockPermutation): boolean;
  
  get isNotable(): boolean;
  get displayName(): string;
  
  announceTo(player: Player): void;
}
