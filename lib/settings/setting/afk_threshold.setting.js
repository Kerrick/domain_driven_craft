// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from '@minecraft/server'
import { Setting } from '../../types/setting.js'

const KEY = 'afk_threshold'
const DEFAULT = 300

/** @extends {Setting<number>} */
export class AfkThresholdSetting extends Setting {
  static settingName = 'afkThreshold'

  get name() { return AfkThresholdSetting.settingName }
  get current() { return Number(world.getDynamicProperty(KEY) ?? DEFAULT) }
  set current(value) { world.setDynamicProperty(KEY, Number(value)) }
  get base() { return DEFAULT }

  set base(value) {
    // No base persistence
  }

  parse(input) {
    const value = parseInt(input, 10)
    return isNaN(value) ? null : value
  }
}
