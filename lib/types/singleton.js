// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const INIT_KEYS = new WeakMap();

export class Singleton {
  static get instance() {
    return INIT_KEYS.get(this)?._instance;
  }
  
  static initialize(...args) {
    const key = Symbol(`${this.name}.initialize`);
    INIT_KEYS.set(this, { key, _instance: null });
    const instance = new this(key, ...args);
    INIT_KEYS.get(this)._instance = instance;
    return instance;
  }
  
  constructor(key) {
    const expected = INIT_KEYS.get(this.constructor)?.key;
    if (key !== expected) {
      throw new Error(`Use ${this.constructor.name}.instance instead of new ${this.constructor.name}()`);
    }
  }
}
