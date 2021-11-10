import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import { createRequire } from 'module'
import { config } from 'dotenv'

config()
const require = createRequire(import.meta.url)

// This is a minefield (!) https://github.com/vitejs/vite/issues/3910
export default defineConfig({
  optimizeDeps: {
    exclude: [
      'prosemirror-commands',
      'prosemirror-dropcursor',
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
    entries: ['index.html'],
  },
  server: {
    port: parseInt(process.env.PORT || 3000),
    strictPort: true,
    hmr: {
      timeout: 500,
    },
  },
  resolve: {
    alias: {
      '@manuscripts/manuscript-transform': resolve('../manuscript-transform'),
      react: require.resolve('react'),
      'react-popper': require.resolve('react-popper'),
      'react-router-dom': require.resolve('react-router-dom'),
    },
  },
  define: {
    'process.env': process.env,
  },
  plugins: [reactRefresh(), tsconfigPaths()],
})
