// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world } from "@minecraft/server";

export class Chat {
  whisper(player, builder) {
    const lines = [];
    builder({ line: (text) => lines.push(text) });
    lines.forEach(line => player.sendMessage(line));
  }
  
  speak(builder) {
    const lines = [];
    builder({ line: (text) => lines.push(text) });
    lines.forEach(line => world.sendMessage(line));
  }
}
