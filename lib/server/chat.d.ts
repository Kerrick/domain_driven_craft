// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Player } from "../player";
import type { Poll } from "../poll/types";
import type { Proposal } from "../poll/proposal";

export declare function muted(strings: TemplateStringsArray, ...values: unknown[]): string;
export declare function highlight(strings: TemplateStringsArray, ...values: unknown[]): string;
export declare function success(strings: TemplateStringsArray, ...values: unknown[]): string;
export declare function warning(strings: TemplateStringsArray, ...values: unknown[]): string;
export declare function error(strings: TemplateStringsArray, ...values: unknown[]): string;
export declare function command(strings: TemplateStringsArray, ...values: unknown[]): string;
export declare function bold(strings: TemplateStringsArray, ...values: unknown[]): string;

export declare class Chat {
  constructor(server: import("./server").Server);
  
  hear(message: string): import("../command/types").Command | null;
  whisper(player: Player, ...lines: string[]): void;
  speak(...lines: string[]): void;
  
  propose<T extends Poll>(proposal: Proposal<T>): T;
  poll<T extends Poll>(PollClass: new (...args: any[]) => T): T | undefined;
  activePolls(): Poll[];
  checkPolls(): void;
  clearPoll(poll: Poll): void;
  notifyConditionChange(): void;
}
