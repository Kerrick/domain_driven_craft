// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Stand-in for the @minecraft/server module, which ships types only.
// Tests read gameRules back to see what the pack published.

export const gameRules = { playersSleepingPercentage: 100 }

export const world = { gameRules }
