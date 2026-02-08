// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'
import { Server } from '../server/server.js'
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
    Server.instance.recalculateDifficulty()
    if (newValue) Chat.instance.whisper(player,
      [success`✓`, 'Peaceful mode enabled for you'],
      muted`Server will switch to peaceful when you're online`,
    )
    else Chat.instance.whisper(player,
      [error`✗`, 'Peaceful mode disabled'],
      muted`Server will use normal difficulty`,
    )
  }
}
