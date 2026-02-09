// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/** A variable statement exports each declared binding name. */
export declare class VariablesExport {
  constructor(stmt: import('typescript').VariableStatement)
  /** Each declared variable binding name. */
  get members(): Set<string>
}
