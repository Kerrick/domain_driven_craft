// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Change } from "./change.js";

export class Setting {
  #name;
  #getCurrent;
  #setCurrent;
  #getBase;
  #setBase;
  #announcer;
  #expiresAt = null;
  
  constructor(name, getCurrent, setCurrent, getBase, setBase, announcer) {
    this.#name = name;
    this.#getCurrent = getCurrent;
    this.#setCurrent = setCurrent;
    this.#getBase = getBase;
    this.#setBase = setBase;
    this.#announcer = announcer;
  }
  
  get name() { return this.#name; }
  get current() { return this.#getCurrent(); }
  get base() { return this.#getBase(); }
  
  get hasOverride() {
    return this.#expiresAt !== null && Date.now() < this.#expiresAt;
  }
  
  get overrideRemaining() {
    if (!this.#expiresAt) return null;
    return Math.max(0, Math.ceil((this.#expiresAt - Date.now()) / 1000));
  }
  
  apply(change) {
    this.#setCurrent(change.value);
    
    if (change.isTemporary) {
      this.#expiresAt = change.expiresAt;
    } else {
      this.#expiresAt = null;
      this.#setBase(change.value);
    }
  }
  
  tick() {
    if (this.#expiresAt && Date.now() >= this.#expiresAt) {
      this.#setCurrent(this.#getBase());
      this.#expiresAt = null;
      this.#announcer();
    }
  }
}
