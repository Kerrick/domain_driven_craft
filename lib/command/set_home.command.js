// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, success, highlight } from "../server/chat.js";

export class SetHomeCommand {
  static get trigger() { return "!sethome"; }
  static help = { usage: "!sethome", description: "Save spot to teleport back with !home" };
  
  static from(message) {
    return message.toLowerCase().trim() === "!sethome" ? new SetHomeCommand() : null;
  }
  
  execute(player) {
    player.setHome();
    
    Chat.instance.whisper(player,
      [success`✓`, `Home set!`, highlight`${player.preferences.homeFormatted}`]
    );
  }
}
