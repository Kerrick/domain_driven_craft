// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import ts from 'typescript'
import { ClassExport } from './class_export.js'
import { FunctionExport } from './function_export.js'
import { VariablesExport } from './variables_export.js'
import { ClauseExport } from './clause_export.js'

export class Export {
  static #kinds = new Map([
    [ts.SyntaxKind.ClassDeclaration, (s) => s.name ? new ClassExport(s) : null],
    [ts.SyntaxKind.FunctionDeclaration, (s) => s.name ? new FunctionExport(s) : null],
    [ts.SyntaxKind.VariableStatement, (s) => new VariablesExport(s)],
    [ts.SyntaxKind.ExportDeclaration, (s) => {
      if (s.exportClause && ts.isNamedExports(s.exportClause)) return new ClauseExport(s.exportClause)
      return null
    }],
  ])

  static from(stmt) { return Export.#kinds.get(stmt.kind)?.(stmt) ?? null }
}
