// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Coords } from "./coords.js";
import { Notifications } from "./notifications.js";
import { muted } from "../../server/styles.js";

export class ActionBar {
  #mcPlayer;
  #coords;
  #notifications;
  
  constructor(player, mcPlayer) {
    this.#mcPlayer = mcPlayer;
    this.#coords = new Coords(player);
    this.#notifications = new Notifications();
  }
  
  enableCoords() {
    this.#coords.enable();
  }
  
  disableCoords() {
    this.#coords.disable();
  }
  
  notify(text, seconds) {
    this.#notifications.add(text, seconds);
  }
  
  tick() {
    const text = this.asText;
    if (text) {
      this.#mcPlayer.onScreenDisplay.setActionBar(text);
    }
  }
  
  get asText() {
    return [...this].map(item => item.text).join(` ${muted`|`} `) || null;
  }
  
  *[Symbol.iterator]() {
    if (this.#coords.isEnabled) yield this.#coords;
    yield* this.#notifications;
  }
  
  forEach(fn) {
    for (const item of this) fn(item);
  }
}
