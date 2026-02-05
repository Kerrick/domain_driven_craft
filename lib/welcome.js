// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Welcome - Greets players and tells them about the server

import { system } from "@minecraft/server";
import Difficulty from "./difficulty.js";
import TickSpeed from "./tick_speed.js";

class Welcome {
  player(p) {
    system.runTimeout(() => {
      p.sendMessage(`§a§l Welcome to Kerrick's Bedrock Server!`);
      p.sendMessage(`§7Type §f!status§7 for server info, §f!help§7 for commands`);
      
      const diff = Difficulty.current();
      const tick = TickSpeed.current();
      
      p.sendMessage(`§7Current: §f${diff}§7 difficulty, tick speed §f${tick}`);
    }, 40);
  }
}

export default new Welcome();
