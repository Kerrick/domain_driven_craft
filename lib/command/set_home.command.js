// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from "../server/chat.js";
import { success, highlight } from "../server/styles.js";

export class SetHomeCommand {
  static get trigger() { return "!sethome"; }
  static help = { usage: "!sethome", description: "Save spot to teleport back with !gohome" };
  
  static from(message) {
    return message.toLowerCase().trim() === "!sethome" ? new SetHomeCommand() : null;
  }
  
  execute(player) {
    player.home = player.location;
    
    Chat.instance.whisper(player,
      [success`✓`, `Home set!`, highlight`${player.preferences.homeFormatted}`]
    );
  }
}
