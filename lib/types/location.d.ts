// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export declare class Location {
  constructor(x: number, y: number, z: number, dimension: string);
  
  readonly x: number;
  readonly y: number;
  readonly z: number;
  /** The world dimension: "minecraft:overworld", "minecraft:nether", or "minecraft:the_end" */
  readonly dimension: string;
  readonly formatted: string;
  
  toJSON(): { x: number; y: number; z: number; dimension: string };
  static fromJSON(json: string | object | null): Location | null;
}
