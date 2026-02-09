// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Ruby-ish formatting rules for JavaScript.
//
// endless-method:
//   In Ruby, `def foo = expr` forces a single-line form.
//   This rule enforces the same for JS methods whose body is a single
//   statement — either a return or a lone expression:
//
//     get displayName() { return 'ancient debris' }
//     static register(B) { this.#types.push(B) }
//     constructor(g) { this.#gamertag = g }
//
//   Methods with comments inside the body are skipped (collapsing would
//   cause // comments to swallow the closing brace).

const MAX_LINE_LENGTH = 120

// -------------------------------------------------------------------
// Rule: endless-method
// -------------------------------------------------------------------
const endlessMethod = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce single-line form for simple one-statement methods (Ruby endless method style)',
    },
    fixable: 'whitespace',
    schema: [],
  },

  create(context) {
    return {
      MethodDefinition(node) {
        const { body } = node.value
        if (!body || body.body.length !== 1) return

        const stmt = body.body[0]

        // Allow single return (with a value) or single expression statement
        const isReturn = stmt.type === 'ReturnStatement' && stmt.argument !== null
        const isExpression = stmt.type === 'ExpressionStatement'
        if (!isReturn && !isExpression) return

        // Already on one line — nothing to do
        if (node.loc.start.line === node.loc.end.line) return

        // Skip if any comments exist inside the method body —
        // collapsing would break // line comments
        const sourceCode = context.sourceCode ?? context.getSourceCode()
        const bodyComments = sourceCode.getCommentsInside(body)
        if (bodyComments.length > 0) return

        const text = sourceCode.getText(node)
        const oneLiner = text
          .split('\n')
          .map((line) => line.trim())
          .join(' ')
          .replace(/\s+/g, ' ')

        // Respect max line length
        const indent = ' '.repeat(node.loc.start.column)
        if (indent.length + oneLiner.length > MAX_LINE_LENGTH) return

        context.report({
          node,
          message: 'Single-statement methods should use endless style (one line).',
          fix(fixer) {
            return fixer.replaceText(node, oneLiner)
          },
        })
      },
    }
  },
}

// -------------------------------------------------------------------
// Helpers for member spacing
// -------------------------------------------------------------------
function isStatic(node) {
  return node.static === true
}

function isCompact(node) {
  return node.loc.start.line === node.loc.end.line
}

function isProperty(node) {
  return node.type === 'PropertyDefinition'
}

function sameKind(a, b) {
  return isProperty(a) === isProperty(b)
}

// -------------------------------------------------------------------
// Rule: class-member-spacing
//
// Enforces Ruby-ish spacing within class bodies:
//   - No blank lines between consecutive compact members of the
//     same kind (all properties or all methods) in the same group
//   - One blank line when kind changes (property → method) even if
//     both are compact
//   - One blank line between static and instance groups
//   - One blank line before/after multi-line (non-compact) members
// -------------------------------------------------------------------
const classMemberSpacing = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Ruby-ish spacing between class members',
    },
    fixable: 'whitespace',
    schema: [],
  },

  create(context) {
    return {
      ClassBody(classBody) {
        const sourceCode = context.sourceCode ?? context.getSourceCode()
        const members = classBody.body

        for (let i = 1; i < members.length; i++) {
          const prev = members[i - 1]
          const curr = members[i]

          // Collect comments between the two members
          const commentsBetween = sourceCode.getCommentsBefore(curr)
            .filter((c) => c.loc.start.line > prev.loc.end.line)

          // Count blank lines, excluding comment lines
          const prevEndLine = prev.loc.end.line
          const currStartLine = curr.loc.start.line
          const commentLineCount = commentsBetween.reduce((sum, c) => {
            return sum + (c.loc.end.line - c.loc.start.line + 1)
          }, 0)
          const blankLines = currStartLine - prevEndLine - 1 - commentLineCount

          const group = isStatic(prev) === isStatic(curr)
          const bothCompact = isCompact(prev) && isCompact(curr)
          const kind = sameKind(prev, curr)

          // Build the replacement preserving comments
          const indent = ' '.repeat(curr.loc.start.column)
          const commentText = commentsBetween
            .map((c) => {
              if (c.type === 'Line') return `${indent}// ${c.value.trim()}`
              return `${indent}/* ${c.value.trim()} */`
            })
            .join('\n')

          if (!group) {
            // One blank line between static and instance groups
            if (blankLines !== 1) {
              const gap = commentText
                ? '\n\n' + commentText + '\n' + indent
                : '\n\n' + indent
              context.report({
                node: curr,
                message: 'Exactly one blank line between static and instance groups.',
                fix(fixer) {
                  return fixer.replaceTextRange(
                    [prev.range[1], curr.range[0]],
                    gap,
                  )
                },
              })
            }
          } else if (bothCompact && kind) {
            // Same group, same kind, both compact — no blank lines
            if (blankLines !== 0) {
              const gap = commentText
                ? '\n' + commentText + '\n' + indent
                : '\n' + indent
              context.report({
                node: curr,
                message: 'No blank lines between consecutive compact members of the same kind.',
                fix(fixer) {
                  return fixer.replaceTextRange(
                    [prev.range[1], curr.range[0]],
                    gap,
                  )
                },
              })
            }
          } else {
            // Same group but: different kind, or at least one multi-line — one blank line
            if (blankLines !== 1) {
              const gap = commentText
                ? '\n\n' + commentText + '\n' + indent
                : '\n\n' + indent
              context.report({
                node: curr,
                message: 'One blank line between members of different kinds or around multi-line members.',
                fix(fixer) {
                  return fixer.replaceTextRange(
                    [prev.range[1], curr.range[0]],
                    gap,
                  )
                },
              })
            }
          }
        }
      },
    }
  },
}

export default {
  rules: {
    'endless-method': endlessMethod,
    'class-member-spacing': classMemberSpacing,
  },
}
