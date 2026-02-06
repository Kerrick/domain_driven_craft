// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Location } from "./location";
import { Player } from "../player/player";

export class Sighting {
  constructor(location: Location, type: string);
  hasBeenSeenBy(player: Player): boolean;
  markSeenBy(player: Player): void;
}
