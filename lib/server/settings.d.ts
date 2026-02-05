// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type Difficulty = "peaceful" | "easy" | "normal" | "hard";

export interface Settings {
  difficulty: Difficulty;
  tickSpeed: number;
  pollTimeout: number;
}
