<!--
  SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
  SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Documentation Style Guide

This project uses `.d.ts` sidecar files for programmer documentation. Every `/** TODO: Document me */` placeholder gets replaced with prose that explains _why_ the code exists, not _what_ it does.

The style combines Christopher Alexander's Pattern Language, William Zinsser's _On Writing Well_, and the U.S. Federal Plain Language Guidelines.

## 1. Core Philosophy

- **Context → Problem → Solution (Alexandrian Form).** Every class doc follows this sequence. Context establishes the domain situation. Problem names the pain. Solution explains how this class addresses it. Keep all three — and keep them in order.
- **Short and active (Zinsser/Klinkenborg).** Cut unnecessary words. Use active voice. Avoid "allow," "enable," "provide," "support," "functionality," and "capability." Strong verbs drive the sentence.
- **Plain language.** Speak directly. Don't abstract the reader away. Instead of "You must do X," use imperative "Do X" or cause-and-effect "X ensures Y."

## 2. What NOT to Document

These rules exist because every violation creates a maintenance liability — prose that drifts out of sync with code.

- **Never echo types.** The `.d.ts` signature already declares types. Do not restate them. If the signature says `RegExp`, the doc should not say "Regex that…"
- **Never document callers.** Describing who calls a method couples the doc to an implementation detail that changes independently. Document the method's own contract.
- **Never repeat implementation details.** Trigger strings, format patterns, and magic values live in code. Repeating them in prose creates a second source of truth.
- **Never describe software design.** "Delegates to a use case," "decouples X from Y," or "separates concerns" belong in architecture docs, not programmer docs. The reader can see the `.js` file.

## 3. Class Documentation

Use the **Context → Problem → Solution** sequence. Each sentence earns its place — no redundancy.

For simple classes, one line is enough:

<!-- SPDX-SnippetBegin -->
<!--
  SPDX-FileCopyrightText: 2026 Kerrick Long
  SPDX-License-Identifier: MIT-0
-->

```javascript
/**
 * The server has residents and guests; operators sometimes need to remove a
 * guest from within the game.
 */
```

<!-- SPDX-SnippetEnd -->

When the domain is richer, use a multi-line block:

<!-- SPDX-SnippetBegin -->
<!--
  SPDX-FileCopyrightText: 2026 Kerrick Long
  SPDX-License-Identifier: MIT-0
-->

```javascript
/**
 * The server distinguishes between residents (seed players defined in
 * configuration) and guests (invited at runtime). Operators sometimes need to
 * remove a guest from within the game. This command revokes a non-seed player's
 * invitation.
 */
```

<!-- SPDX-SnippetEnd -->

**Bad (generic/descriptive):**

<!-- SPDX-SnippetBegin -->
<!--
  SPDX-FileCopyrightText: 2026 Kerrick Long
  SPDX-License-Identifier: MIT-0
-->

```javascript
/** A command for uninviting players from the server. */
```

<!-- SPDX-SnippetEnd -->

## 4. Property and Method Documentation

- **Properties:** Concise noun phrases. Do not start with the type or "Getter for…"
  - _Bad:_ "Regex that extracts the gamertag from the chat message." (echoes `RegExp`)
  - _Good:_ "Extracts the target {@link Gamertag} from the chat message."
- **Methods:** Active, third-person present tense. Include enough context to stand alone.
  - _Bad:_ "Will calculate the total."
  - _Good:_ "Calculates the total price of the order."
- **Never document callers.** Describe what the method does, not who calls it.
- **Never repeat implementation details.** No trigger strings, format patterns, or literal values.

### Example

<!-- SPDX-SnippetBegin -->
<!--
  SPDX-FileCopyrightText: 2026 Kerrick Long
  SPDX-License-Identifier: MIT-0
-->

```typescript
  /** Extracts the target {@link Gamertag} from the chat message. */
  static readonly pattern: RegExp

  /**
   * Parses a chat message into a command, or rejects it.
   *
   * Returns null if the message does not match the expected pattern.
   */
  static from(message: string): UninviteCommand | null
```

<!-- SPDX-SnippetEnd -->

## 5. Formatting

- Use `{@link ClassName}` to reference other classes.
- Do **not** use `@param`, `@return`, `@type`, or other type-annotation tags. The `.d.ts` sidecar declares all types.
- Do **not** use smart quotes.
- **Single-line:** `/** Summary. */` — use when one sentence covers C/P/S.
- **Multi-line:** Keep it tight. Three to five lines of prose, not ten.

## 6. Checklist

Before finalizing documentation, ask:

1.  Did I write Context → Problem → Solution, in that order?
2.  Are my sentences short and active?
3.  Did I avoid echoing types already visible in the signature?
4.  Did I avoid documenting callers or implementation details?
5.  Does every sentence add information the previous one didn't?
