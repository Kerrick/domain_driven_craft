// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Change {
  static permanent(value) { return new Change(value, null) }
  static temporary(value, durationSeconds) { return new Change(value, Date.now() + (durationSeconds * 1000)) }

  #value
  #expiresAt

  constructor(value, expiresAt) {
    this.#value = value
    this.#expiresAt = expiresAt
  }

  get value() { return this.#value }
  get expiresAt() { return this.#expiresAt }
  get isTemporary() { return this.#expiresAt !== null }
}
