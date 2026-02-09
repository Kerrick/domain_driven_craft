// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ParsedSource } from './parsed_source.js'
import type ts from 'typescript'

/**
 * Type declaration files (.d.ts) define the public contract for their
 * corresponding implementation file. A sidecar resolves its full member surface
 * — including inherited and interface-sourced members — through TypeScript's
 * type checker.
 */
export declare class Sidecar extends ParsedSource {
  /** Lazily initialized TypeScript type checker shared across all sidecars. */
  static get checker(): ts.TypeChecker
  /** Lazily initialized TypeScript program shared across all sidecars. */
  static get program(): ts.Program

  constructor(path: string)
  /** Qualified names of all declared members, resolved through the type system. */
  get members(): Set<string>
}
