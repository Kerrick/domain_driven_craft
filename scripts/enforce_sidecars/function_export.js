// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class FunctionExport {
  #stmt

  constructor(stmt) { this.#stmt = stmt }
  get members() { return new Set([this.#stmt.name.text]) }
}
