// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { readFileSync, globSync } from 'node:fs'

export class Lint {
  static load(exceptions) { return new Lint(exceptions, exceptions.name) }

  #exceptions
  #name

  constructor(exceptions, name) {
    this.#exceptions = exceptions
    this.#name = name
  }

  enforce(glob, pattern, violationName) {
    const files = globSync(glob)
    const found = []
    for (const file of files) {
      const lines = readFileSync(file, 'utf-8').split('\n')
      for (let n = 0; n < lines.length; n++) {
        const line = lines[n]
        const lineNum = n + 1
        if (this.#isComment(line)) continue
        if (!pattern.test(line)) continue
        if (this.#exceptions.hasLine(file, lineNum)) continue
        found.push(`${file}:${lineNum}: ${line.trim()}`)
      }
    }
    if (found.length > 0) {
      console.error(`❌ Unapproved ${violationName} found:`)
      for (const v of found) console.error(`  ${v}`)
      console.error(
        `\nAdd to ${this.#name} with justification if truly unavoidable.`,
      )
      process.exit(1)
    }
    console.log(`✅ No unapproved ${violationName} found`)
  }

  #isComment(line) { return /^\s*\*\s/.test(line) || /^\s*\/\*\*\s/.test(line) }
}
