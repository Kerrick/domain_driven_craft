// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { StatusCommand } from "./status.command.js";
import { HelpCommand } from "./help.command.js";
import { PeacefulCommand } from "./peaceful.command.js";
import { FastTickCommand } from "./fast_tick.command.js";
import { DifficultyCommand } from "./difficulty.command.js";
import { SettingCommand } from "./setting.command.js";
import { TimeoutCommand } from "./timeout.command.js";

const all = [
  StatusCommand,
  HelpCommand,
  PeacefulCommand,
  FastTickCommand,
  DifficultyCommand,
  SettingCommand,
  TimeoutCommand
];

export class Commands {
  static get all() { return all; }
  
  for(message) {
    for (const Cmd of all) {
      const result = Cmd.from(message);
      if (result) return result;
    }
    return null;
  }
}
