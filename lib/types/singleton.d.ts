// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export declare abstract class Singleton {
  protected static _instance: Singleton | null;
  static readonly instance: Singleton;
}
