// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const WARNING_THRESHOLD_SECONDS = 15

export class Deadline {
  #expiresAt
  #warned = false

  constructor(durationSeconds) { this.#expiresAt = Date.now() + (durationSeconds * 1000) }
  get isExpired() { return Date.now() >= this.#expiresAt }
  get remainingSeconds() { return Math.max(0, Math.ceil((this.#expiresAt - Date.now()) / 1000)) }
  get shouldWarn() { return !this.#warned && !this.isExpired && this.remainingSeconds <= WARNING_THRESHOLD_SECONDS }
  markWarned() { this.#warned = true }
}
