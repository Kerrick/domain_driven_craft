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
| **`!flip`** | Heads/tails |
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

## Block Market

Players can invest their **copper ingots** into a "block market," a simulated stock market. Copper is the server's sole currency — abundant enough to circulate freely, useless enough in vanilla that no one feels bad spending it, and non-renewable so it gains real scarcity as the server ages.

The market roughly simulates a stochastic market with boom and bust cycles, erratic daily movements, and unpredictable price volatility — moderated by the fact that over a long time horizon, it goes generally up. IRL the annual real return on investment is about 7%, so the block market should target the same over ~100 hours of play.

### Shared Price, Per-Player Exposure (DCA Model)

The market has a **single shared price** that ticks forward in real time regardless of who's online. All players see the same price history — this is where the social moments come from: _"The market is crashing!"_ Boom/bust cycles, daily volatility, and long-term upward drift all happen on this shared timeline.

Each hour a player is online, they automatically **"buy in"** 1 copper at whatever the current price is — like automated dollar-cost averaging. A player's portfolio value = sum of all their buy-ins evaluated at today's price. This means:

- **Playing more always helps.** More hours = more exposure = more long-term gains.
- **No incentive to dodge crashes.** A player who skips a crash also skips buying cheap. When the market recovers, the player who played through the crash holds units bought at low prices, which are now very valuable. Consistent players always win long-term — just like real DCA.
- **Crashes feel exciting, not punishing.** Experienced players will recognize a crash as a buying opportunity: _"I should play today, everything's on sale."_

Participation in the automatic buy-in is opt-in, set by a preference command. 

### Volatility

The block market simulates a mutual fund, not individual stocks. The price updates once per **"market day"** (30 minutes of real time), so there's no benefit to checking more than once per half hour. If 100 hours ≈ 1 IRL year, then 1 "day" ≈ 30 minutes:

- **Daily noise (per 30-min tick):** ±2-5% random walk
- **Weekly swing range (~4 hours):** ±10-15%
- **Boom/bust cycles:** 24 hour periods, peaks of +40%, troughs of -30%
- **Long-term drift:** ~+0.07% per market day (≈7% per 100 hours)

### Storage

Per-player: total units accumulated + total cost basis (two numbers). The shared price is a single world dynamic property. No need to store a full time series — just the current price and per-player aggregates.

## Land Claims

Players can claim surface rights to a plot of land by building a continuous perimeter of **perimeter blocks** — a whitelisted set including all fence types, fence gates, and walls. You are in complete control of your land: no one can build on it, break blocks on it, or interact with containers on it without your permission, which you can revoke at any time. Multiple claims per player are supported (main base + outpost).

### How It Works

The script tracks ownership of perimeter-block placements via `playerPlaceBlock`. When a player places a perimeter block adjacent to **two or more** other perimeter blocks they own, the script follows the adjacency chain to check if a closed loop has formed. If it has:

1. The loop is traced and its polygon extracted (projected to 2D x,z).
2. The polygon vertices are stored in dynamic properties.
3. The player is notified: _"Land claim registered! 2,400 blocks claimed."_

No `!claim` command needed — the claim triggers automatically when you place the last block. The moment of closure is the reward.

### Why This Works

- **Effort proportional to claim size.** A larger perimeter requires more blocks, more materials, and more walking. A 100×100 claim = ~400 fences.
- **Works in every biome.** Fences and walls are craftable anywhere.
- **Player chooses aesthetics.** Oak fence, stone brick wall, mixed — whatever fits the build.
- **Hills and terrain.** Adjacency is checked in 3D (±1 on each axis), so fences going uphill stay connected. The polygon is projected to 2D for claim area.
- **No world-scanning.** The script only tracks blocks it watched being placed — no flood fill, no `Block.get()` spam.

### Storage

Per-player: a map of perimeter-block positions they've placed (coordinate → block type). A prolific builder with 2,000 fence blocks ≈ 24 KB — well within dynamic property limits. Completed claim polygons are just vertex lists (4-20 numbers each).

### Edge Cases

- **Block broken:** Listen to `playerBreakBlock`. If a perimeter block in an active claim is broken, invalidate the claim and notify: _"Your claim at (x, z) has been broken!"_
- **T-junctions/branches:** The adjacency walk finds the smallest loop containing the triggering block.
- **Shared walls between claims:** Each loop is a separate claim, both owned by the same player.
- **Steep ridgelines:** A perimeter that goes over a narrow ridge may self-intersect when projected to 2D. Worth handling at implementation time.

### Allow List

| Category | Blocks | Cost | Aesthetics |
|----------|--------|------|------------|
| **Wood Fences** | Oak, Spruce, Birch, Jungle, Acacia, Dark Oak, Mangrove, Cherry, Bamboo | 6 planks + 2 sticks per 3 | Classic, rural ✓ |
| **Nether Fences** | Crimson, Warped, Nether Brick | Nether access + sticks or bricks | Colorful, dramatic ✓ |
| **Fence Gates** | All 11 wood types + Crimson, Warped | 4 planks + 2 sticks | Match their fence ✓ |
| **Stone Walls** | Cobblestone, Mossy Cobblestone | Abundant cobble | Medieval, solid ✓✓ |
| **Polished Walls** | Stone Brick, Mossy Stone Brick, Granite, Diorite, Andesite | Smelting + crafting | Clean, refined ✓✓ |
| **Sandstone Walls** | Sandstone, Red Sandstone | Desert sand | Desert-appropriate ✓ |
| **Brick Walls** | Brick, Mud Brick | Clay (rare!) / mud + wheat | Warm, rustic ✓✓ |
| **Deepslate Walls** | Cobbled, Polished, Brick, Tile | Deep mining | Dark, modern ✓✓✓ |
| **Nether Walls** | Nether Brick, Red Nether Brick, Blackstone, Polished Blackstone (+ brick) | Nether access | Imposing ✓✓ |
| **Other Walls** | End Stone Brick, Prismarine, Tuff, Polished Tuff, Tuff Brick | Various rare sources | Unique, biome-tied ✓✓ |

In code, detection can use substring matching: `id.includes('fence') || id.includes('wall') || id.includes('gate')`.

### The Pitch

You can use fences, walls, or any mix of them: cobblestone walls, deepslate, stone brick, whatever fits the look you're going for. The server doesn't care what you build with, just that it forms a closed loop. Once you place the last block that closes the perimeter, it automatically detects the enclosed area and claims it for you. No command needed.

Inside your claim, nobody else can build, break blocks, or open your chests. You can have as many separate claims as you want (a main base and an outpost, for example).

The tradeoff is that your claim is only as big as what you actually build around. Bigger area means more wall. That's the homesteading part... you earn the land by putting in the work. And if part of your wall gets broken, the claim breaks with it, so it's worth building something sturdy.

Walls look a lot better than fences for this.

## Mineral Rights

Mineral rights cost copper ingots, the same currency as the Block Market — creating a genuine economic tradeoff: _"Do I invest this copper in the market, or stake a mining claim?"_

### How It Works

Dig the first 2 blocks of a shaft to establish your position and direction. Look straight ahead and run `!stake`. The script uses `player.getViewDirection()` to project a ray forward and claims a standard-length tube along it: your shaft (2×1 corridor) plus a 2-4 block radius around it for the ore you'll uncover in the walls. One stake, one shaft, one price: **64 copper ingots** (one stack). Simple ergonomics.

You're betting there's good ore ahead (just like real prospecting). Some shafts hit diamond veins and pay off handsomely. Others are 256 blocks of empty stone. That's the gamble.

### Ore Detection

Protection isn't the only benefit to staking... you also get _knowledge_. Within your claimed shaft, the script periodically scans a small block radius around you and whispers nearby ore, even if you can't see it: _"Diamond ore detected within 3 blocks!"_

This doesn't change vanilla mechanics: drops are normal, enchantments still matter. The advantage is information. Without a claim, you might walk right past a diamond vein hidden 2 blocks behind stone. With a claim, you never miss one. That easily makes staking worth the copper, even on a small server with no competing miners.

### Social

When a player stakes a claim, the server announces it to chat: _"PlayerX just staked a mining claim at Y=-59!"_ Claim stats are visible in `!stats` — total shafts staked, total length claimed. On a friends' server, the prestige of being the most active prospector is its own reward.

### Storage

Each claim is a single ray: origin (3) + direction (3) + length (1) + radius (1) = **8 numbers per shaft**. A player with 10 shafts = 80 numbers. Trivially small for dynamic properties.

### The Economic Loop

You mine copper → invest it in the Block Market for savings OR spend it staking new mining claims for ore detection → which helps you find valuable resources more efficiently. The tradeoff between investing and staking is the heart of the underground economy.

## Shops

Players can spend **copper** to buy resources they haven't traveled to gather themselves. (It is not yet known if the shop is accessed via `!shop`, which opens an `ActionFormData` menu with categories, or a physical location with buttons and chests.)

Shop inventory unlocks progressively based on play time, so new players can't shortcut the natural mining progression:

| Unlocks At | You Get | Copper Cost (ingots) |
|------------|---------|----------------------|
| 0 hours | 64 common blocks (other wood types, sand, terracotta) | 8 |
| 0 hours | 64 processed blocks (stone bricks, polished granite) | 24 |
| 10 hours | 64 cross-biome blocks (cherry planks, mangrove wood, bamboo) | 16 |
| 20 hours | 64 cross-dimension blocks (nether bricks, soul sand, end stone) | 32 |
| 50 hours | 1 gold ingot | 4 |
| 50 hours | 1 emerald | 24 |
| 50 hours | 1 diamond | 32 |
| 50 hours | 1 rare drop (shulker shell, wither skeleton skull) | 128 |

By the time precious items unlock, the player has found them naturally through mining. The shop becomes a convenience for established players, not a shortcut for new ones.

The shop serves as a copper sink that fights inflation — even when players have stacks of copper early on, there's always something to spend it on. It also incentivizes exploration, because gathering resources yourself is always cheaper than buying them. The shop is a convenience tax, not a replacement for adventure.

### The Copper Economy

Copper ties all four systems together:

| Copper Sink | What You Get |
|-------------|-------------|
| Block Market | Long-term savings via DCA |
| Mineral Rights | Ore detection in your claimed shafts |
| Shops | Resources from biomes you haven't reached |
| Land Claims | _(Free — earned by building, not bought)_ |

Land claims are the one thing that doesn't cost copper. Surface claims are earned through sweat. Everything underground is bought with capital.
