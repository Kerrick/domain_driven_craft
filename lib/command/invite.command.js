// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, error, warning, highlight } from '../server/chat.js'
import { Gamertag } from '../types/gamertag.js'
import { AlreadyInvited } from '../server/allowlist/errors/already_invited.error.js'

export class InviteCommand {
  static pattern = new RegExp('^!invite\\s+(\\S+)(?:\\s+(\\d+))?$', 'i')
  static help = { usage: '!invite <gamertag> [xuid]', description: 'Invite a player to the server (Op)' }
  static useCase

  static get trigger() { return '!invite' }

  static from(message) {
    const match = message.match(InviteCommand.pattern)
    if (match) return new InviteCommand(new Gamertag(match[1], match[2] ?? null))
    return null
  }

  #gamertag

  constructor(gamertag) { this.#gamertag = gamertag }

  execute(player) {
    if (!player.isOp) {
      Chat.instance.whisper(player, error`Only operators can manage the allowlist`)
      return
    }
    try {
      InviteCommand.useCase.for(this.#gamertag)
      Chat.instance.broadcastSuccess(highlight`${this.#gamertag.name}`, 'invited by', highlight`${player.name}`)
    } catch (e) {
      if (e instanceof AlreadyInvited) Chat.instance.whisper(player, warning`${this.#gamertag.name} is already on the allowlist`)
      else throw e
    }
  }
}
