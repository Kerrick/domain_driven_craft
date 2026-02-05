// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Poll } from "../poll/poll";
import type { Proposal } from "../poll/proposal";

export declare class Polls {
  timeout: number;
  
  propose<T extends Poll>(proposal: Proposal<T>): T;
  get<T extends Poll>(PollClass: new (...args: any[]) => T): T | undefined;
  active(): Poll[];
  check(): void;
  clear(poll: Poll): void;
  notifyConditionChange(): void;
}
