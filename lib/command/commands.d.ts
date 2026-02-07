// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from "./types";
import { Singleton } from "../types/singleton.js";

export declare class Commands extends Singleton {
  static readonly instance: Commands;
  register(...CommandClasses: CommandClass[]): void;
  for(message: string): Command | null;
  all(): Set<CommandClass>;
}
