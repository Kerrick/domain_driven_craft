// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const INSTANCES = new WeakMap();
const INIT_TOKEN = Symbol("Singleton.init");

export class Singleton {
  static #initToken = null;
  
  static get instance() {
    if (!INSTANCES.has(this)) {
      Singleton.#initToken = INIT_TOKEN;
      try {
        INSTANCES.set(this, new this());
      } finally {
        Singleton.#initToken = null;
      }
    }
    return INSTANCES.get(this);
  }
  
  constructor() {
    if (Singleton.#initToken !== INIT_TOKEN) {
      throw new Error(`Use ${this.constructor.name}.instance instead of new ${this.constructor.name}()`);
    }
  }
}
