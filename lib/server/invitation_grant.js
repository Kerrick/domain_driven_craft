// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { InvitationChange } from './invitation_change.js'

export class InvitationGrant extends InvitationChange {
  applyTo(allowlist, gamertag) { allowlist.invite(gamertag) }
  syncWith(repository, gamertag) { repository.grant(gamertag) }
}
