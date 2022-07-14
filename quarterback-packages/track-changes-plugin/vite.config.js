/// <reference types="vitest" />
import { defineConfig } from 'vite'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: [
      'prosemirror-commands',
      'prosemirror-dropcursor',
      'prosemirror-example-setup',
      'prosemirror-gapcursor',
      'prosemirror-history',
      'prosemirror-inputrules',
      'prosemirror-keymap',
      'prosemirror-model',
      'prosemirror-schema-list',
      'prosemirror-state',
      'prosemirror-tables',
      'prosemirror-transform',
      // 'prosemirror-utils',
      'prosemirror-view',
    ],
  },
  resolve: {
    alias: {
      // '@manuscripts/manuscript-transform': resolve('../manuscript-transform'),
      'prosemirror-model': resolve('node_modules/prosemirror-model'),
      // 'prosemirror-model': resolve(
      //   'node_modules/@manuscripts/manuscript-transform/node_modules/prosemirror-model'
      // ),
      // 'prosemirror-transform': resolve(
      //   'node_modules/@manuscripts/manuscript-transform/node_modules/prosemirror-transform'
      // ),
    },
    dedupe: ['prosemirror-model']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: ['src/test-utils/setupTests.js'],
    coverage:{
      reporter: ['text', 'html']
    }
  }
})
