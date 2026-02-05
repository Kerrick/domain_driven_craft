// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Milestone } from "./milestone.js";

export class DeathsMilestone extends Milestone {
  constructor(playerName) {
    super(playerName, "Deaths", "deaths", "survived", "deaths");
  }
}
