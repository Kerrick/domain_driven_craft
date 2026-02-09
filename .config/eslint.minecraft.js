// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Minecraft Bedrock compatibility rules.
// Scoped to lib/ — tighten to lib/behavior_pack/ after restructuring.

import esxPlugin from 'eslint-plugin-es-x'
import minecraftPlugin from 'eslint-plugin-minecraft-linting'

const MC_FILES = ['lib/**/*.js']

export default [
  // === ES Feature Restrictions (QuickJS ES2023 target) ===
  {
    ...esxPlugin.configs['flat/restrict-to-es2023'],
    files: MC_FILES,
  },
  // === Minecraft API Best Practices ===
  {
    files: MC_FILES,
    plugins: {
      'minecraft-linting': minecraftPlugin,
    },
    rules: {
      'minecraft-linting/avoid-unnecessary-command': 'warn',
    },
  },
  // === Node.js API Restrictions (not available in Minecraft) ===
  {
    files: MC_FILES,
    rules: {
      'no-restricted-imports': ['error', {
        paths: [
          'fs', 'path', 'http', 'https', 'net', 'os', 'child_process',
          'crypto', 'stream', 'buffer', 'url', 'util', 'events',
          'assert', 'readline', 'zlib',
        ],
        patterns: ['node:*'],
      }],
      'no-restricted-globals': ['error',
        'process', '__dirname', '__filename', 'require', 'Buffer',
        'setImmediate', 'clearImmediate', 'global',
      ],
    },
  },
]
