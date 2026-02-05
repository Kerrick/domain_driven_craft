// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Player } from "../player/index.js";
import { Poll } from "../poll/index.js";
import { Settings } from "./settings.js";
import { Chat } from "./chat.js";
import { Welcome } from "./welcome.js";

export class Server {
  #players = new Map();
  #chat = new Chat();
  #settings = new Settings();
  #welcome;
  #activePoll = null;
  
  constructor() {
    this.#welcome = new Welcome(this);
  }
  
  get chat() { return this.#chat; }
  get settings() { return this.#settings; }
  get welcome() { return this.#welcome; }
  get activePoll() { return this.#activePoll; }
  get playerCount() { return this.#players.size; }
  
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
    this.recalculateDifficulty();
  }
  
  playerLeft(name) {
    this.#players.delete(name);
    if (this.#activePoll) {
      this.#activePoll.playerLeft(name);
    }
    this.recalculateDifficulty();
  }
  
  whisper(player, compose) {
    this.#chat.whisper(player, compose);
  }
  
  speak(compose) {
    this.#chat.speak(compose);
  }
  
  recalculateDifficulty() {
    const needsPeaceful = this.allPlayers().some(p => p.preferences.peaceful);
    const target = needsPeaceful ? "peaceful" : "normal";
    
    if (target !== this.#settings.difficulty) {
      this.#settings.difficulty = target;
      this.speak(msg => msg.line(`§e[Server] Difficulty changed to ${target}`));
    }
  }
  
  startPoll(initiator) {
    const safeSpeed = Math.max(3, 11 - this.playerCount);
    this.#activePoll = new Poll(this, safeSpeed, 60);
    this.#activePoll.vote(initiator);
  }
  
  clearPoll() {
    this.#activePoll = null;
  }
}
