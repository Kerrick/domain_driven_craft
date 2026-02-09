// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Node.js rules.
const NODE_FILES = ['scripts/**/*.js', 'lib/drivers/**/*.js', 'lib/adapters/**/*.js']

export default [
  // === Minecraft API Restrictions (not available in Node.js) ===
  {
    files: NODE_FILES,
    rules: {
      'no-restricted-imports': ['error', {
        patterns: ['@minecraft/*'],
      }],
    },
  },
]
