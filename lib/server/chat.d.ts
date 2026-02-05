// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export interface Message {
  line(text: string): void;
  
  // Semantic formatting
  success(text: string): string;
  warning(text: string): string;
  error(text: string): string;
  muted(text: string): string;
  highlight(text: string): string;
  bold(text: string): string;
  command(text: string): string;
}

export interface Chat {
  hear(message: string): import("../command/types").Command | null;
  whisper(player: Player, compose: (msg: Message) => void): void;
  speak(compose: (msg: Message) => void): void;
}
