// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Stat } from "./stat";

interface MilestoneClass {
  applies(stat: Stat): boolean;
  isReached(stat: Stat): boolean;
  new(stat: Stat): Milestone;
}

export declare class Milestone {
  constructor(stat: Stat);
  
  static applies(stat: Stat): boolean;
  static isReached(stat: Stat): boolean;
  
  celebrate(): void;
}
