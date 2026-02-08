// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'
import { muted, command, warning } from '../server/styles.js'
import { Commands } from './commands.js'

export class HelpCommand {
  static aliases = ['!?']
  static help = { usage: '!help', description: 'Show this help' }

  static get trigger() { return '!help' }

  static from(message) {
    const msg = message.toLowerCase().trim()
    return (msg === HelpCommand.trigger || HelpCommand.aliases.includes(msg))
      ? new HelpCommand()
      : null
  }

  execute(player) {
    const lines = [warning`=== Commands ===`]
    for (const CommandClass of Commands.instance.all()) if (CommandClass.help) lines.push([command`${CommandClass.help.usage}`, muted`—`, CommandClass.help.description])
    Chat.instance.whisper(player, ...lines)
  }
}
