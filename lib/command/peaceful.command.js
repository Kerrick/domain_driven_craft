// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, success, error } from "../server/chat.js";

export class PeacefulCommand {
  static get trigger() { return "!peaceful"; }
  static help = { usage: PeacefulCommand.trigger, description: "Toggle peaceful mode preference" };
  
  static from(message) {
    return message.toLowerCase().trim() === PeacefulCommand.trigger
      ? new PeacefulCommand() 
      : null;
  }
  
  execute(player) {
    const newValue = player.preferences.togglePeaceful();
    
    if (newValue) {
      Chat.instance.whisper(player,
        [success`✓`, `Peaceful mode enabled for you`],
        muted`Server will switch to peaceful when you're online`
      );
    } else {
      Chat.instance.whisper(player,
        [error`✗`, `Peaceful mode disabled`],
        muted`Server will use normal difficulty`
      );
    }
  }
}
