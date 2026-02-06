// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";
import { Chat, warning, highlight } from "../server/chat.js";

export class Setting {
  #expiresAt = null;
  
  get name() { throw new Error("Subclass must implement"); }
  get current() { throw new Error("Subclass must implement"); }
  set current(value) { throw new Error("Subclass must implement"); }
  get base() { throw new Error("Subclass must implement"); }
  set base(value) { throw new Error("Subclass must implement"); }
  announceExpiry() { /* optional */ }
  
  parse(input) { throw new Error("Subclass must implement"); }
  
  get hasOverride() {
    return this.#expiresAt !== null && Date.now() < this.#expiresAt;
  }
  
  get overrideRemaining() {
    if (!this.#expiresAt) return null;
    return Math.max(0, Math.ceil((this.#expiresAt - Date.now()) / 1000));
  }
  
  apply(change) {
    this.current = change.value;
    
    if (change.isTemporary) {
      this.#expiresAt = change.expiresAt;
    } else {
      this.#expiresAt = null;
      this.base = change.value;
    }
  }
  
  force(value) {
    this.current = value;
  }
  
  tick() {
    if (this.#expiresAt && Date.now() >= this.#expiresAt) {
      this.current = this.base;
      this.#expiresAt = null;
      this.announceExpiry();
    }
  }
  
  asReadonly() {
    const setting = this;
    return {
      get name() { return setting.name; },
      get current() { return setting.current; },
      get base() { return setting.base; },
      get hasOverride() { return setting.hasOverride; },
      get overrideRemaining() { return setting.overrideRemaining; }
    };
  }
}
