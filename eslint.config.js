// SPDX-FileCopyrightText: 2026 Kerrick Long <me@kerricklong.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import importPlugin from 'eslint-plugin-import'
import stylisticPlugin from '@stylistic/eslint-plugin'
import sortClassMembersPlugin from 'eslint-plugin-sort-class-members'
import rubyishPlugin from './.config/eslint-plugin-rubyish.js'
import sonarjsPlugin from 'eslint-plugin-sonarjs'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import tseslint from 'typescript-eslint'
import minecraftConfig from './.config/eslint.minecraft.js'
import nodeConfig from './.config/eslint.node.js'

// Domain nouns that end in agent-like suffixes
// but are legitimate domain concepts
const DOMAIN_NOUNS = [
  'Player',               // Minecraft player entity
  'Server',               // server aggregate root
  'Spawner',              // Minecraft mob spawner block
  'PreferenceList',       // collection of player preferences (not an -er agent)
  'Allowlist',            // standard term for the server allowlist
  'InvitationGrant',      // nominalized verb — use case, not an agent (-ant)
  'InvitationRevocation', // nominalized verb — use case, not an agent (-ant)
]

export default [
  sonarjsPlugin.configs.recommended,
  // Sonarjs overrides
  {
    rules: {
      'sonarjs/no-nested-assignment': 'off', // allow ||= and ??= in return statements (rubyish pattern)
      'sonarjs/todo-tag': 'off', // TODO: re-enable once JSDoc stubs are replaced with real documentation
    },
  },
  // === Driver-specific compatibility ===
  ...minecraftConfig,
  ...nodeConfig,
  // === Universal rules for JavaScript ===
  {
    files: ['lib/**/*.js', 'scripts/**/*.js'],
    plugins: {
      import: importPlugin,
      '@stylistic': stylisticPlugin,
      'sort-class-members': sortClassMembersPlugin,
      rubyish: rubyishPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js'],
        },
      },
      'import/ignore': ['@minecraft'],
    },
    rules: {
      // === Import Safety ===
      'import/no-unresolved': ['error', { ignore: ['@minecraft/.*'] }],
      'import/extensions': ['error', 'always'],
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',

      // === Radical OOP ===
      'no-restricted-syntax': ['error',
        {
          selector: 'ExportNamedDeclaration > FunctionDeclaration',
          message: 'Object agency: export classes, not standalone functions. The noun offers the verb.',
        },
        {
          selector: 'SwitchStatement',
          message: 'Prefer polymorphism (duck typing) over switch/case.',
        },
        {
          selector: `ClassDeclaration[id.name=/^(?!${DOMAIN_NOUNS.join('|')}$).*(?:er|or|ant|ent|ist)$/]`,
          message: 'No agent nouns. Instead of Manager/Controller/Handler, name after the domain concept.',
        },
      ],
      'max-classes-per-file': ['error', 1],
      'sort-class-members/sort-class-members': ['error', {
        order: [
          { type: 'property', static: true, private: true },  // 1. private static fields
          { type: 'property', static: true, private: false },  // 2. public static fields
          { type: 'method', static: true, private: false },    // 3. public static methods
          { type: 'method', static: true, private: true },     // 4. private static methods
          { type: 'property', static: false, private: true },  // 5. private instance fields
          { type: 'property', static: false, private: false },  // 6. public instance fields
          'constructor',                                        // 7. constructor
          { type: 'method', static: false, private: false },   // 8. public instance methods
          { type: 'method', static: false, private: true },    // 9. private instance methods
        ],
        accessorPairPositioning: 'getThenSet',
        stopAfterFirstProblem: true,
      }],

      // === Code Quality ===
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-var': 'error',
      'prefer-const': 'error',
      curly: ['error', 'multi'],
      eqeqeq: 'error',
      'no-throw-literal': 'error',
      'rubyish/endless-method': 'error',
      'rubyish/class-member-spacing': 'error',

      // === Complexity ===
      complexity: ['warn', { max: 10 }],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 3],

      // === Ruby-ish Style ===
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/max-len': ['error', {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
      }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/key-spacing': ['error', {
        beforeColon: false,
        afterColon: true,
      }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/keyword-spacing': ['error', {
        before: true,
        after: true,
      }],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
      '@stylistic/brace-style': ['error', '1tbs', {
        allowSingleLine: true,
      }],
      '@stylistic/no-multiple-empty-lines': ['error', {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/arrow-spacing': ['error', {
        before: true,
        after: true,
      }],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/padding-line-between-statements': ['error',
        { blankLine: 'never', prev: '*', next: '*' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'never', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: 'export', next: '*' },
        { blankLine: 'always', prev: '*', next: 'export' },
      ],
    },
  },

  // === JSDoc: Require typeless JSDoc in .d.ts sidecar files ===
  {
    files: ['lib/**/*.d.ts', 'scripts/**/*.d.ts'],
    plugins: {
      jsdoc: jsdocPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      'jsdoc/require-jsdoc': ['error', {
        publicOnly: true,
        require: {
          ClassDeclaration: true,
          MethodDefinition: true,
          FunctionDeclaration: true,
        },
        checkConstructors: false,
      }],
      'jsdoc/no-types': 'error',
      'jsdoc/require-description': 'error',
    },
  },
]
