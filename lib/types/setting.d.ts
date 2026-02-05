// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Change } from "./change";

export interface ReadonlySetting<T> {
  readonly name: string;
  readonly current: T;
  readonly base: T;
  readonly hasOverride: boolean;
  readonly overrideRemaining: number | null;
}

export declare abstract class Setting<T> implements ReadonlySetting<T> {
  abstract get name(): string;
  abstract get current(): T;
  abstract set current(value: T);
  abstract get base(): T;
  abstract set base(value: T);
  abstract parse(input: string): T | null;
  
  readonly hasOverride: boolean;
  readonly overrideRemaining: number | null;
  
  announceExpiry(): void;
  apply(change: Change): void;
  tick(): void;
  asReadonly(): ReadonlySetting<T>;
}
