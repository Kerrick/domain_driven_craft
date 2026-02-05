// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class HelpCommand {
  static triggers = ["!help", "!?"];
  
  execute(player, server) {
    server.whisper(player, help => {
      help.line(`§6=== Commands ===`);
      help.line(`§e!status§7 — Show server status`);
      help.line(`§e!peaceful§7 — Toggle peaceful mode preference`);
      help.line(`§e!fasttick§7 — Vote for faster crop growth`);
      help.line(`§e!help§7 — Show this help`);
    });
  }
}
