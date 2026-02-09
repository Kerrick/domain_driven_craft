#!/usr/bin/env node

// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { globSync } from 'node:fs'
import { Module } from './module.js'

const modules = globSync('lib/**/*.js').map((path) => new Module(path))
const violations = []
for (const mod of modules) {
  if (mod.members.size === 0 || mod.isBarrel) continue
  if (!mod.hasSidecar) {
    violations.push(`${mod.path}: missing sidecar ${mod.sidecarPath}`)
    continue
  }
  const missing = mod.members.difference(mod.sidecar.members)
  for (const name of missing) violations.push(`${mod.path}: '${name}' missing from ${mod.sidecarPath}`)
}
if (violations.length > 0) {
  console.error('❌ Sidecar .d.ts completeness violations:')
  for (const v of violations) console.error(`  ${v}`)
  process.exit(1)
}
console.log('✅ All .js exports have matching .d.ts declarations')
