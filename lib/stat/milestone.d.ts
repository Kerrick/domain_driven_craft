// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Stat } from "./stat";

export declare class Milestone {
  constructor(stat: Stat);
  
  static applies(stat: Stat): boolean;
  
  thresholdReached(): number | null;
  check(): void;
  celebrate(): void;
}
