// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Count {
  #value;
  
  constructor(value) {
    this.#value = value;
  }
  
  get value() { return this.#value; }
  
  get isMilestone() {
    return this.#value > 0 && Math.log10(this.#value) % 1 === 0;
  }
  
  incremented() {
    return new Count(this.#value + 1);
  }
  
  formatted() {
    return this.#value.toLocaleString();
  }
}
