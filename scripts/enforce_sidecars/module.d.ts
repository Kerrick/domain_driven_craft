// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ParsedSource } from './parsed_source.js'
import type { Sidecar } from './sidecar.js'

/**
 * Implementation files (.js) define exported classes, functions, and constants.
 * Each module knows its public members and can locate its type declaration
 * sidecar.
 */
export declare class Module extends ParsedSource {
  constructor(path: string)
  /** Path to the corresponding .d.ts sidecar. */
  get sidecarPath(): string
  /** Whether the .d.ts sidecar exists on disk. */
  get hasSidecar(): boolean
  /** The matching Sidecar for type-checked member resolution. */
  get sidecar(): Sidecar
  /**
   * Qualified names of all public exported members (e.g.
   * "Polls.asChatSummary").
   */
  get members(): Set<string>
}
