// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Effect {
  #type;
  #durationSeconds;
  
  constructor(type, durationSeconds) {
    this.#type = type;
    this.#durationSeconds = durationSeconds;
  }
  
  get type() { return this.#type; }
  get durationSeconds() { return this.#durationSeconds; }
  
  static temporary(seconds) {
    return new Effect("temporary", seconds);
  }
  
  static permanent() {
    return new Effect("permanent", null);
  }
}
