// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, error, warning, highlight } from '../server/chat.js'
import { Gamertag } from '../types/gamertag.js'
import { ResidentProtected } from '../server/allowlist/errors/resident_protected.error.js'

export class UninviteCommand {
  static pattern = new RegExp('^!uninvite\\s+(\\S+)$', 'i')
  static help = { usage: '!uninvite <gamertag>', description: 'Remove a player from the server (Op)' }
  static useCase

  static get trigger() { return '!uninvite' }

  static from(message) {
    const match = message.match(UninviteCommand.pattern)
    if (match) return new UninviteCommand(new Gamertag(match[1]))
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
      UninviteCommand.useCase.for(this.#gamertag)
      Chat.instance.broadcastSuccess(highlight`${this.#gamertag.name}`, 'uninvited by', highlight`${player.name}`)
    } catch (e) {
      if (e instanceof ResidentProtected) Chat.instance.whisper(player, warning`${this.#gamertag.name} is a seed player. Remove from players.yml and redeploy.`)
      else throw e
    }
  }
}
