// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'
import { success, error } from '../server/styles.js'

export class CoordsCommand {
  static help = { usage: '!coords', description: 'Toggle coordinate display' }

  static get trigger() { return '!coords' }
  static from(message) { return message.toLowerCase().trim() === CoordsCommand.trigger ? new CoordsCommand() : null }

  execute(player) {
    const newValue = player.toggleCoords()
    if (newValue) Chat.instance.whisper(player,
      [success`✓`, 'Coordinate display enabled'],
    )
    else Chat.instance.whisper(player,
      [error`✗`, 'Coordinate display disabled'],
    )
  }
}
