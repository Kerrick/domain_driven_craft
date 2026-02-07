// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Notification } from "./notification";

export declare class Notifications {
  add(text: string, seconds: number): void;
  readonly isEmpty: boolean;
  [Symbol.iterator](): Iterator<Notification>;
}
