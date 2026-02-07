// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export declare class ActionBar {
  constructor(player: Player, mcPlayer: import("@minecraft/server").Player);
  
  enableCoords(): void;
  disableCoords(): void;
  notify(text: string, seconds: number): void;
  tick(): void;
  readonly asText: string | null;
  [Symbol.iterator](): Iterator<{ text: string }>;
  forEach(fn: (item: { text: string }) => void): void;
}
