// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type EffectType = "temporary" | "permanent";

export declare class Effect {
  readonly type: EffectType;
  readonly durationSeconds: number | null;
  
  static temporary(seconds: number): Effect;
  static permanent(): Effect;
}
