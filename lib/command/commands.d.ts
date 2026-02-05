// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from "./types";

export declare class Commands {
  static readonly all: readonly CommandClass[];
  for(message: string): Command | null;
}
