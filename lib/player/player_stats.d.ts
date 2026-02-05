// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Milestone, ReadonlyMilestone } from "../milestone/milestone";

export declare class PlayerStats {
  constructor(playerName: string);
  
  readonly blocksBroken: ReadonlyMilestone;
  readonly blocksPlaced: ReadonlyMilestone;
  readonly deaths: ReadonlyMilestone;
  readonly mobKills: ReadonlyMilestone;
  
  milestones(): ReadonlyMilestone[];
  
  /** @internal */
  _mutableBlocksBroken(): Milestone;
  /** @internal */
  _mutableBlocksPlaced(): Milestone;
  /** @internal */
  _mutableDeaths(): Milestone;
  /** @internal */
  _mutableMobKills(): Milestone;
}
