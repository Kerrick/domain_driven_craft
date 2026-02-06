// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command } from "./types";
import type { Player } from "../player";

export declare class PreferencesCommand implements Command {
  static readonly trigger: string;
  static readonly help: { usage: string; description: string };
  static from(message: string): PreferencesCommand | null;
  execute(player: Player): void;
}
