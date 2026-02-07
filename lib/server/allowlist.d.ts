// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Gamertag } from "../types/gamertag";

export declare class Allowlist {
  constructor(residents: Iterable<Gamertag>, guests: Iterable<Gamertag>);

  invite(gamertag: Gamertag): void;
  uninvite(gamertag: Gamertag): void;
  has(gamertag: Gamertag): boolean;
  isResident(gamertag: Gamertag): boolean;
  isGuest(gamertag: Gamertag): boolean;
  readonly guests: Set<Gamertag>;

  [Symbol.iterator](): Iterator<Gamertag>;
}
