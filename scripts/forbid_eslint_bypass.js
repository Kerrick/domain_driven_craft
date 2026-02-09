#!/usr/bin/env node

// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Lint } from './lint/index.js'
import eslint from '../.config/eslint_exceptions.js'

Lint.load(eslint).enforce(
  'lib/**/*.{js,.ts}',
  /eslint-disable/,
  'Bypassing ESLint',
)
