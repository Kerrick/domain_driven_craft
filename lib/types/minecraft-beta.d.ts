// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Minecraft Script API - Types for beta features not in @minecraft/server
// These are stable enough to use but not yet in the official typings

import type { Player } from "@minecraft/server";

export interface ChatSendBeforeEvent {
  readonly message: string;
  readonly sender: Player;
  cancel: boolean;
}

export interface ChatSendBeforeEventSignal {
  subscribe(callback: (event: ChatSendBeforeEvent) => void): (event: ChatSendBeforeEvent) => void;
  unsubscribe(callback: (event: ChatSendBeforeEvent) => void): void;
}

// Augment the world.beforeEvents type
declare module "@minecraft/server" {
  interface WorldBeforeEvents {
    readonly chatSend: ChatSendBeforeEventSignal;
  }
}
