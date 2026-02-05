// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Player } from "../player/index.js";
import { Settings } from "./settings.js";
import { Chat, warning, highlight } from "./chat.js";
import { Welcome } from "./welcome.js";

const INIT_KEY = Symbol("Server.initialize");
let _instance = null;

export class Server {
  #players = new Map();
  #settings = new Settings();
  #welcome;
  
  static get instance() {
    return _instance;
  }
  
  static initialize() {
    _instance = new Server(INIT_KEY);
    return _instance;
  }
  
  constructor(key) {
    if (key !== INIT_KEY) {
      throw new Error("Use Server.initialize() instead of new Server()");
    }
    Chat.initialize();
    this.#welcome = new Welcome();
  }
  
  get playerCount() { return this.#players.size; }
  
  get difficulty() { return this.#settings.difficulty; }
  set difficulty(value) { this.#settings.difficulty = value; }
  
  get baseDifficulty() { return this.#settings.baseDifficulty; }
  set baseDifficulty(value) { this.#settings.baseDifficulty = value; }
  
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
    const needsPeaceful = this.allPlayers().some(p => p.preferences.peaceful);
    const target = needsPeaceful ? "peaceful" : this.baseDifficulty;
    
    if (target !== this.#settings.difficulty) {
      this.#settings.difficulty = target;
      Chat.instance.speak(`${warning`[Server]`} Difficulty changed to ${highlight`${target}`}`);
    }
  }
}
