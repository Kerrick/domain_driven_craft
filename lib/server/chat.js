// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Commands } from "../command/index.js";

class Message {
  #lines = [];
  
  line(text) {
    this.#lines.push(text);
  }
  
  success(text) { return `§a${text}§r`; }
  warning(text) { return `§e${text}§r`; }
  error(text) { return `§c${text}§r`; }
  muted(text) { return `§7${text}§r`; }
  highlight(text) { return `§f${text}§r`; }
  bold(text) { return `§l${text}§r`; }
  command(text) { return `§f${text}§r`; }
  
  get lines() { return this.#lines; }
}

export class Chat {
  #commands = new Commands();
  
  hear(message) {
    return this.#commands.for(message);
  }
  
  whisper(player, compose) {
    const msg = new Message();
    compose(msg);
    msg.lines.forEach(line => player.sendMessage(line));
  }
  
  speak(compose) {
    const msg = new Message();
    compose(msg);
    msg.lines.forEach(line => world.sendMessage(line));
  }
}
