// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Commands } from "../command/index.js";

// Tagged template functions for semantic styling
export const muted = (strings, ...values) => `§7${String.raw(strings, ...values)}§r`;
export const highlight = (strings, ...values) => `§f${String.raw(strings, ...values)}§r`;
export const success = (strings, ...values) => `§a${String.raw(strings, ...values)}§r`;
export const warning = (strings, ...values) => `§e${String.raw(strings, ...values)}§r`;
export const error = (strings, ...values) => `§c${String.raw(strings, ...values)}§r`;
export const command = (strings, ...values) => `§f${String.raw(strings, ...values)}§r`;
export const bold = (strings, ...values) => `§l${String.raw(strings, ...values)}§r`;

export class Chat {
  #commands = new Commands();
  
  hear(message) {
    return this.#commands.for(message);
  }
  
  whisper(player, ...lines) {
    for (const line of lines) {
      player.sendMessage(line);
    }
  }
  
  speak(...lines) {
    for (const line of lines) {
      world.sendMessage(line);
    }
  }
}
