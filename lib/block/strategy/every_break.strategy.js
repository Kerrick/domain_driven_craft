// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, highlight } from "../server/chat.js";

export class EveryBreak {
  #block;
  
  constructor(block) {
    this.#block = block;
  }
  
  announce(player) {
    Chat.instance.celebrate(player.name, "found", highlight`${this.#block.displayName}`);
  }
}
