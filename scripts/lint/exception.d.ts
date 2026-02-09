// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * A lint rule may need to be bypassed in rare cases. An exception records the
 * file, lines, and justification for an approved bypass.
 */
export declare class Exception {
  constructor(file: string, lines: number[], reason: string)
  /** Path of the file this exception applies to. */
  get file(): string
  /** Line numbers covered by this exception. */
  get lines(): number[]
  /** Justification for why this bypass is approved. */
  get reason(): string
  /** Whether this exception covers the given file and line number. */
  matches(file: string, line: number): boolean
}
