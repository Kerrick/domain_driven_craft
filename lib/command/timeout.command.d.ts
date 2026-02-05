// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandHelp } from "./types";
import type { Player } from "../player";

export declare class TimeoutCommand implements Command {
  static readonly pattern: RegExp;
  static readonly help: CommandHelp;
  static from(message: string): TimeoutCommand | null;
  
  constructor();
  constructor(seconds: number);
  
  execute(player: Player): void;
}
