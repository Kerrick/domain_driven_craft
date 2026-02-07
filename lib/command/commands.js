// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Singleton } from "../types/singleton.js";

export class Commands extends Singleton {
  #list = new Set();
  
  register(...CommandClasses) {
    for (const Cmd of CommandClasses) {
      this.#list.add(Cmd);
    }
  }
  
  for(message) {
    for (const Cmd of this.#list) {
      const result = Cmd.from(message);
      if (result) return result;
    }
    return null;
  }
  
  all() {
    return this.#list;
  }
}
