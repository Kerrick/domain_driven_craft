// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Approved TypeScript unsafety exceptions.
// Each entry must explain WHY the exception is unavoidable.
// Review carefully before adding new entries.

import { Exceptions } from '../scripts/lint/index.js'

const exceptions = new Exceptions('typescript_exceptions.js')

exceptions.allow('lib/command/types.d.ts', {
  line: 30,
  reason: `
  TODO: Express ConstructorOf<T> without any[].
`,
})

exceptions.allow('lib/server/chat.d.ts', {
  line: 77,
  reason: `
  TODO: Same ConstructorOf<T> problem as command/types.d.ts.
`,
})

exceptions.allow('lib/server/polls.d.ts', {
  line: 20,
  reason: `
  TODO: Same ConstructorOf<T> problem as command/types.d.ts.
`,
})

exceptions.allow('lib/poll/proposal_draft.d.ts', {
  line: 21,
  reason: `
  TODO: Make ProposalDraft.with() type-safe per Poll subclass.
`,
})

exceptions.allow('lib/poll/proposal.d.ts', {
  line: 9,
  reason: `
  TODO: Same ConstructorOf<T> problem as command/types.d.ts.
`,
})

exceptions.allow('lib/poll/proposal.d.ts', {
  line: 17,
  reason: `
  TODO: Add conditional type branches for each concrete Poll subclass.
`,
})

exceptions.allow('lib/settings/settings.d.ts', {
  line: 33,
  reason: `
  TODO: Type-narrow Settings.all() return type.
`,
})

exceptions.allow('lib/settings/settings.d.ts', {
  line: 35,
  reason: `
  TODO: Type-narrow Settings.get() return type.
`,
})

exceptions.allow('lib/settings/settings.d.ts', {
  line: 37,
  reason: `
  TODO: Type-narrow Settings.parse() return type.
`,
})

exceptions.allow('lib/settings/settings.d.ts', {
  line: 41,
  reason: `
  TODO: Type-narrow Settings.force() value parameter.
`,
})

exceptions.allow('lib/player/preference/preference.d.ts', {
  line: 21,
  reason: `
  TODO: Narrow storedValue via generic parameter.
`,
})

exceptions.allow('lib/server/chat.d.ts', {
  lines: [12, 17, 22, 27, 32, 37, 42, 47],
  reason: `
  TODO: Type the template tag function signatures properly.
`,
})

exceptions.allow('lib/server/styles.d.ts', {
  line: 7,
  reason: `
  TODO: Same template tag signature problem as chat.d.ts.
`,
})

exceptions.allow('lib/poll/ballot.d.ts', {
  line: 13,
  reason: `
  False positive: cast() means "cast a vote", not a type cast.
`,
})

export default exceptions
