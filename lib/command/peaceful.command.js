// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { muted, success, error } from "../server/chat.js";
import { Server } from "../server/server.js";

export class PeacefulCommand {
  static triggers = ["!peaceful"];
  static help = { usage: "!peaceful", description: "Toggle peaceful mode preference" };
  
  static from(message) {
    return this.triggers.includes(message.toLowerCase().trim()) 
      ? new PeacefulCommand() 
      : null;
  }
  
  execute(player) {
    const newValue = player.preferences.togglePeaceful();
    
    if (newValue) {
      Server.instance.whisper(player,
        [success`✓`, `Peaceful mode enabled for you`],
        muted`Server will switch to peaceful when you're online`
      );
    } else {
      Server.instance.whisper(player,
        [error`✗`, `Peaceful mode disabled`],
        muted`Server will use normal difficulty`
      );
    }
  }
}
