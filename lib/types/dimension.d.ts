// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type DimensionName = "overworld" | "nether" | "end";

export declare const DIMENSION_MAP: Record<string, DimensionName>;
export declare const DIMENSIONS: DimensionName[];
export declare function toDomainDimension(mcDimension: string): DimensionName;
