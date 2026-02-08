// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class ReadonlyPreference {
  #name
  #formatted
  #command

  constructor(name, formatted, command) {
    this.#name = name
    this.#formatted = formatted
    this.#command = command
  }

  get name() { return this.#name }
  get formatted() { return this.#formatted }
  get command() { return this.#command }
}
