/*!
 * © 2021 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import reactRefresh from '@vitejs/plugin-react-refresh'
import { config } from 'dotenv'
import { createRequire } from 'module'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

config()
const require = createRequire(import.meta.url)

// This is a minefield (!) https://github.com/vitejs/vite/issues/3910
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
      // 'prosemirror-model',
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
      lib0: resolve('node_modules/lib0'),
      'prosemirror-model': resolve('node_modules', '@manuscripts', 'manuscript-editor', 'node_modules', 'prosemirror-model'),
      react: require.resolve('react'),
      'react-popper': require.resolve('react-popper'),
      'react-router-dom': require.resolve('react-router-dom'),
      yjs: resolve('node_modules/yjs'),
      'y-prosemirror': resolve('node_modules/y-prosemirror'),
    },
  },
  define: {
    'process.env': process.env,
  },
  plugins: [reactRefresh(), tsconfigPaths()],
})
