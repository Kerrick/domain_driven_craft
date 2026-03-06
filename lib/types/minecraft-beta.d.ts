// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Minecraft Script API - Types for beta features not in @minecraft/server
// These are stable enough to use but not yet in the official typings

import type { Player } from '@minecraft/server'

/** A chat message about to be sent, which can be cancelled. */
export interface ChatSendBeforeEvent {
  /** The message text. */
  readonly message: string
  /** The player who sent the message. */
  readonly sender: Player
  /** Set to true to suppress the message from appearing in chat. */
  cancel: boolean
}

/** Event signal for subscribing to chat messages before they are sent. */
export interface ChatSendBeforeEventSignal {
  /** Registers a callback that fires before each chat message is sent. */
  subscribe(
    callback: (event: ChatSendBeforeEvent) => void,
  ): (event: ChatSendBeforeEvent) => void
  /** Removes a previously registered callback. */
  unsubscribe(callback: (event: ChatSendBeforeEvent) => void): void
}

// Augment the world.beforeEvents type
declare module '@minecraft/server' {
  /** Adds beta events to the world's beforeEvents. */
  interface WorldBeforeEvents {
    readonly chatSend: ChatSendBeforeEventSignal
    readonly entityHurt: EntityHurtBeforeEventSignal
  }

  /** An entity about to take damage, which can be cancelled. */
  interface EntityHurtBeforeEvent {
    /** The entity being hurt. */
    readonly hurtEntity: Entity
    /** Describes where the damage came from. */
    readonly damageSource: EntityDamageSource
    /** Set to true to cancel the damage. */
    cancel: boolean
  }

  /** Event signal for subscribing to entity hurt events. */
  interface EntityHurtBeforeEventSignal {
    subscribe(
      callback: (event: EntityHurtBeforeEvent) => void,
    ): (event: EntityHurtBeforeEvent) => void
    unsubscribe(callback: (event: EntityHurtBeforeEvent) => void): void
  }
}
