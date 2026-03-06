// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DamageSource } from './damage_source'

/** Damage originating from a hostile mob. */
export class HostileDamageSource extends DamageSource {
  /** Always true — hostile mobs are the source. */
  get isHostile(): true
}
