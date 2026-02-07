// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from "../../server/chat.js";
import { highlight } from "../../server/styles.js";
import { Sighting } from "../../types/sighting.js";

export class FirstSighting {
  #block;
  #sighting;
  
  constructor(block) {
    this.#block = block;
    this.#sighting = new Sighting(block.location, block.displayName);
  }
  
  announce(player) {
    if (!this.#sighting.hasBeenSeenBy(player)) {
      this.#sighting.markSeenBy(player);
      Chat.instance.celebrate(player.name, "discovered a", highlight`${this.#block.displayName}`);
    }
  }
}
