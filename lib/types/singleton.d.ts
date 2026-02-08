// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Several domain objects (Server, Chat, Commands) exist exactly once per world.
 * This base class enforces that constraint with a lazy-initialized singleton
 * accessor.
 */
export declare abstract class Singleton {
  /** Backing storage for the singleton instance. */
  protected static _instance: Singleton | null
  /** The single instance, created on first access. */
  static readonly instance: Singleton
}
