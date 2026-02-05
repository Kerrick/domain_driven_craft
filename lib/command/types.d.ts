// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface Command {
  execute(player: import("../player").Player, server: import("../server").Server): void;
}

export interface CommandClass {
  new(): Command;
  readonly triggers: readonly string[];
}
