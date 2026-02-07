// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export declare class Gamertag {
  constructor(name: string, xuid?: string | null);

  readonly name: string;
  readonly xuid: string | null;

  equals(other: Gamertag): boolean;
  toJSON(): { name: string; xuid?: string };
  static from(data: { name: string; xuid?: string }): Gamertag;
}
