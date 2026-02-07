// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Block } from "../block";
import { Player } from "../../player/player";

export interface AnnouncementStrategy {
  onBrokenBy(player: Player): void;
  onGazedAtBy(player: Player): void;
}

export interface AnnouncementStrategyConstructor {
  new (block: Block): AnnouncementStrategy;
}
