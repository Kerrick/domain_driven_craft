// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class StatusCommand {
  static triggers = ["!status"];
  
  execute(player, server) {
    server.whisper(player, status => {
      status.line(`§6=== Server Status ===`);
      status.line(`§7Players: §f${server.playerCount()}`);
      status.line(`§7Difficulty: §f${server.settings.difficulty}`);
      status.line(`§7Tick speed: §f${server.settings.tickSpeed}`);
      status.line(`§7Type §f!help§7 for commands`);
    });
  }
}
