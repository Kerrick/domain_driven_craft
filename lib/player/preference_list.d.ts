// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Location } from "../types/location";
import type { ReadonlyPreference } from "./preference/readonly_preference";

export declare class PreferenceList {
  constructor(playerName: string);
  
  readonly peaceful: boolean;
  togglePeaceful(): boolean;
  set home(location: Location);
  readonly homeFormatted: string;
  readonly hasHome: boolean;
  readonly homeLocation: Location | null;
  all(): ReadonlyPreference[];
}
