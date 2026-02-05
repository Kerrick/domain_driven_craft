// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DifficultyPoll } from "../poll/index.js";

const VALID_DIFFICULTIES = ["peaceful", "easy", "normal", "hard"];
const DURATION_SECONDS = 900; // 15 minutes

export class DifficultyCommand {
  static triggers = ["!difficulty"];
  static pattern = /^!difficulty\s+(peaceful|easy|normal|hard)$/i;
  
  #targetDifficulty;
  
  constructor(targetDifficulty) {
    this.#targetDifficulty = targetDifficulty;
  }
  
  execute(player, server) {
    let poll = server.poll(DifficultyPoll);
    
    if (poll) {
      if (poll.targetDifficulty === this.#targetDifficulty) {
        poll.vote(player);
      } else {
        server.whisper(player, msg => {
          msg.line(`${msg.warning('A vote for')} ${msg.highlight(poll.targetDifficulty)} ${msg.warning('is already in progress')}`);
        });
      }
    } else {
      poll = server.startPoll(DifficultyPoll, this.#targetDifficulty, DURATION_SECONDS);
      poll.vote(player);
    }
  }
  
  static parse(message) {
    const match = message.match(DifficultyCommand.pattern);
    if (match) {
      return new DifficultyCommand(match[1].toLowerCase());
    }
    
    if (message.toLowerCase().startsWith("!difficulty")) {
      return { 
        execute(player, server) {
          server.whisper(player, msg => {
            msg.line(`${msg.muted('Usage:')} ${msg.command('!difficulty <peaceful|easy|normal|hard>')}`);
          });
        }
      };
    }
    
    return null;
  }
}
