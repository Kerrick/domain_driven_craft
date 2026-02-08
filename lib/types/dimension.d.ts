// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/** Domain-friendly dimension name. */
export type DimensionName = 'overworld' | 'nether' | 'end'

/** Maps Minecraft's internal dimension IDs to domain names. */
export declare const DIMENSION_MAP: Record<string, DimensionName>
/** All valid dimension names. */
export declare const DIMENSIONS: DimensionName[]
/** Translates a Minecraft dimension ID string to a {@link DimensionName}. */
export declare function toDomainDimension(mcDimension: string): DimensionName
