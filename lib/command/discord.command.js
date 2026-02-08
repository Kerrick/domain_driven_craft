// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'

export class DiscordCommand {
  static help = { usage: '!discord', description: 'Get the Discord invite link' }

  static get trigger() { return '!discord' }
  static from(message) { return message.toLowerCase().trim() === DiscordCommand.trigger ? new DiscordCommand() : null }

  execute(player) { Chat.instance.whisper(player, 'https://discord.gg/eu6DYq7WfP') }
}
