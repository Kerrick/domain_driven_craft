// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from "./types";
import type { Server } from "../server";

export declare class TickSpeedPoll implements Poll {
  constructor(server: Server, speed: number, durationSeconds: number);
  
  vote(player: import("../player").Player): void;
  playerLeft(name: string): void;
}
