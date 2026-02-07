// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandHelp } from "./types";
import type { InvitationRevocation } from "../server/invitation_revocation";

export declare class UninviteCommand implements Command {
  static readonly trigger: string;
  static readonly pattern: RegExp;
  static readonly help: CommandHelp;
  static useCase: InvitationRevocation;

  static from(message: string): UninviteCommand | null;
  execute(player: import("../player/player").Player): void;
}
