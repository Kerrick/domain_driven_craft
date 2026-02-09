// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/** A named export clause exports each re-exported name. */
export declare class ClauseExport {
  constructor(clause: import('typescript').NamedExports)
  /** Each re-exported name from the clause. */
  get members(): Set<string>
}
