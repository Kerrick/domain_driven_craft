// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'
import { Settings } from '../settings/index.js'
import { Server } from '../server/server.js'
import { ProposalDraft, TickSpeedPoll } from '../poll/index.js'

// KS-LE-5 shared with Discourse, Stalwart, Bitwarden, Rails apps
// Conservative limits: ~20 per player, cap at 30 total
const BASE_SPEED = 20
const MAX_SPEED = 30
function calculateTickSpeed() {
  const players = Server.instance.playerCount
  return Math.min(MAX_SPEED, Math.floor(BASE_SPEED / Math.max(1, players)))
}

export class FastTickCommand {
  static help = { usage: '!fasttick', description: 'Vote for faster tick speed' }

  static get trigger() { return '!fasttick' }

  static from(message) {
    return message.toLowerCase().trim() === FastTickCommand.trigger
      ? new FastTickCommand()
      : null
  }

  execute(player) {
    const speed = calculateTickSpeed()
    const duration = Settings.instance.fasttickDuration.current
    const proposal = ProposalDraft.for(TickSpeedPoll).by(player).with(speed, duration)
    Chat.instance.propose(proposal)
  }
}
