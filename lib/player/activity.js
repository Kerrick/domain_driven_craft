// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Activity {
  #lastLocation = null
  #idleSeconds = 0
  #distanceMoved = 0

  tick(location, elapsedSeconds) {
    this.#distanceMoved = 0
    if (this.#lastLocation) {
      const distance = location.distanceFrom(this.#lastLocation)
      if (distance > 0.1 && distance < 100) {
        this.#distanceMoved = Math.floor(distance)
        this.touch()
      }
    }
    this.#lastLocation = location
    this.#idleSeconds += elapsedSeconds
  }

  touch() { this.#idleSeconds = 0 }
  get idleSeconds() { return this.#idleSeconds }
  get distanceMoved() { return this.#distanceMoved }
}
