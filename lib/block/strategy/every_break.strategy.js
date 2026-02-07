// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from "../../server/chat.js";
import { highlight } from "../../server/styles.js";

export class EveryBreak {
  #block;
  
  constructor(block) {
    this.#block = block;
  }
  
  onBrokenBy(player) {
    Chat.instance.celebrate(player.name, "found", highlight`${this.#block.displayName}`);
  }
  
  onGazedAtBy(_player) {}
}
