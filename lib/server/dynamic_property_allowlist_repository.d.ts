// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { AllowlistRepository } from "./allowlist_repository";

export declare class DynamicPropertyAllowlistRepository implements AllowlistRepository {
  loadResidents(): Set<import("../types/gamertag").Gamertag>;
  loadGuests(): Set<import("../types/gamertag").Gamertag>;
  saveGuests(guests: Set<import("../types/gamertag").Gamertag>): void;
  grant(gamertag: import("../types/gamertag").Gamertag): void;
  revoke(gamertag: import("../types/gamertag").Gamertag): void;
}
