// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command } from "./types";

export declare class TimeoutCommand implements Command {
  constructor();
  constructor(seconds: number);
  
  static from(message: string): TimeoutCommand | null;
  
  execute(player: import("../player").Player, server: import("../server").Server): void;
}
