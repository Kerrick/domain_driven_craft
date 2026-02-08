// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Chat } from '../server/chat.js'
import { muted, highlight, error, command, arg } from '../server/styles.js'
import { Settings } from '../settings/index.js'
import { Change } from '../types/change.js'

export class SettingCommand {
  static pattern = /^!setting\b/i
  static help = { usage: '!setting <name> [value]', description: 'View/set server settings (Op)' }

  static get trigger() { return '!setting' }

  static from(message) {
    if (!SettingCommand.pattern.test(message)) return null
    const args = message.slice('!setting'.length).trim()
    if (!args) return new SettingCommand()
    const spaceIndex = args.indexOf(' ')
    if (spaceIndex === -1) return new SettingCommand(args)
    return new SettingCommand(args.slice(0, spaceIndex), args.slice(spaceIndex + 1))
  }

  #name
  #value

  constructor(name = null, value = null) {
    this.#name = name?.toLowerCase()
    this.#value = value
  }

  execute(player) {
    if (!this.#name) {
      this.#showAll(player)
      return
    }
    const setting = Settings.instance.get(this.#name)
    if (!setting) {
      Chat.instance.whisper(player, error`Unknown setting: ${this.#name}`)
      return
    }
    if (!this.#value) this.#show(player, setting)
    else this.#set(player, setting)
  }

  #showAll(player) {
    const lines = [muted`=== Server Settings ===`]
    for (const setting of Settings.instance.all()) lines.push([muted`${setting.name}:`, highlight`${setting.current}`])
    lines.push([muted`Usage:`, command`${SettingCommand.trigger}`, arg`<name>`, arg`<value>`])
    Chat.instance.whisper(player, ...lines)
  }

  #show(player, setting) { Chat.instance.whisper(player, [muted`${setting.name}:`, highlight`${setting.current}`]) }

  #set(player, setting) {
    if (!player.isOp) {
      Chat.instance.whisper(player, error`Only operators can change settings`)
      return
    }
    const parsed = Settings.instance.parse(setting.name, this.#value)
    if (parsed === null) {
      Chat.instance.whisper(player, error`Invalid value for ${setting.name}: ${this.#value}`)
      return
    }
    Settings.instance.apply(setting.name, Change.permanent(parsed))
    Chat.instance.broadcastSuccess(`${setting.name} set to`, highlight`${Settings.instance.get(setting.name).current}`, 'by', highlight`${player.name}`)
  }
}
