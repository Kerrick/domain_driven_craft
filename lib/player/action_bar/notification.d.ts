// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export declare class Notification {
  constructor(text: string, seconds: number);
  
  readonly text: string;
  readonly expired: boolean;
}
