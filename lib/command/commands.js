// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { StatusCommand } from "./status.command.js";
import { HelpCommand } from "./help.command.js";
import { PeacefulCommand } from "./peaceful.command.js";
import { FastTickCommand } from "./fast_tick.command.js";

const all = [StatusCommand, HelpCommand, PeacefulCommand, FastTickCommand];

export class Commands {
  #triggers = new Map();
  
  constructor() {
    for (const Cmd of all) {
      for (const trigger of Cmd.triggers) {
        this.#triggers.set(trigger.toLowerCase(), Cmd);
      }
    }
  }
  
  for(message) {
    const Cmd = this.#triggers.get(message.toLowerCase().trim());
    return Cmd ? new Cmd() : null;
  }
}
