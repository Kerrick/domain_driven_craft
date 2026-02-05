// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class StatusCommand {
  static triggers = ["!status"];
  
  static from(message) {
    return this.triggers.includes(message.toLowerCase().trim()) 
      ? new StatusCommand() 
      : null;
  }
  
  execute(player, server) {
    server.whisper(player, msg => {
      msg.line(msg.warning('=== Server Status ==='));
      msg.line(`${msg.muted('Players:')} ${msg.highlight(server.playerCount)}`);
      msg.line(`${msg.muted('Difficulty:')} ${msg.highlight(server.difficulty)}`);
      msg.line(`${msg.muted('Tick speed:')} ${msg.highlight(server.tickSpeed)}`);
      
      const polls = server.activePolls();
      if (polls.length > 0) {
        msg.line(msg.warning('Active votes:'));
        for (const poll of polls) {
          const name = poll.constructor.name.replace('Poll', '');
          msg.line(`  ${msg.muted('•')} ${name}`);
        }
      }
      
      msg.line(`${msg.muted('Type')} ${msg.command('!help')} ${msg.muted('for commands')}`);
    });
  }
}
