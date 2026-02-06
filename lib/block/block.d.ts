// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BlockPermutation } from "@minecraft/server";

export class Block {
  constructor(permutation: BlockPermutation);
  
  static register(BlockClass: typeof Block): void;
  static fromPermutation(permutation: BlockPermutation): Block;
  static matches(permutation: BlockPermutation): boolean;
  
  get isNotable(): boolean;
  get displayName(): string;
}
