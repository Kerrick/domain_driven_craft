// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { StatusCommand } from "./status.command.js";
// eslint-disable-next-line import/no-cycle -- see doc/contributors/lint.md §1
import { HelpCommand } from "./help.command.js";
import { PeacefulCommand } from "./peaceful.command.js";
import { FastTickCommand } from "./fast_tick.command.js";
import { SettingCommand } from "./setting.command.js";
import { TimeoutCommand } from "./timeout.command.js";
import { StatsCommand } from "./stats.command.js";
import { PreferencesCommand } from "./preferences.command.js";
import { SetHomeCommand } from "./set_home.command.js";
import { GoHomeCommand } from "./go_home.command.js";

export const ALL_COMMANDS = [
  StatusCommand,
  HelpCommand,
  PeacefulCommand,
  PreferencesCommand,
  SetHomeCommand,
  GoHomeCommand,
  FastTickCommand,
  SettingCommand,
  TimeoutCommand,
  StatsCommand,
];
