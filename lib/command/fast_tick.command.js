// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { TickSpeedPoll } from "../poll/index.js";

export class FastTickCommand {
  static triggers = ["!fasttick", "!ft"];
  
  execute(player, server) {
    let poll = server.poll(TickSpeedPoll);
    
    if (!poll) {
      const safeSpeed = Math.max(3, 11 - server.playerCount);
      poll = server.startPoll(TickSpeedPoll, safeSpeed, 60);
    }
    
    poll.vote(player);
  }
}
