// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandHelp } from "./types";
import type { Player } from "../player";

export declare class SettingCommand implements Command {
  static readonly trigger: string;
  static readonly pattern: RegExp;
  static readonly help: CommandHelp;
  static from(message: string): SettingCommand | null;
  
  constructor();
  constructor(name: string);
  constructor(name: string, value: string);
  
  execute(player: Player): void;
}
