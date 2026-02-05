// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command } from "./types";
import type { Player } from "../player";

export declare class PeacefulCommand implements Command {
  execute(player: Player): void;
}
