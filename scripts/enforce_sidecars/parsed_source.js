// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { readFileSync } from 'node:fs'
import ts from 'typescript'

export class ParsedSource {
  #path
  #scriptKind
  #ast

  constructor(path, scriptKind) {
    this.#path = path
    this.#scriptKind = scriptKind
  }

  get path() { return this.#path }

  get ast() {
    if (!this.#ast) {
      const content = readFileSync(this.#path, 'utf-8')
      this.#ast = ts.createSourceFile(
        this.#path,
        content,
        ts.ScriptTarget.Latest,
        true,
        this.#scriptKind,
      )
    }
    return this.#ast
  }

  get exportedStatements() {
    return this.ast.statements.filter((s) => {
      const mods = ts.canHaveModifiers(s) ? ts.getModifiers(s) : undefined
      return (
        mods?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ||
        ts.isExportDeclaration(s)
      )
    })
  }

  get isBarrel() {
    const exported = this.exportedStatements
    return (
      exported.length > 0 &&
      exported.every((s) => ts.isExportDeclaration(s) && s.moduleSpecifier)
    )
  }
}
