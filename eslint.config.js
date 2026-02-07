// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import importPlugin from "eslint-plugin-import";

// Domain nouns that end in agent-like suffixes
// but are legitimate Minecraft/domain concepts
const DOMAIN_NOUNS = [
  "Player",               // Minecraft player entity
  "Server",               // Minecraft server aggregate root
  "Spawner",              // Minecraft mob spawner block
  "PreferenceList",       // collection of player preferences (not an -er agent)
  "Allowlist",            // Minecraft's standard term for the server allowlist
  "InvitationGrant",      // nominalized verb — use case, not an agent (-ant)
  "InvitationRevocation", // nominalized verb — use case, not an agent (-ant)
];

export default [
  {
    files: ["lib/**/*.js"],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js"],
        },
      },
      "import/ignore": ["@minecraft"],
    },
    rules: {
      // === Import Safety ===
      "import/no-unresolved": ["error", { ignore: ["@minecraft/.*"] }],
      "import/extensions": ["error", "always"],
      "import/no-duplicates": "error",
      "import/no-cycle": "error",
      "import/no-self-import": "error",

      // === Hard Requirements (QuickJS/Node compatibility) ===
      "no-restricted-imports": ["error", {
        paths: [
          "fs", "path", "http", "https", "net", "os", "child_process",
          "crypto", "stream", "buffer", "url", "util", "events",
          "assert", "readline", "zlib",
        ],
        patterns: ["node:*"],
      }],
      "no-restricted-globals": ["error",
        "process", "__dirname", "__filename", "require", "Buffer",
        "setImmediate", "clearImmediate", "global",
      ],

      // === Radical OOP ===
      "no-restricted-syntax": ["error",
        {
          selector: "ExportNamedDeclaration > FunctionDeclaration",
          message: "Object agency: export classes, not standalone functions. The noun offers the verb.",
        },
        {
          selector: "SwitchStatement",
          message: "Prefer polymorphism (duck typing) over switch/case.",
        },
        {
          selector: `ClassDeclaration[id.name=/^(?!${DOMAIN_NOUNS.join("|")}$).*(?:er|or|ant|ent|ist)$/]`,
          message: "No agent nouns. Instead of Manager/Controller/Handler, name after the domain concept.",
        },
      ],
      "max-classes-per-file": ["error", 1],

      // === Code Quality ===
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-var": "error",
      "prefer-const": "error",
      "eqeqeq": "error",
      "no-throw-literal": "error",
    },
  },
];
