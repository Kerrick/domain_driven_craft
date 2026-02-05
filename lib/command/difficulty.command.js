// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted, highlight, warning, command } from "../server/chat.js";
import { Server } from "../server/server.js";
import { Proposal, DifficultyPoll } from "../poll/index.js";

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
  
  execute(player) {
    if (this.#targetDifficulty === null) {
      this.#showUsage(player);
    } else {
      this.#propose(player);
    }
  }
  
  #showUsage(player) {
    Server.instance.whisper(player,
      [muted`Usage:`, command`!difficulty <peaceful|easy|normal|hard>`]
    );
  }
  
  #propose(player) {
    const existingPoll = Chat.instance.poll(DifficultyPoll);
    
    if (existingPoll && existingPoll.targetDifficulty !== this.#targetDifficulty) {
      Server.instance.whisper(player,
        [warning`A vote for`, highlight`${existingPoll.targetDifficulty}`, warning`is already in progress`]
      );
      return;
    }
    
    const proposal = Proposal.for(DifficultyPoll).by(player).with(this.#targetDifficulty, DURATION_SECONDS);
    Chat.instance.propose(proposal);
  }
}
