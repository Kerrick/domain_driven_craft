// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Notification {
  #text
  #expiresAt

  constructor(text, seconds) {
    this.#text = text
    this.#expiresAt = Date.now() + (seconds * 1000)
  }

  get text() { return this.#text }
  get expired() { return Date.now() >= this.#expiresAt }
}
