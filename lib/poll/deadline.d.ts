// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface Deadline {
  readonly isExpired: boolean;
  readonly remainingSeconds: number;
  readonly shouldWarn: boolean;
  markWarned(): void;
}
