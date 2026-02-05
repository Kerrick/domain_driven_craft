// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { muted, highlight, warning, command } from "../server/chat.js";
import { DifficultyPoll } from "../poll/index.js";

const DURATION_SECONDS = 900;

export class DifficultyCommand {
  static pattern = /^!difficulty\s+(peaceful|easy|normal|hard)$/i;
  
  #targetDifficulty;
  
  constructor(targetDifficulty = null) {
    this.#targetDifficulty = targetDifficulty;
  }
  
  static from(message) {
    const match = message.match(DifficultyCommand.pattern);
    if (match) {
      return new DifficultyCommand(match[1].toLowerCase());
    }
    
    if (message.toLowerCase().startsWith("!difficulty")) {
      return new DifficultyCommand();
    }
    
    return null;
  }
  
  execute(player, server) {
    if (this.#targetDifficulty === null) {
      this.#showUsage(player, server);
    } else {
      this.#startOrJoinVote(player, server);
    }
  }
  
  #showUsage(player, server) {
    server.whisper(player,
      `${muted`Usage:`} ${command`!difficulty <peaceful|easy|normal|hard>`}`
    );
  }
  
  #startOrJoinVote(player, server) {
    let poll = server.poll(DifficultyPoll);
    
    if (poll) {
      if (poll.targetDifficulty === this.#targetDifficulty) {
        poll.vote(player);
      } else {
        server.whisper(player,
          `${warning`A vote for`} ${highlight`${poll.targetDifficulty}`} ${warning`is already in progress`}`
        );
      }
    } else {
      poll = server.startPoll(DifficultyPoll, this.#targetDifficulty, DURATION_SECONDS);
      poll.vote(player);
    }
  }
}
