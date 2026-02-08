// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'
import type { InvitationGrant } from '../server/invitation_grant'

/**
 * The server distinguishes between residents and guests. Operators sometimes
 * need to add a guest from within the game. This command grants a new player
 * access to the allowlist.
 */
export declare const InviteCommand: CommandClass<Command> & {
  /**
   * Injected use case that performs the allowlist grant, wired at the
   * composition root.
   */
  useCase: InvitationGrant
}
