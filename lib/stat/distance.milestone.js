// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Milestone } from './milestone.js'

// Distance thresholds in blocks (1 block ≈ 1 meter)
const THRESHOLDS = [1000, 10000, 100000, 1000000]  // 1km, 10km, 100km, 1000km

export class DistanceMilestone extends Milestone {
  static applies(stat) { return stat.statKey === 'distanceWalked' }
  static get thresholds() { return THRESHOLDS }
}
