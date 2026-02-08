// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'
import { muted, highlight, warning, command } from '../server/styles.js'
import { Server } from '../server/server.js'
import { Settings } from '../settings/index.js'

export class StatusCommand {
  static help = { usage: '!status', description: 'Show server status' }

  static get trigger() { return '!status' }
  static from(message) { return message.toLowerCase().trim() === StatusCommand.trigger ? new StatusCommand() : null }

  execute(player) {
    const server = Server.instance
    const settings = Settings.instance
    const total = server.allPlayers().size
    const active = server.activePlayers().size
    const afk = total - active
    const playerInfo = afk > 0
      ? `${total} (${active} Active, ${afk} AFK)`
      : `${total}`
    const lines = [
      warning`=== Server Status ===`,
      [muted`Players:`, highlight`${playerInfo}`],
      [muted`Difficulty:`, highlight`${settings.difficulty.current}`],
      [muted`Tick speed:`, highlight`${settings.tickSpeed.current}`],
    ]
    const pollSummary = Chat.instance.pollSummary
    if (pollSummary.length > 0) lines.push(warning`Active votes:`, ...pollSummary)
    lines.push([muted`Type`, command`!help`, muted`for commands`])
    Chat.instance.whisper(player, ...lines)
  }
}
