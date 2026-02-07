// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting } from "../../types/setting";

export declare class AfkThresholdSetting extends Setting<number> {
  get name(): "afkThreshold";
}
