// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Preference } from "./preference/preference";

export declare class PreferenceList {
  constructor(playerName: string);
  
  readonly peaceful: boolean;
  togglePeaceful(): boolean;
  setHome(x: number, y: number, z: number, dimension: string): void;
  readonly homeFormatted: string;
  all(): Preference[];
}
