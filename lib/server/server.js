// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Player } from "../player/index.js";
import { Singleton } from "../types/singleton.js";
import { Settings } from "../settings/index.js";
import { Chat, highlight } from "./chat.js";
import { Welcome } from "./welcome.js";

export class Server extends Singleton {
  #players = new Map();
  #welcome = new Welcome();
  #lastTickTime = Date.now();
  
  get playerCount() { return this.#players.size; }
  get name() { return "Kerrick's Bedrock Server"; }
  
  tick() {
    Settings.instance.tick();
    
    // Translate ticks → real elapsed seconds (ACL for time)
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - this.#lastTickTime) / 1000);
    
    if (elapsedSeconds > 0) {
      this.#lastTickTime = now;
      for (const player of this.#players.values()) {
        player.played(elapsedSeconds);
      }
    }
    
    // Gaze detection - check what each player is looking at
    for (const player of this.#players.values()) {
      player.checkGaze();
    }
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
      Settings.instance.force("difficulty", target);
      Chat.instance.broadcastWarning(`Difficulty changed to`, highlight`${target}`);
    }
  }
}
