// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const INIT_TOKEN = Symbol("Singleton.init");

export class Singleton {
  static _instance = null;
  static #initToken = null;
  
  static get instance() {
    if (!this._instance) {
      Singleton.#initToken = INIT_TOKEN;
      try {
        this._instance = new this();
      } finally {
        Singleton.#initToken = null;
      }
    }
    return this._instance;
  }
  
  constructor() {
    if (Singleton.#initToken !== INIT_TOKEN) {
      throw new Error(`Use ${this.constructor.name}.instance instead of new ${this.constructor.name}()`);
    }
  }
}
