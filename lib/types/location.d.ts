// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { DimensionName } from './dimension'

/**
 * A position in the world. Minecraft uses floating-point coordinates but block
 * interactions use integer grid positions. This value object exposes both.
 */
export declare class Location {
  constructor(x: number, y: number, z: number, dimension: DimensionName)

  /** East–west position (positive = east). */
  readonly x: number
  /** Vertical position (positive = up). */
  readonly y: number
  /** North–south position (positive = south). */
  readonly z: number
  /** Block-grid X (integer). */
  readonly blockX: number
  /** Block-grid Y (integer). */
  readonly blockY: number
  /** Block-grid Z (integer). */
  readonly blockZ: number
  /** Which Dimension (such as the Nether) is this Point in? */
  readonly dimension: DimensionName
  /** Human-readable string for display in chat or the action bar. */
  readonly formatted: string

  /** Whether two locations refer to the same position. */
  equals(other: Location | null): boolean
  /** Euclidean distance to another location. */
  distanceFrom(other: Location): number
  /** Serializes for persistence in dynamic properties. */
  toJSON(): { x: number; y: number; z: number; dimension: DimensionName }
  /** Reconstitutes from persisted JSON, or null if the data is invalid. */
  static fromJSON(json: string | object | null): Location | null
}
