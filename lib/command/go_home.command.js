// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, success, highlight, error } from "../server/chat.js";

export class GoHomeCommand {
  static get trigger() { return "!gohome"; }
  static help = { usage: "!gohome", description: "Teleport to home (set with !sethome)" };
  
  static from(message) {
    return message.toLowerCase().trim() === "!gohome" ? new GoHomeCommand() : null;
  }
  
  execute(player) {
    const before = player.location;
    const after = player.goHome();
    
    if (before.equals(after)) {
      Chat.instance.whisper(player, error`No home set. Use !sethome first.`);
    } else {
      Chat.instance.whisper(player, [success`✓`, `Teleported to`, highlight`${after.formatted}`]);
    }
  }
}
