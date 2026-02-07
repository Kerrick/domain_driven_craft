// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { HudElement, HudVisibility } from "@minecraft/server";

export class HudItemText {
  #mcPlayer;
  #hidden;
  
  constructor(mcPlayer) {
    this.#mcPlayer = mcPlayer;
    this.#hidden = false;
  }
  
  hide() {
    if (this.#hidden) return;
    this.#mcPlayer.onScreenDisplay.setHudVisibility(
      HudVisibility.Hide, [HudElement.ItemText]
    );
    this.#hidden = true;
  }
  
  reset() {
    if (!this.#hidden) return;
    this.#mcPlayer.onScreenDisplay.setHudVisibility(
      HudVisibility.Reset, [HudElement.ItemText]
    );
    this.#hidden = false;
  }
}
