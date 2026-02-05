// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReadonlyMilestone } from "../milestone/milestone";

export declare class PlayerStats {
  constructor(playerName: string);
  
  readonly blocksBroken: ReadonlyMilestone;
  readonly blocksPlaced: ReadonlyMilestone;
  readonly deaths: ReadonlyMilestone;
  readonly mobKills: ReadonlyMilestone;
  
  milestones(): ReadonlyMilestone[];
}
