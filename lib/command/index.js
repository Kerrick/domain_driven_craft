// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { StatusCommand } from "./status.command.js";
import { HelpCommand } from "./help.command.js";
import { PeacefulCommand } from "./peaceful.command.js";
import { FastTickCommand } from "./fast_tick.command.js";

export { StatusCommand, HelpCommand, PeacefulCommand, FastTickCommand };

const allCommands = [StatusCommand, HelpCommand, PeacefulCommand, FastTickCommand];

const triggerMap = new Map();
for (const CommandClass of allCommands) {
  for (const trigger of CommandClass.triggers) {
    triggerMap.set(trigger.toLowerCase(), CommandClass);
  }
}

export function parse(message) {
  const CommandClass = triggerMap.get(message.toLowerCase().trim());
  return CommandClass ? new CommandClass() : null;
}
