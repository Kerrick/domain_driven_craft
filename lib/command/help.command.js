// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class HelpCommand {
  static triggers = ["!help", "!?"];
  
  static from(message) {
    return this.triggers.includes(message.toLowerCase().trim()) 
      ? new HelpCommand() 
      : null;
  }
  
  execute(player, server) {
    server.whisper(player, msg => {
      msg.line(msg.warning('=== Commands ==='));
      msg.line(`${msg.command('!status')} ${msg.muted('—')} Show server status`);
      msg.line(`${msg.command('!peaceful')} ${msg.muted('—')} Toggle peaceful mode preference`);
      msg.line(`${msg.command('!fasttick')} ${msg.muted('—')} Vote for faster crop growth`);
      msg.line(`${msg.command('!difficulty <level>')} ${msg.muted('—')} Vote to change difficulty`);
      msg.line(`${msg.command('!timeout')} ${msg.muted('—')} View/set poll timeout (Op)`);
      msg.line(`${msg.command('!help')} ${msg.muted('—')} Show this help`);
    });
  }
}
