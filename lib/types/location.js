// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Location {
  static fromJSON(json) {
    if (!json) return null
    const data = typeof json === 'string' ? JSON.parse(json) : json
    return new Location(data.x, data.y, data.z, data.dimension)
  }

  #x
  #y
  #z
  #dimension

  // eslint-disable-next-line max-params -- Should extract Dimension and Point value objects.
  constructor(x, y, z, dimension) {
    this.#x = x
    this.#y = y
    this.#z = z
    this.#dimension = dimension
  }

  get x() { return this.#x }
  get y() { return this.#y }
  get z() { return this.#z }
  get blockX() { return Math.floor(this.#x) }
  get blockY() { return Math.floor(this.#y) }
  get blockZ() { return Math.floor(this.#z) }
  get dimension() { return this.#dimension }
  get formatted() { return `X: ${this.blockX}, Y: ${this.blockY}, Z: ${this.blockZ}` }
  toJSON() { return { x: this.#x, y: this.#y, z: this.#z, dimension: this.#dimension } }

  equals(other) {
    if (!other) return false
    return this.#x === other.x && this.#y === other.y && this.#z === other.z && this.#dimension === other.dimension
  }

  distanceFrom(other) {
    const dx = this.#x - other.x
    const dy = this.#y - other.y
    const dz = this.#z - other.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }
}
