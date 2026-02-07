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

export declare class Setting<T> implements ReadonlySetting<T> {
  get name(): string;
  get current(): T;
  set current(value: T);
  get base(): T;
  set base(value: T);
  parse(input: string): T | null;
  
  readonly hasOverride: boolean;
  readonly overrideRemaining: number | null;
  
  announceExpiry(): void;
  apply(change: Change): void;
  force(value: T): void;
  tick(): void;
  asReadonly(): ReadonlySetting<T>;
}
