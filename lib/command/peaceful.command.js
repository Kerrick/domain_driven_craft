// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class PeacefulCommand {
  static triggers = ["!peaceful"];
  
  execute(player, server) {
    const newValue = player.preferences.togglePeaceful();
    
    if (newValue) {
      server.whisper(player, msg => {
        msg.line(`§a✓ Peaceful mode enabled for you`);
        msg.line(`§7Server will switch to peaceful when you're online`);
      });
    } else {
      server.whisper(player, msg => {
        msg.line(`§c✗ Peaceful mode disabled`);
        msg.line(`§7Server will use normal difficulty`);
      });
    }
    
    server.recalculateDifficulty();
  }
}
