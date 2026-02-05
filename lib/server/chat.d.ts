// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";

export interface Message {
  line(text: string): void;
}

export interface Chat {
  whisper(player: Player, compose: (msg: Message) => void): void;
  speak(compose: (msg: Message) => void): void;
}
