// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

type TaggedTemplateFn = (strings: TemplateStringsArray, ...values: unknown[]) => string;

export declare const muted: TaggedTemplateFn;
export declare const highlight: TaggedTemplateFn;
export declare const success: TaggedTemplateFn;
export declare const warning: TaggedTemplateFn;
export declare const error: TaggedTemplateFn;
export declare const command: TaggedTemplateFn;
export declare const arg: TaggedTemplateFn;
export declare const bold: TaggedTemplateFn;
