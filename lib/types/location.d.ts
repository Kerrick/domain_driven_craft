// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { DimensionName } from "./dimension";

export declare class Location {
  constructor(x: number, y: number, z: number, dimension: DimensionName);
  
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly dimension: DimensionName;
  readonly formatted: string;
  
  equals(other: Location | null): boolean;
  toJSON(): { x: number; y: number; z: number; dimension: DimensionName };
  static fromJSON(json: string | object | null): Location | null;
}
