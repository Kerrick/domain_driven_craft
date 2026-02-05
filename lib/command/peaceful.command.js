// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class PeacefulCommand {
  static triggers = ["!peaceful"];
  
  static from(message) {
    return this.triggers.includes(message.toLowerCase().trim()) 
      ? new PeacefulCommand() 
      : null;
  }
  
  execute(player, server) {
    const newValue = player.preferences.togglePeaceful();
    
    if (newValue) {
      server.whisper(player, msg => {
        msg.line(`${msg.success('✓')} Peaceful mode enabled for you`);
        msg.line(msg.muted('Server will switch to peaceful when you\'re online'));
      });
    } else {
      server.whisper(player, msg => {
        msg.line(`${msg.error('✗')} Peaceful mode disabled`);
        msg.line(msg.muted('Server will use normal difficulty'));
      });
    }
    
    server.recalculateDifficulty();
  }
}
