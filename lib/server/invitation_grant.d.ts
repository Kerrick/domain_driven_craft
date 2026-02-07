// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Gamertag } from "../types/gamertag";
import type { AllowlistRepository } from "./allowlist_repository";

export declare class InvitationGrant {
  constructor(repository: AllowlistRepository);
  for(gamertag: Gamertag): Gamertag;
}
