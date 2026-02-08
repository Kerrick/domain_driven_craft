// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Tagged template functions for Minecraft § color codes
export const muted = (strings, ...values) => `§7${String.raw(strings, ...values)}§r`

export const highlight = (strings, ...values) => `§f${String.raw(strings, ...values)}§r`

export const success = (strings, ...values) => `§a${String.raw(strings, ...values)}§r`

export const warning = (strings, ...values) => `§e${String.raw(strings, ...values)}§r`

export const error = (strings, ...values) => `§c${String.raw(strings, ...values)}§r`

export const command = (strings, ...values) => `§f${String.raw(strings, ...values)}§r`

export const arg = (strings, ...values) => `§b${String.raw(strings, ...values)}§r`

export const bold = (strings, ...values) => `§l${String.raw(strings, ...values)}§r`
