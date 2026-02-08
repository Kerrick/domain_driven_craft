// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Command, CommandClass } from './types'
import type { InvitationRevocation } from '../server/invitation_revocation'

/**
 * The server distinguishes between residents (seed players defined in
 * configuration) and guests (invited at runtime). Operators sometimes need to
 * remove a guest from within the game. This command revokes a non-seed player's
 * invitation.
 */
export declare const UninviteCommand: CommandClass<Command> & {
  /**
   * Injected use case that performs the allowlist removal, wired at the
   * composition root.
   */
  useCase: InvitationRevocation
}
