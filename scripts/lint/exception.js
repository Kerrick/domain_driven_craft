// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Exception {
  #file
  #lines
  #reason

  constructor(file, lines, reason) {
    this.#file = file
    this.#lines = lines
    this.#reason = reason
  }

  get file() { return this.#file }
  get lines() { return this.#lines }
  get reason() { return this.#reason }
  matches(file, line) { return this.#file === file && this.#lines.includes(line) }
}
