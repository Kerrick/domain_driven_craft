// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReadonlyPreference } from "./readonly_preference";

export declare class Preference {
  constructor(playerName: string, name: string, command: string);
  
  readonly name: string;
  readonly command: string;
  readonly playerName: string;
  protected storedValue: unknown;
  readonly formatted: string;
  asReadonly(): ReadonlyPreference;
}
