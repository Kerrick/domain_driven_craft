// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const DIFFICULTIES = ["peaceful", "easy", "normal", "hard"];
export const DIFFICULTY_PATTERN = new RegExp(`^!difficulty\\s+(${DIFFICULTIES.join("|")})$`, "i");
