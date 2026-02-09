// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type ts from 'typescript'

/**
 * Source files need to be parsed to extract their exported members. Both
 * implementation files (.js) and type declarations (.d.ts) share the same need
 * for AST access and barrel detection.
 */
export declare class ParsedSource {
  constructor(path: string, scriptKind: ts.ScriptKind)
  /** Absolute or relative path to the source file. */
  get path(): string
  /** Lazily parsed AST of the source file. */
  get ast(): ts.SourceFile
  /** Statements marked with the `export` keyword or `export { … }` clauses. */
  get exportedStatements(): ts.Statement[]
  /** Whether this file only re-exports from other modules. */
  get isBarrel(): boolean
}
