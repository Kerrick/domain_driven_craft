// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { existsSync } from 'node:fs'
import ts from 'typescript'
import { ParsedSource } from './parsed_source.js'
import { Sidecar } from './sidecar.js'
import { Export } from './export.js'

export class Module extends ParsedSource {
  #members

  constructor(path) { super(path, ts.ScriptKind.JS) }
  get sidecarPath() { return this.path.replace(/\.js$/, '.d.ts') }
  get hasSidecar() { return existsSync(this.sidecarPath) }
  get sidecar() { return new Sidecar(this.sidecarPath) }

  get members() {
    this.#members ??= this.#extractMembers()
    return this.#members
  }

  #extractMembers() {
    const members = new Set()
    for (const stmt of this.exportedStatements) {
      const exp = Export.from(stmt)
      if (exp) for (const name of exp.members) members.add(name)
    }
    return members
  }
}
