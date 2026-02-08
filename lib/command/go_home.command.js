// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'
import { success, highlight, error } from '../server/styles.js'

export class GoHomeCommand {
  static help = { usage: '!gohome', description: 'Teleport to home (set with !sethome)' }

  static get trigger() { return '!gohome' }
  static from(message) { return message.toLowerCase().trim() === '!gohome' ? new GoHomeCommand() : null }

  execute(player) {
    const before = player.location
    const after = player.goHome()
    if (before.equals(after)) Chat.instance.whisper(player, error`No home set. Use !sethome first.`)
    else Chat.instance.whisper(player, [success`✓`, 'Teleported to', highlight`${after.formatted}`])
  }
}
