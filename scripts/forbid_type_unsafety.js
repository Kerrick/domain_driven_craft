#!/usr/bin/env node

// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Lint } from './lint/index.js'
import typescript from '../.config/typescript_exceptions.js'

Lint.load(typescript).enforce(
  'lib/**/*.ts',
  /(\bany\b|\bunknown\b|\bcast\b|\bas\b|\b\!\b)/,
  'Bypassing type safety',
)
