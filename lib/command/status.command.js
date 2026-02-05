// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class StatusCommand {
  static triggers = ["!status"];
  
  execute(player, server) {
    server.whisper(player, msg => {
      msg.line(msg.warning('=== Server Status ==='));
      msg.line(`${msg.muted('Players:')} ${msg.highlight(server.playerCount)}`);
      msg.line(`${msg.muted('Difficulty:')} ${msg.highlight(server.difficulty)}`);
      msg.line(`${msg.muted('Tick speed:')} ${msg.highlight(server.tickSpeed)}`);
      msg.line(`${msg.muted('Type')} ${msg.command('!help')} ${msg.muted('for commands')}`);
    });
  }
}
