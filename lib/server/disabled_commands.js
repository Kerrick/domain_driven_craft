// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { variables } from '@minecraft/server-admin'
import { Singleton } from '../types/singleton.js'
import { Commands } from '../command/commands.js'

const PROTECTED = new Set(['!help', '!status', '!setting', '!timeout', '!invite', '!uninvite'])

export class DisabledCommands extends Singleton {
  #disabled = new Map()

  load() {
    this.#disabled.clear()
    for (const CommandClass of Commands.instance.all()) {
      const trigger = CommandClass.trigger?.toLowerCase()
      if (!trigger || PROTECTED.has(trigger)) continue
      const message = this.#readMessage(`disabled_${trigger.slice(1)}`)
      if (message) this.#disabled.set(trigger, message)
    }
    for (const trigger of PROTECTED) {
      const message = this.#readMessage(`disabled_${trigger.slice(1)}`)
      if (message) console.log(`[domain_driven_craft] Ignoring ${trigger} disable request; that command always stays enabled`)
    }
    const names = [...this.#disabled.keys()].sort().join(', ')
    console.log(`[domain_driven_craft] Disabled commands: ${names || 'none'}`)
  }

  isDisabled(command) { return this.isDisabledClass(command.constructor) }

  isDisabledClass(CommandClass) {
    const trigger = CommandClass.trigger?.toLowerCase()
    return trigger ? this.#disabled.has(trigger) : false
  }

  messageFor(command) {
    const trigger = command.constructor.trigger?.toLowerCase()
    return trigger ? this.#disabled.get(trigger) ?? null : null
  }

  all() {
    return [...this.#disabled.entries()]
      .map(([trigger, message]) => ({ trigger, message }))
      .sort((first, second) => first.trigger.localeCompare(second.trigger))
  }

  #readMessage(variableName) {
    let raw = null
    try {
      raw = variables.get(variableName)
    } catch {
      return null
    }
    if (!raw) return null
    const message = String(raw).trim()
    return message || null
  }
}
