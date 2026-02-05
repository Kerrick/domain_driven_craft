// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { StatusCommand } from "./status.command.js";
import { HelpCommand } from "./help.command.js";
import { PeacefulCommand } from "./peaceful.command.js";
import { FastTickCommand } from "./fast_tick.command.js";
import { DifficultyCommand } from "./difficulty.command.js";
import { TimeoutCommand } from "./timeout.command.js";

const simpleCommands = [StatusCommand, HelpCommand, PeacefulCommand, FastTickCommand];
const patternCommands = [DifficultyCommand, TimeoutCommand];

export class Commands {
  #triggers = new Map();
  
  constructor() {
    for (const Cmd of simpleCommands) {
      for (const trigger of Cmd.triggers) {
        this.#triggers.set(trigger.toLowerCase(), Cmd);
      }
    }
  }
  
  for(message) {
    const trigger = message.toLowerCase().trim();
    
    const SimpleCmd = this.#triggers.get(trigger);
    if (SimpleCmd) {
      return new SimpleCmd();
    }
    
    for (const PatternCmd of patternCommands) {
      const result = PatternCmd.parse(message);
      if (result) return result;
    }
    
    return null;
  }
}
