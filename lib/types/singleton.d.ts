// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export declare abstract class Singleton {
  static readonly instance: Singleton | null;
  protected static initialize(...args: unknown[]): Singleton;
}
