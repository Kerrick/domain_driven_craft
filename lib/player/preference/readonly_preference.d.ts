// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export declare class ReadonlyPreference {
  constructor(name: string, formatted: string, command: string);
  
  readonly name: string;
  readonly formatted: string;
  readonly command: string;
}
