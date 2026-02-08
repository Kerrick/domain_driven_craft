// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Change } from './change'

/**
 * Read-only view of a setting, exposed to code that needs the current value but
 * should not modify it.
 */
export interface ReadonlySetting<T> {
  /** Unique name used for lookup and chat commands. */
  readonly name: string
  /** Effective value (base value with any active override applied). */
  readonly current: T
  /** Configured default value before any overrides. */
  readonly base: T
  /** Whether a temporary override is currently active. */
  readonly hasOverride: boolean
  /** Seconds until the current override expires, or null if none. */
  readonly overrideRemaining: number | null
}

/**
 * Mutable setting with parsing, override, and expiry support. Subclasses define
 * the name and parse logic for each concrete setting.
 */
export declare class Setting<T> implements ReadonlySetting<T> {
  /** Name used to register this setting. */
  static readonly settingName: string
  /** Unique name for this setting. */
  get name(): string
  /** Effective value. */
  get current(): T
  /** Sets the effective value directly. */
  set current(value: T)
  /** Configured default. */
  get base(): T
  /** Sets the configured default. */
  set base(value: T)
  /** Parses user input into a typed value, or null if invalid. */
  parse(input: string): T | null

  /** Whether a temporary override is active. */
  readonly hasOverride: boolean
  /** Seconds remaining on the active override. */
  readonly overrideRemaining: number | null

  /** Announces that a temporary override has expired. */
  announceExpiry(): void
  /** Applies a permanent or temporary {@link Change}. */
  apply(change: Change): void
  /** Forces the setting to a specific value (operator override). */
  force(value: T): void
  /** Checks and expires any active temporary override. */
  tick(): void
  /** Returns a read-only view of this setting. */
  asReadonly(): ReadonlySetting<T>
}
