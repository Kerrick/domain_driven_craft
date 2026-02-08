// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, muted } from '../server/chat.js'
import { Settings } from '../settings/index.js'

export class Presence {
  #afk = false
  #playerName

  constructor(playerName) { this.#playerName = playerName }

  tick(activity) {
    const threshold = Settings.instance.afkThreshold.current
    if (!this.#afk && activity.idleSeconds >= threshold) {
      this.#afk = true
      Chat.instance.speak(muted`[AFK] ${this.#playerName} is now AFK`)
      Chat.instance.notifyConditionChange()
    } else if (this.#afk && activity.idleSeconds < threshold) {
      this.#afk = false
      Chat.instance.speak(muted`[AFK] ${this.#playerName} is back`)
      Chat.instance.notifyConditionChange()
    }
  }

  get isAfk() { return this.#afk }
}
