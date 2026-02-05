// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Player } from "../player/index.js";
import { Singleton } from "../types/singleton.js";
import { Settings } from "../settings/index.js";
import { Chat, highlight } from "./chat.js";
import { Welcome } from "./welcome.js";
import { Change } from "../types/change.js";

export class Server extends Singleton {
  #players = new Map();
  #welcome = new Welcome();
  
  get playerCount() { return this.#players.size; }
  get name() { return "Kerrick's Bedrock Server"; }
  
  tick() {
    Settings.instance.tick();
  }
  
  player(name) {
    return this.#players.get(name);
  }
  
  allPlayers() {
    return Array.from(this.#players.values());
  }
  
  playerJoined(mcPlayer) {
    const p = new Player(mcPlayer);
    this.#players.set(p.name, p);
    this.#welcome.greet(p);
    Chat.instance.notifyConditionChange();
    this.recalculateDifficulty();
  }
  
  playerLeft(name) {
    this.#players.delete(name);
    for (const poll of Chat.instance.activePolls()) {
      poll.playerLeft(name);
    }
    this.recalculateDifficulty();
  }
  
  recalculateDifficulty() {
    const difficulty = Settings.instance.difficulty;
    const needsPeaceful = this.allPlayers().some(p => p.preferences.peaceful);
    const target = needsPeaceful ? "peaceful" : difficulty.base;
    
    if (target !== difficulty.current) {
      Settings.instance.apply("difficulty", Change.permanent(target));
      Chat.instance.broadcastWarning(`Difficulty changed to`, highlight`${target}`);
    }
  }
}
