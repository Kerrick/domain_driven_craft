// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { globSync } from 'node:fs'
import { resolve } from 'node:path'
import ts from 'typescript'
import { ParsedSource } from './parsed_source.js'

export class Sidecar extends ParsedSource {
  static #program
  static #checker

  static get checker() {
    if (!Sidecar.#program) {
      const files = globSync('lib/**/*.d.ts').map((f) => resolve(f))
      Sidecar.#program = ts.createProgram(files, {
        target: ts.ScriptTarget.Latest,
        module: ts.ModuleKind.ES2022,
        moduleResolution: ts.ModuleResolutionKind.Node10,
      })
      Sidecar.#checker = Sidecar.#program.getTypeChecker()
    }
    return Sidecar.#checker
  }

  static get program() {
    Sidecar.checker
    return Sidecar.#program
  }

  #members

  constructor(path) { super(path, ts.ScriptKind.TS) }

  get members() {
    this.#members ??= this.#resolveMembers()
    return this.#members
  }

  #resolveMembers() {
    const sf = Sidecar.program.getSourceFile(resolve(this.path))
    if (!sf) return new Set()
    const moduleSymbol = Sidecar.checker.getSymbolAtLocation(sf)
    if (!moduleSymbol) return new Set()
    const members = new Set()
    for (const exp of Sidecar.checker.getExportsOfModule(moduleSymbol)) {
      const name = exp.getName()
      members.add(name)
      const decl = exp.valueDeclaration ?? exp.declarations?.[0]
      if (!decl) continue
      const type = Sidecar.checker.getTypeOfSymbolAtLocation(exp, decl)
      for (const prop of type.getProperties()) members.add(`${name}.${prop.getName()}`)
      for (const sig of type.getConstructSignatures()) for (const prop of sig.getReturnType().getProperties()) members.add(`${name}.${prop.getName()}`)
    }
    return members
  }
}
