// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DamageSource } from './damage_source.js'

export class HostileDamageSource extends DamageSource {
  get isHostile() { return true }
}
