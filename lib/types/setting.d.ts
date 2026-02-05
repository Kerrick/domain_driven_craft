// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Change } from "./change";

export declare class Setting<T> {
  constructor(
    name: string,
    getCurrent: () => T,
    setCurrent: (value: T) => void,
    getBase: () => T,
    setBase: (value: T) => void,
    announcer: () => void
  );
  
  readonly name: string;
  readonly current: T;
  readonly base: T;
  readonly hasOverride: boolean;
  readonly overrideRemaining: number | null;
  
  apply(change: Change): void;
  tick(): void;
}
