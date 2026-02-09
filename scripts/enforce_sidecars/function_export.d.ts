// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/** A function declaration exports just its name. */
export declare class FunctionExport {
  constructor(stmt: import('typescript').FunctionDeclaration)
  /** The function's name as a singleton set. */
  get members(): Set<string>
}
