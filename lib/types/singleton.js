// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const INIT_TOKEN = Symbol('Singleton.init')

export class Singleton {
  static _instance = null

  static get instance() { return this._instance ||= new this(INIT_TOKEN) }

  constructor(initToken) {
    if (initToken !== INIT_TOKEN) throw new Error(`Use ${this.constructor.name}.instance instead of new ${this.constructor.name}()`)
  }
}
