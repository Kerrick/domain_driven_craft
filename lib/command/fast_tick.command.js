// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class FastTickCommand {
  static triggers = ["!fasttick", "!ft"];
  
  execute(player, server) {
    const poll = server.activePoll;
    
    if (poll && poll.isActive) {
      poll.vote(player);
    } else {
      server.startPoll(player);
    }
  }
}
