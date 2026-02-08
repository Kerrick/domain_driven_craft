// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { world, system } from '@minecraft/server'
import { Server } from './server/server.js'
import { Chat } from './server/chat.js'
import { Block } from './block/index.js'
import { Commands } from './command/commands.js'
import { StatusCommand } from './command/status.command.js'
import { HelpCommand } from './command/help.command.js'
import { PeacefulCommand } from './command/peaceful.command.js'
import { CoordsCommand } from './command/coords.command.js'
import { PreferencesCommand } from './command/preferences.command.js'
import { SetHomeCommand } from './command/set_home.command.js'
import { GoHomeCommand } from './command/go_home.command.js'
import { FastTickCommand } from './command/fast_tick.command.js'
import { SettingCommand } from './command/setting.command.js'
import { TimeoutCommand } from './command/timeout.command.js'
import { StatsCommand } from './command/stats.command.js'
import { InviteCommand } from './command/invite.command.js'
import { UninviteCommand } from './command/uninvite.command.js'
import { DiscordCommand } from './command/discord.command.js'
import { DynamicPropertyAllowlistRepository } from './server/dynamic_property_allowlist_repository.js'
import { InvitationGrant } from './server/invitation_grant.js'
import { InvitationRevocation } from './server/invitation_revocation.js'
import { Allowlist } from './server/allowlist.js'

Commands.instance.register(
  StatusCommand,
  HelpCommand,
  PeacefulCommand,
  CoordsCommand,
  PreferencesCommand,
  SetHomeCommand,
  GoHomeCommand,
  FastTickCommand,
  SettingCommand,
  TimeoutCommand,
  StatsCommand,
  InviteCommand,
  UninviteCommand,
  DiscordCommand,
)
// Allowlist wiring — script is sole owner of the runtime allowlist
const allowlistRepository = new DynamicPropertyAllowlistRepository()
InviteCommand.useCase = new InvitationGrant(allowlistRepository)
UninviteCommand.useCase = new InvitationRevocation(allowlistRepository)
// Player lifecycle
world.afterEvents.playerSpawn.subscribe((event) => {
  if (event.initialSpawn) Server.instance.playerJoined(event.player)
})
world.afterEvents.playerLeave.subscribe((event) => {
  Server.instance.playerLeft(event.playerName)
})
// Chat commands
world.beforeEvents.chatSend.subscribe((event) => {
  const command = Commands.instance.for(event.message)
  if (command) {
    event.cancel = true
    const senderName = event.sender.name
    system.runTimeout(() => {
      const player = Server.instance.player(senderName)
      if (player) command.execute(player)
    }, 1)
  }
})
// Player actions → domain methods (ACL layer)
world.afterEvents.playerBreakBlock.subscribe((event) => {
  const block = Block.fromPermutation(event.brokenBlockPermutation, event.block.location)
  Server.instance.player(event.player.name)?.brokeBlock(block)
})
world.afterEvents.playerPlaceBlock.subscribe((event) => {
  Server.instance.player(event.player.name)?.placedBlock()
})
world.afterEvents.entityDie.subscribe((event) => {
  // Player death
  if (event.deadEntity.typeId === 'minecraft:player') Server.instance.player(event.deadEntity.nameTag)?.died()
  // Mob kill by player
  const killer = event.damageSource?.damagingEntity
  if (killer?.typeId === 'minecraft:player' && event.deadEntity.typeId !== 'minecraft:player') Server.instance.player(killer.nameTag)?.killedMob()
})
world.afterEvents.playerHotbarSelectedSlotChange.subscribe((event) => {
  const player = Server.instance.player(event.player.name)
  if (player) player.changedHotbarSlot()
})
// Tick loop
system.runInterval(() => {
  Server.instance.tick()
  Chat.instance.checkPolls()
}, 20)
// Reconcile allowlist on world load — add all residents + guests to the runtime allowlist
world.afterEvents.worldLoad.subscribe(() => {
  const residents = allowlistRepository.loadResidents()
  const guests = allowlistRepository.loadGuests()
  const allowlist = new Allowlist(residents, guests)
  for (const gamertag of allowlist) world.getDimension('overworld').runCommand(`allowlist add "${gamertag.name}"`)
})
// Signal to Docker HEALTHCHECK that all scripts loaded without errors.
// If any import above threw a JS error, execution never reaches this line.
console.log('[domain_driven_craft] Scripts initialized successfully')
