// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ALL_COMMANDS } from "./registry.js";

export class Commands {
  static get all() { return ALL_COMMANDS; }
  
  for(message) {
    for (const Cmd of ALL_COMMANDS) {
      const result = Cmd.from(message);
      if (result) return result;
    }
    return null;
  }
}
