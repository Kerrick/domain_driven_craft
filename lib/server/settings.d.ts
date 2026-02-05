// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Setting, ReadonlySetting } from "../types/setting";
import type { DifficultyName } from "../types/difficulty";
import type { DifficultySetting } from "./setting/difficulty.setting";
import type { TickSpeedSetting } from "./setting/tick_speed.setting";
import type { FasttickDurationSetting } from "./setting/fasttick_duration.setting";
import type { PollTimeoutSetting } from "./setting/poll_timeout.setting";

export declare class Settings {
  readonly difficulty: DifficultySetting;
  readonly tickSpeed: TickSpeedSetting;
  readonly fasttickDuration: FasttickDurationSetting;
  readonly pollTimeout: PollTimeoutSetting;
  
  tick(): void;
  all(): Setting<unknown>[];
  get(name: string): Setting<unknown> | undefined;
}
