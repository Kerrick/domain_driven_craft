// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Command } from "./types";

export declare class FastTickCommand implements Command {
  execute(player: import("../player").Player, server: import("../server").Server): void;
}
