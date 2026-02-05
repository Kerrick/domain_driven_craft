// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat, bold } from "../server/chat.js";

export class Milestone {
  #stat;
  
  constructor(stat) {
    this.#stat = stat;
  }
  
  static check(stat) {
    if (Milestone.#isReached(stat)) {
      new Milestone(stat).#celebrate();
    }
  }
  
  static #isReached(stat) {
    const count = stat.count;
    if (count < 10) return false;
    const log = Math.log10(count);
    return Number.isInteger(log);
  }
  
  #celebrate() {
    const stat = this.#stat;
    Chat.instance.celebrate(
      stat.playerName,
      stat.verb,
      bold`${stat.count.toLocaleString()}`,
      stat.noun
    );
  }
}
