// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class ClauseExport {
  #clause

  constructor(clause) { this.#clause = clause }

  get members() {
    const members = new Set()
    for (const spec of this.#clause.elements) members.add(spec.name.text)
    return members
  }
}
