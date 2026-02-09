// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import ts from 'typescript'

export class VariablesExport {
  #stmt

  constructor(stmt) { this.#stmt = stmt }

  get members() {
    const members = new Set()
    for (const decl of this.#declarations) if (ts.isIdentifier(decl.name)) members.add(decl.name.text)
    return members
  }

  get #declarations() { return this.#stmt.declarationList.declarations }
}
