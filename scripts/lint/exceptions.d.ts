// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Exception } from './exception.js'

/**
 * Certain lint rules have approved exceptions. An Exceptions collection records
 * them by file and line so the lint runner can skip known false-positives or
 * justified bypasses.
 */
export declare class Exceptions {
  constructor(name: string)
  /** Human-readable label for this exception collection. */
  get name(): string
  /** Register an approved exception at the given file and line(s). */
  allow(
    file: string,
    opts: { line?: number; lines?: number[]; reason: string },
  ): void
  /** Whether the exact exception instance is registered. */
  has(exception: Exception): boolean
  /** Whether any exception covers the given file and line. */
  hasLine(file: string, line: number): boolean
  /** Iterate over all registered exceptions. */
  [Symbol.iterator](): IterableIterator<Exception>
}
