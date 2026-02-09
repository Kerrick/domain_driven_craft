// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import ts from 'typescript'

export class ClassExport {
  #stmt

  constructor(stmt) { this.#stmt = stmt }

  get members() {
    const className = this.#stmt.name.text
    const members = new Set([className])
    for (const m of this.#stmt.members) {
      if (!m.name) continue
      const name = ts.isComputedPropertyName(m.name)
        ? null
        : m.name.text
      if (name && !name.startsWith('#')) members.add(`${className}.${name}`)
    }
    return members
  }
}
