// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Approved ESLint disable exceptions.
// Each entry must explain WHY the exception is unavoidable.
// Review carefully before adding new entries.

import { Exceptions } from '../scripts/lint/index.js'

const exceptions = new Exceptions('eslint_exceptions.js')

exceptions.allow('lib/player/action_bar/action_bar.js', {
  line: 29,
  reason: `
  Styled text DSL composition: the muted\`|\` separator is a template tag
  function called inside a template literal. This is the intended API for
  composing styled text fragments — not accidental nesting.

  The DSL is designed around composing template tag functions
  (bold, muted, success, etc.) inside template literals. Flattening would
  require abandoning the tagged template API entirely.
`,
})

exceptions.allow('lib/poll/poll.js', {
  line: 31,
  reason: `
  Styled text DSL composition: warning\`tag\` is a template tag function
  nested inside the announcement template literal.

  Same DSL design as action_bar.js above.
`,
})

exceptions.allow('lib/poll/tick_speed.poll.js', {
  line: 23,
  reason: `
  Styled text DSL composition: muted\`tag\` is a template tag function
  nested inside the expiration announcement template literal.

  Same DSL design as action_bar.js above.
`,
})

exceptions.allow('lib/server/chat.js', {
  line: 33,
  reason: `
  Styled text DSL composition: success\`★\` and highlight\`tag\` are
  template tag functions nested inside the celebration template literal.

  Same DSL design as action_bar.js above.
`,
})

exceptions.allow('lib/server/welcome.js', {
  line: 24,
  reason: `
  Styled text DSL composition: bold\`★ Welcome...\` is a template tag
  function nested inside the success\`...\` wrapper.

  Same DSL design as action_bar.js above.
`,
})

exceptions.allow('lib/types/location.js', {
  line: 17,
  reason: `
  TODO: Create Point and Dimension value objects.
`,
})

exceptions.allow('lib/stat/stat.js', {
  line: 15,
  reason: `
  TODO: Identify refactoring opportunities.
`,
})

exceptions.allow('lib/types/dimension.js', {
  line: 13,
  reason: `
  TODO: Extract Dimension class (above) and add a fromMinecraft() factory method.
`,
})

exceptions.allow('lib/command/invite.command.d.ts', {
  line: 17,
  reason: `
  TODO: Investigate PumpIt or other vanilla JS DI libraries.
`,
})

exceptions.allow('lib/command/uninvite.command.d.ts', {
  line: 17,
  reason: `
  TODO: Investigate PumpIt or other vanilla JS DI libraries.
`,
})

export default exceptions
