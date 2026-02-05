// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Player } from "../player/index.js";
import { Settings } from "./settings.js";
import { Chat } from "./chat.js";
import { Welcome } from "./welcome.js";

export class Server {
  #players = new Map();
  #chat = new Chat();
  #settings = new Settings();
  #welcome;
  #polls = new Map();
  
  constructor() {
    this.#welcome = new Welcome(this);
  }
  
  get chat() { return this.#chat; }
  get settings() { return this.#settings; }
  get welcome() { return this.#welcome; }
  get playerCount() { return this.#players.size; }
  
  get difficulty() { return this.#settings.difficulty; }
  set difficulty(value) { this.#settings.difficulty = value; }
  
  get tickSpeed() { return this.#settings.tickSpeed; }
  set tickSpeed(value) { this.#settings.tickSpeed = value; }
  
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
    for (const poll of this.#polls.values()) {
      poll.playerLeft(name);
    }
    this.recalculateDifficulty();
  }
  
  whisper(player, compose) {
    this.#chat.whisper(player, compose);
  }
  
  speak(compose) {
    this.#chat.speak(compose);
  }
  
  hear(message) {
    return this.#chat.hear(message);
  }
  
  recalculateDifficulty() {
    const needsPeaceful = this.allPlayers().some(p => p.preferences.peaceful);
    const target = needsPeaceful ? "peaceful" : "normal";
    
    if (target !== this.#settings.difficulty) {
      this.#settings.difficulty = target;
      this.speak(msg => msg.line(`${msg.warning('[Server]')} Difficulty changed to ${msg.highlight(target)}`));
    }
  }
  
  poll(PollClass) {
    return this.#polls.get(PollClass);
  }
  
  startPoll(PollClass, ...args) {
    const p = new PollClass(this, ...args);
    this.#polls.set(PollClass, p);
    return p;
  }
  
  clearPoll(poll) {
    for (const [cls, p] of this.#polls.entries()) {
      if (p === poll) {
        this.#polls.delete(cls);
        break;
      }
    }
  }
}
