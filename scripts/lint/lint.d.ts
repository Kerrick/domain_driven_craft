// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Exceptions } from './exceptions.js'

/**
 * Enforcing project conventions requires scanning files for forbidden patterns
 * while respecting approved exceptions. A Lint instance owns that
 * scan-and-report workflow.
 */
export declare class Lint {
  /** Creates a Lint from an Exceptions collection, using its name. */
  static load(exceptions: Exceptions): Lint
  constructor(exceptions: Exceptions, name: string)
  /** Scans files matching the glob for the pattern, reports violations. */
  enforce(glob: string, pattern: RegExp, violationName: string): void
}
