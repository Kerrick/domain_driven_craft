// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Chat, bold } from "../server/chat.js";
import { Count } from "../types/count.js";

class ReadonlyMilestone {
  #milestone;
  
  constructor(milestone) {
    this.#milestone = milestone;
  }
  
  get name() { return this.#milestone.name; }
  get count() { return this.#milestone.count; }
  
  format() {
    return this.#milestone.format();
  }
}

export class Milestone {
  #playerName;
  #name;
  #statKey;
  #verb;
  #noun;
  
  constructor(playerName, name, statKey, verb, noun) {
    this.#playerName = playerName;
    this.#name = name;
    this.#statKey = statKey;
    this.#verb = verb;
    this.#noun = noun;
  }
  
  get name() { return this.#name; }
  get statKey() { return this.#statKey; }
  
  #key() {
    return `stats_${this.#playerName}_${this.#statKey}`;
  }
  
  get count() {
    return new Count(Number(world.getDynamicProperty(this.#key()) ?? 0));
  }
  
  increment() {
    const newCount = this.count.incremented();
    world.setDynamicProperty(this.#key(), newCount.value);
    
    if (newCount.isMilestone) {
      Chat.instance.celebrate(this.#playerName, this.#verb, bold`${newCount.formatted()}`, this.#noun);
    }
    
    return newCount;
  }
  
  format() {
    return `${this.#name}: ${this.count.formatted()}`;
  }
  
  asReadonly() {
    return new ReadonlyMilestone(this);
  }
}
