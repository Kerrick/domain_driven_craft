// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { muted, command, warning } from "../server/chat.js";
import { Server } from "../server/server.js";

export class HelpCommand {
  static triggers = ["!help", "!?"];
  
  static from(message) {
    return this.triggers.includes(message.toLowerCase().trim()) 
      ? new HelpCommand() 
      : null;
  }
  
  execute(player) {
    Server.instance.whisper(player,
      warning`=== Commands ===`,
      [command`!status`, muted`—`, `Show server status`],
      [command`!peaceful`, muted`—`, `Toggle peaceful mode preference`],
      [command`!fasttick`, muted`—`, `Vote for faster crop growth`],
      [command`!difficulty <level>`, muted`—`, `Vote to change difficulty`],
      [command`!timeout`, muted`—`, `View/set poll timeout (Op)`],
      [command`!help`, muted`—`, `Show this help`]
    );
  }
}
