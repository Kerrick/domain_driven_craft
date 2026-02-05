<!--
SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>

SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Feature Ideas

A collection of feature ideas for extending the server utilities behavior pack.

## Community/Social Features

These were the heart of great servers in the 2010s era:

| Feature | Description | Notes |
|---------|-------------|-------|
| **`!home` / `!sethome`** | Personal teleport points | Store in dynamic properties per-player |
| **`!spawn`** | Return to world spawn | Simple, useful for new players |
| **`!warp <name>`** | Admin-set warps | Named locations like "shop", "arena" |
| **`!tpa <player>`** | Teleport request | Could integrate with Poll system |
| **`!msg <player>`** | Private messaging | |
| **`!afk`** | Toggle AFK status | Auto-AFK after idle possible |
| **`!back`** | Return to last death location | Store on `entityDie` event |
| **`!playtime`** | Track and show play time | Increment via runInterval |

## Fun/Engagement

| Feature | Description |
|---------|-------------|
| **`!roll`** | Random dice roll announced to server |
| **`!coinflip`** | Heads/tails |
| **Join/leave messages** | Styled messages with player count |

---

# Minecraft Bedrock Script API Reference

## Core Modules

| Module | Purpose |
|--------|---------|
| `@minecraft/server` | World, players, entities, blocks, events, game rules |
| `@minecraft/server-ui` | Modal forms, action bars, message boxes |
| `@minecraft/server-admin` | Server configuration (BDS-only) |
| `@minecraft/server-net` | HTTP requests (BDS-only, experimental) |
| `@minecraft/server-gametest` | Testing framework, structure spawning |

## Event System

### Before Events (cancellable)
- `chatSend` — intercept and modify/cancel chat
- `playerBreakBlock`, `playerPlaceBlock` — block protection
- `itemUse`, `itemUseOn` — detect item right-clicks
- `explosion` — cancel or modify explosions
- `playerInteractWithEntity`, `playerInteractWithBlock`

### After Events (observe only)
- `playerSpawn`, `playerLeave`
- `entityDie`, `entityHurt`, `entityLoad`
- `worldInitialize`
- `buttonPush`, `leverActivate`, `pressurePlatePush`
- `weatherChange`
- `playerDimensionChange`

## Unique Capabilities

### Dynamic Properties
Arbitrary per-world or per-entity key-value storage. Already using this for settings and preferences.

### Custom Components
Attach data/behavior to blocks or items by type.

### Scoreboard API
Programmatic scoreboard manipulation for on-screen HUD and data tracking.

### Structure API
Save/load builds as NBT, paste at locations. Great for arenas, templates.

### Entity Queries
Find entities by type, location, tags, family, etc.

### Raycasting
- `player.getBlockFromViewDirection()`
- `player.getEntitiesFromViewDirection()`

### Modal Forms (`@minecraft/server-ui`)
- `ModalFormData` — text inputs, dropdowns, sliders, toggles
- `ActionFormData` — button menu
- `MessageFormData` — yes/no dialogs

### Particle/Sound
Spawn visual/audio effects at locations.

### Container/Inventory
Read player inventory, chest contents.

### Command Execution
`dimension.runCommand()`, `player.runCommand()` for anything not in JS API.

## Use Cases That Shine

| Use Case | Why Script API? |
|----------|-----------------|
| **Voting systems** | Custom logic, persistence, UI |
| **Custom shops with UI** | Modal forms + inventory inspection |
| **Land claims** | Block break/place events + spatial queries |
| **Death tracking** | `entityDie` event, store last position |
| **Custom mobs/bosses** | Entity spawning + health manipulation |
| **Minigames** | Structure API, scoreboard, entity queries |
| **Build protection** | Cancel block placement in regions |
| **Interactive NPCs** | Spawn entities, detect interaction, show forms |
| **Portals/teleporters** | Pressure plate events + teleportation |

## Current Limitations

- No persistent file I/O (only dynamic properties)
- No raw socket networking
- Limited pathfinding control for mobs
- No custom block/item textures (resource packs only)
- Some events are BDS-only
