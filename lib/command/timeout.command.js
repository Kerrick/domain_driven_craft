// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class TimeoutCommand {
  static triggers = ["!timeout"];
  static pattern = /^!timeout\s+(\d+)$/i;
  
  #seconds;
  
  constructor(seconds) {
    this.#seconds = seconds;
  }
  
  execute(player, server) {
    if (!player.isOp) {
      server.whisper(player, msg => msg.line(msg.error('Only operators can change poll timeout')));
      return;
    }
    
    server.pollTimeout = this.#seconds;
    server.speak(msg => {
      msg.line(`${msg.success('[Server]')} Poll timeout set to ${msg.highlight(server.pollTimeout)}s by ${msg.highlight(player.name)}`);
    });
  }
  
  static parse(message) {
    const match = message.match(TimeoutCommand.pattern);
    if (match) {
      return new TimeoutCommand(parseInt(match[1], 10));
    }
    
    if (message.toLowerCase() === "!timeout") {
      return {
        execute(player, server) {
          server.whisper(player, msg => {
            msg.line(`${msg.muted('Poll timeout:')} ${msg.highlight(server.pollTimeout)}s`);
            msg.line(`${msg.muted('Usage (Op only):')} ${msg.command('!timeout <seconds>')}`);
          });
        }
      };
    }
    
    return null;
  }
}
