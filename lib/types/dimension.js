// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const DIMENSION_MAP = {
  "minecraft:overworld": "overworld",
  "minecraft:nether": "nether",
  "minecraft:the_end": "end"
};

export const DIMENSIONS = Object.values(DIMENSION_MAP);

// eslint-disable-next-line no-restricted-syntax -- needs migration to a proper ACL class eventually
export function toDomainDimension(mcDimension) {
  return DIMENSION_MAP[mcDimension] ?? "overworld";
}
