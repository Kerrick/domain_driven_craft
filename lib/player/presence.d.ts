// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Activity } from "./activity";

export declare class Presence {
  constructor(playerName: string);
  tick(activity: Activity): void;
  readonly isAfk: boolean;
}
