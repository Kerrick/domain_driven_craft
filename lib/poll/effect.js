// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

class Effect {
  #type;
  #durationSeconds;
  
  constructor(type, durationSeconds) {
    this.#type = type;
    this.#durationSeconds = durationSeconds;
  }
  
  get type() { return this.#type; }
  get durationSeconds() { return this.#durationSeconds; }
}

export function temporary(seconds) {
  return new Effect("temporary", seconds);
}

export function permanent() {
  return new Effect("permanent", null);
}
