// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReadonlySetting } from '../types/setting'
import type { Change } from '../types/change'
import type { DifficultyName } from '../types/difficulty'

/**
 * Operators configure the server through named settings (tick speed, AFK
 * threshold, poll timeout). Settings supports both permanent changes and
 * temporary overrides that automatically expire. This registry provides lookup,
 * parsing, and per-tick expiry processing for all settings.
 */
export declare class Settings {
  /** Singleton accessor. */
  static readonly instance: Settings

  /** Server difficulty level. */
  readonly difficulty: ReadonlySetting<DifficultyName>
  /** Random tick speed (controls crop growth, fire spread, etc.). */
  readonly tickSpeed: ReadonlySetting<number>
  /** Duration in seconds for fast-tick poll effects. */
  readonly fasttickDuration: ReadonlySetting<number>
  /** Seconds before a poll expires. */
  readonly pollTimeout: ReadonlySetting<number>
  /** Seconds of inactivity before a player is marked AFK. */
  readonly afkThreshold: ReadonlySetting<number>

  /** Expires any temporary overrides whose deadlines have passed. */
  tick(): void
  /** Every registered setting. */
  all(): ReadonlySetting<unknown>[]
  /** Looks up a setting by name. */
  get(name: string): ReadonlySetting<unknown> | undefined
  /** Parses a string value for the named setting, or null if invalid. */
  parse(name: string, input: string): unknown | null
  /** Applies a permanent or temporary {@link Change} to the named setting. */
  apply(name: string, change: Change): void
  /** Forces the named setting to a specific value (operator override). */
  force(name: string, value: unknown): void
}
