// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BlockPermutation, Vector3 } from "@minecraft/server";
import { Location } from "../types/location";
import { Player } from "../player/player";
import { AnnouncementStrategyConstructor } from "./strategy/announcement.strategy";

export class Block {
  static AnnouncementStrategy: AnnouncementStrategyConstructor | null;
  
  constructor(location: Location);
  
  static register(BlockClass: typeof Block): void;
  // ACL boundary - takes MC types, translates, produces domain object
  static fromPermutation(permutation: BlockPermutation, location: Vector3): Block;
  protected static matches(permutation: BlockPermutation): boolean;
  
  get location(): Location;
  get displayName(): string;
  
  brokenBy(player: Player): void;
  gazedAtBy(player: Player): void;
}
