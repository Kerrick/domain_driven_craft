// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, warning } from "../server/chat.js";
import { Server } from "../server/server.js";
import { PlayerStats } from "../player/player_stats.js";

export class MilestonesCommand {
  static get trigger() { return "!milestones"; }
  static pattern = new RegExp(`^${MilestonesCommand.trigger}(?:\\s+(\\S+))?$`, "i");
  static help = { usage: `${MilestonesCommand.trigger} [player]`, description: "View milestones" };
  
  #targetName;
  
  constructor(targetName = null) {
    this.#targetName = targetName;
  }
  
  static from(message) {
    const match = message.match(MilestonesCommand.pattern);
    if (match) {
      return new MilestonesCommand(match[1] || null);
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
      // Player not online, but we can still show stats from dynamic properties
      stats = new PlayerStats(targetName);
    } else {
      Chat.instance.whisper(player, muted`Player not found`);
      return;
    }
    
    const isSelf = player.name === targetName;
    const header = isSelf ? warning`=== Your Milestones ===` : warning`=== ${targetName}'s Milestones ===`;
    
    const lines = [header];
    for (const milestone of stats.milestones()) {
      lines.push([muted`${milestone.name}:`, highlight`${milestone.count.formatted()}`]);
    }
    
    Chat.instance.whisper(player, ...lines);
  }
}
