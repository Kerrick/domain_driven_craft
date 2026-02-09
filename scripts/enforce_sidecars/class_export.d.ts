// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * A class declaration exports both its own name and the qualified names of each
 * public member.
 */
export declare class ClassExport {
  constructor(stmt: import('typescript').ClassDeclaration)
  /**
   * Qualified names: "ClassName" plus "ClassName.member" for each public
   * member.
   */
  get members(): Set<string>
}
