// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@minecraft/server': fileURLToPath(
        new URL('../test/support/minecraft_server.js', import.meta.url),
      ),
    },
  },
  test: {
    include: ['test/**/*.test.js'],
  },
})
