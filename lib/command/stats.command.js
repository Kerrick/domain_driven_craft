// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, warning } from "../server/chat.js";
import { Server } from "../server/server.js";
import { PlayerStats } from "../player/player_stats.js";

export class StatsCommand {
  static get trigger() { return "!stats"; }
  static pattern = new RegExp(`^${StatsCommand.trigger}(?:\\s+(\\S+))?$`, "i");
  static help = { usage: `${StatsCommand.trigger} [player]`, description: "View player stats" };
  
  #targetName;
  
  constructor(targetName = null) {
    this.#targetName = targetName;
  }
  
  static from(message) {
    const match = message.match(StatsCommand.pattern);
    if (match) {
      return new StatsCommand(match[1] || null);
    }
    return null;
  }
  
  execute(player) {
    const targetName = this.#targetName || player.name;
    const target = Server.instance.player(targetName);
    
    let stats;
    if (target) {
      stats = target.stats;
    } else if (this.#targetName) {
      Chat.instance.whisper(player, muted`Player not found`);
      return;
    } else {
      stats = player.stats;
    }
    
    const isSelf = player.name === targetName;
    const header = isSelf ? warning`=== Your Stats ===` : warning`=== ${targetName}'s Stats ===`;
    
    const lines = [header];
    for (const stat of stats.all()) {
      lines.push([muted`${stat.name}:`, highlight`${stat.formatted}`]);
    }
    
    Chat.instance.whisper(player, ...lines);
  }
}
