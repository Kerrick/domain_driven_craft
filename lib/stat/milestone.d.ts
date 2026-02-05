// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Stat } from "./stat";

export declare class Milestone {
  constructor(stat: Stat, threshold: number);
  
  static applies(stat: Stat): boolean;
  static check(stat: Stat): void;
  
  celebrate(): void;
}
