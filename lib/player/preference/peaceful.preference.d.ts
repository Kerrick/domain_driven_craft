// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Preference } from "./preference";

export declare class PeacefulPreference extends Preference {
  constructor(playerName: string);
  
  readonly enabled: boolean;
  toggle(): boolean;
  readonly formatted: string;
}
