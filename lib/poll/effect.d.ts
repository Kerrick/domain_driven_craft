// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type EffectType = "temporary" | "permanent";

export interface Effect {
  readonly type: EffectType;
  readonly durationSeconds: number | null;
}

export declare function temporary(seconds: number): Effect;
export declare function permanent(): Effect;
