// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { AnnouncementStrategy } from "./announcement.strategy";
import type { Block } from "../block";
import type { Player } from "../../player/player";

export declare class EveryBreak implements AnnouncementStrategy {
  constructor(block: Block);
  announce(player: Player): void;
}
