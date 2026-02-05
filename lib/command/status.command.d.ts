// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandHelp } from "./types";
import type { Player } from "../player";

export declare class StatusCommand implements Command {
  static readonly triggers: readonly string[];
  static readonly help: CommandHelp;
  static from(message: string): StatusCommand | null;
  
  execute(player: Player): void;
}
