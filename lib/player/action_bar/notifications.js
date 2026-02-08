// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Notification } from './notification.js'

export class Notifications {
  #items

  constructor() { this.#items = [] }
  add(text, seconds) { this.#items.push(new Notification(text, seconds)) }

  get isEmpty() {
    this.#prune()
    return this.#items.length === 0
  }

  *[Symbol.iterator]() {
    this.#prune()
    yield* this.#items
  }

  #prune() {
    while (this.#items.length > 0 && this.#items[0].expired) this.#items.shift()
  }
}

