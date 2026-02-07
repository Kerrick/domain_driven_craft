// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandHelp } from "./types";
import type { InvitationGrant } from "../server/invitation_grant";

export declare class InviteCommand implements Command {
  static readonly trigger: string;
  static readonly pattern: RegExp;
  static readonly help: CommandHelp;
  static useCase: InvitationGrant;

  static from(message: string): InviteCommand | null;
  execute(player: import("../player/player").Player): void;
}
