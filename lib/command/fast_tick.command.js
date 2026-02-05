// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, success, warning, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Proposal, TickSpeedPoll } from "../poll/index.js";

const DEFAULT_SPEED = 100;
const DURATION_SECONDS = 900;

export class FastTickCommand {
  static get trigger() { return "!fasttick"; }
  static help = { usage: FastTickCommand.trigger, description: "Vote for faster tick speed" };
  
  static from(message) {
    return message.toLowerCase().trim() === FastTickCommand.trigger
      ? new FastTickCommand() 
      : null;
  }
  
  execute(player) {
    const proposal = Proposal.for(TickSpeedPoll).by(player).with(DEFAULT_SPEED, DURATION_SECONDS);
    Chat.instance.propose(proposal);
  }
}
