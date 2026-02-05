// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Proposal, TickSpeedPoll } from "../poll/index.js";

export class FastTickCommand {
  static triggers = ["!fasttick", "!ft"];
  static help = { usage: "!fasttick", description: "Vote for faster crop growth" };
  
  static from(message) {
    return this.triggers.includes(message.toLowerCase().trim()) 
      ? new FastTickCommand() 
      : null;
  }
  
  execute(player) {
    const safeSpeed = Math.max(3, 11 - Server.instance.playerCount);
    const proposal = Proposal.for(TickSpeedPoll).by(player).with(safeSpeed, 60);
    Chat.instance.propose(proposal);
  }
}
