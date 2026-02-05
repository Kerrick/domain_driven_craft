// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from "./types";

export declare class TickSpeedPoll implements Poll {
  constructor(speed: number, effectDurationSeconds: number);
}
