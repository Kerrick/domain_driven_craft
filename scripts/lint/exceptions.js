// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Exception } from './exception.js'

export class Exceptions {
  #name
  #set = new Set()

  constructor(name) { this.#name = name }
  get name() { return this.#name }

  allow(file, { line, lines, reason }) {
    const lineNumbers = lines ?? [line]
    this.#set.add(new Exception(file, lineNumbers, reason))
  }

  has(exception) { return this.#set.has(exception) }
  hasLine(file, line) { return [...this.#set].some((e) => e.matches(file, line)) }
  [Symbol.iterator]() { return this.#set[Symbol.iterator]() }
}
