// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export declare class PreferenceList {
  constructor(playerName: string);
  
  readonly peaceful: boolean;
  togglePeaceful(): boolean;
}
