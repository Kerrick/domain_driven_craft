// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Preference } from "./preference";
import type { Location } from "../../types/location";

export declare class HomePreference extends Preference {
  constructor(playerName: string);
  
  location: Location | null;
  readonly formatted: string;
}
