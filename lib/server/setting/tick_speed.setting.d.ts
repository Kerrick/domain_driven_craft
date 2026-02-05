// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting } from "../../types/setting";

export declare class TickSpeedSetting extends Setting<number> {
  get name(): "tickSpeed";
  get current(): number;
  set current(value: number);
  get base(): number;
  set base(value: number);
}
