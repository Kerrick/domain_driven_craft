// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { InvitationChange } from './invitation_change.js'

export class InvitationRevocation extends InvitationChange {
  applyTo(allowlist, gamertag) { allowlist.uninvite(gamertag) }
  syncWith(repository, gamertag) { repository.revoke(gamertag) }
}
