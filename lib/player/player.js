// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PreferenceList } from "./preference_list.js";
import { PlayerStats } from "./player_stats.js";

export class Player {
  #mcPlayer;
  #preferences;
  #stats;
  
  constructor(mcPlayer) {
    this.#mcPlayer = mcPlayer;
    this.#preferences = new PreferenceList(mcPlayer.name);
    this.#stats = new PlayerStats(mcPlayer.name);
  }
  
  get name() {
    return this.#mcPlayer.name;
  }
  
  get preferences() {
    return this.#preferences;
  }
  
  get stats() {
    return this.#stats;
  }
  
  get isOp() {
    return this.#mcPlayer.isOp();
  }
  
  sendMessage(text) {
    this.#mcPlayer.sendMessage(text);
  }
}
