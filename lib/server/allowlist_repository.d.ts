// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Gamertag } from "../types/gamertag";

export interface AllowlistRepository {
  loadResidents(): Set<Gamertag>;
  loadGuests(): Set<Gamertag>;
  saveGuests(guests: Set<Gamertag>): void;
  grant(gamertag: Gamertag): void;
  revoke(gamertag: Gamertag): void;
}
