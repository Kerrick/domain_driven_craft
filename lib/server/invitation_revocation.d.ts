// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { InvitationChange } from './invitation_change'

/**
 * Revoking an invitation requires loading the current allowlist, removing the
 * guest (while protecting residents), persisting the change, and syncing with
 * the Minecraft API. This use case encapsulates that workflow.
 */
export declare class InvitationRevocation extends InvitationChange {}
