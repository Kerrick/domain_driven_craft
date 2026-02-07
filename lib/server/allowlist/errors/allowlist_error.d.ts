// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Gamertag } from "../../../types/gamertag";

export interface AllowlistError extends Error {
  readonly gamertag: Gamertag;
}

export interface AllowlistErrorClass {
  new(gamertag: Gamertag): AllowlistError;
}
