// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class Location {
  #x;
  #y;
  #z;
  #dimension;
  
  constructor(x, y, z, dimension) {
    this.#x = Math.floor(x);
    this.#y = Math.floor(y);
    this.#z = Math.floor(z);
    this.#dimension = dimension;
  }
  
  get x() { return this.#x; }
  get y() { return this.#y; }
  get z() { return this.#z; }
  get dimension() { return this.#dimension; }
  
  get formatted() {
    return `X: ${this.#x}, Y: ${this.#y}, Z: ${this.#z}`;
  }
  
  toJSON() {
    return { x: this.#x, y: this.#y, z: this.#z, dimension: this.#dimension };
  }
  
  static fromJSON(json) {
    if (!json) return null;
    const data = typeof json === "string" ? JSON.parse(json) : json;
    return new Location(data.x, data.y, data.z, data.dimension);
  }
}
