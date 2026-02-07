// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Location } from "../types/location";

export declare class Activity {
  tick(location: Location, elapsedSeconds: number): void;
  touch(): void;
  readonly idleSeconds: number;
  readonly distanceMoved: number;
}
