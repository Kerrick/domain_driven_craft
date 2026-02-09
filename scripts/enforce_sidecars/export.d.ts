// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type ts from 'typescript'

/**
 * Each exported statement in a source file knows its own qualified member
 * names. A class export offers "ClassName" and "ClassName.member" entries; a
 * function export offers just its name; and so on.
 */
export declare class Export {
  /**
   * Wraps an AST statement in the appropriate polymorphic subtype, or returns
   * null if the statement has no extractable exports.
   */
  static from(stmt: ts.Statement): Export | null
  /** Qualified member names this export contributes. */
  get members(): Set<string>
}
