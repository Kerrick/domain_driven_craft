// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export interface CommandHelp {
  usage: string;
  description: string;
}

export interface Command {
  execute(player: Player): void;
}

export interface CommandClass {
  new(...args: any[]): Command;
  readonly triggers?: readonly string[];
  readonly pattern?: RegExp;
  readonly help?: CommandHelp;
  from(message: string): Command | null;
}
