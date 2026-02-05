// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Count } from "../types/count";

export interface ReadonlyMilestone {
  readonly name: string;
  readonly count: Count;
  format(): string;
}

export declare class Milestone {
  constructor(playerName: string, name: string, statKey: string, verb: string, noun: string);
  
  readonly name: string;
  readonly statKey: string;
  readonly count: Count;
  
  increment(): Count;
  format(): string;
  asReadonly(): ReadonlyMilestone;
}
