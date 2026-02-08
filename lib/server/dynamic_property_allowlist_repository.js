// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { variables } from '@minecraft/server-admin'
import { world } from '@minecraft/server'
import { Gamertag } from '../types/gamertag.js'

const KEY = 'allowlist:players'

export class DynamicPropertyAllowlistRepository {
  loadResidents() {
    const raw = variables.get('residents')
    if (!raw) return new Set()
    return new Set(raw.split(',').map((entry) => {
      const [name, xuid] = entry.split(':')
      return new Gamertag(name, xuid ?? null)
    }))
  }

  loadGuests() { return new Set(JSON.parse(world.getDynamicProperty(KEY) ?? '[]') .map((data) => Gamertag.from(data))) }
  saveGuests(guests) { world.setDynamicProperty(KEY, JSON.stringify([...guests].map((g) => g.toJSON()))) }
  grant(gamertag) { world.getDimension('overworld').runCommand(`allowlist add "${gamertag.name}"`) }
  revoke(gamertag) { world.getDimension('overworld').runCommand(`allowlist remove "${gamertag.name}"`) }
}
