// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

type TaggedTemplateFn = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => string

/** Gray text for secondary information. */
export declare const muted: TaggedTemplateFn
/** Bright text for emphasis. */
export declare const highlight: TaggedTemplateFn
/** Green text for positive outcomes. */
export declare const success: TaggedTemplateFn
/** Yellow text for cautions. */
export declare const warning: TaggedTemplateFn
/** Red text for failures. */
export declare const error: TaggedTemplateFn
/** Styled command name (e.g. `!help`). */
export declare const command: TaggedTemplateFn
/** Styled argument value. */
export declare const arg: TaggedTemplateFn
/** Bold text. */
export declare const bold: TaggedTemplateFn
