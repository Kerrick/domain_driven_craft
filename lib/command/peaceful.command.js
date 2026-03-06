// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'
import { muted, success, error } from '../server/styles.js'

export class PeacefulCommand {
  static help = { usage: '!peaceful', description: 'Toggle peaceful mode preference' }

  static get trigger() { return '!peaceful' }

  static from(message) {
    return message.toLowerCase().trim() === PeacefulCommand.trigger
      ? new PeacefulCommand()
      : null
  }

  execute(player) {
    const newValue = player.preferences.togglePeaceful()
    if (newValue) Chat.instance.whisper(player,
      [success`✓`, 'Peaceful preference set for you'],
      muted`Hostile mobs cannot damage you. They will still spawn, and knockback is still enabled.`,
    )
    else Chat.instance.whisper(player,
      [error`✗`, 'Peaceful preference unset for you'],
      muted`You are no longer shielded from hostile mob damage.`,
    )
  }
}
