#!/usr/bin/env node

import pkg from 'live-server'
const { start } = pkg

import { build } from 'esbuild'
import alias from 'esbuild-plugin-alias'
import { createRequire } from 'module'
import { config } from 'dotenv'
import { resolve } from 'path/posix'
import { promises as fs } from 'fs'

const require = createRequire(import.meta.url)
config()

const arg = process.argv[2]

/**
 * Live Server Params
 * @link https://www.npmjs.com/package/live-server#usage-from-node
 */
const serverParams = {
  port: parseInt(process.env.PORT || 8081), // Set the server port. Defaults to 8080.
  root: 'esbuild', // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  // host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  // wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  // mount: [['/components', './node_modules']], // Mount a directory to a route.
  // logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  // middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
}

/**
 * @link https://esbuild.github.io/api/#build-api
 * @type {import('esbuild').BuildOptions}
 */
const buildParams = (devBuild = true) => ({
  color: true,
  entryPoints: ['src/index.tsx'],
  loader: { '.ts': 'tsx' },
  external: ['crypto', 'domain'],
  outdir: 'esbuild',
  plugins: [
    alias({
      'react': require.resolve('react'),
      'react-popper': require.resolve('react-popper'),
      // 'react-router-dom': require.resolve('react-router-dom'),
      // "prosemirror-commands": require.resolve("../manuscript-editor/node_modules/prosemirror-commands"),
      // "prosemirror-dev-tools": require.resolve("../manuscript-editor/node_modules/prosemirror-dev-tools"),
      // "prosemirror-dropcursor": require.resolve("../manuscript-editor/node_modules/prosemirror-dropcursor"),
      // "prosemirror-gapcursor": require.resolve("../manuscript-editor/node_modules/prosemirror-gapcursor"),
      // "prosemirror-history": require.resolve("../manuscript-editor/node_modules/prosemirror-history"),
      // "prosemirror-inputrules": require.resolve("../manuscript-editor/node_modules/prosemirror-inputrules"),
      // "prosemirror-keymap": require.resolve("../manuscript-editor/node_modules/prosemirror-keymap"),
      // "prosemirror-model": require.resolve("../manuscript-editor/node_modules/prosemirror-model"),
      // "prosemirror-schema-list": require.resolve("../manuscript-editor/node_modules/prosemirror-schema-list"),
      // "prosemirror-state": require.resolve("../manuscript-editor/node_modules/prosemirror-state"),
      // "prosemirror-tables": require.resolve("../manuscript-editor/node_modules/prosemirror-tables"),
      // "prosemirror-transform": require.resolve("../manuscript-editor/node_modules/prosemirror-transform"),
      // "prosemirror-utils": require.resolve("../manuscript-editor/node_modules/prosemirror-utils"),
      // "prosemirror-view": require.resolve("../manuscript-editor/node_modules/prosemirror-view"),
      // 'prosemirror-model': require.resolve('../editor/node_modules/node_modules/prosemirror-model'),
      // 'prosemirror-state': require.resolve('prosemirror-state'),
      // 'prosemirror-view': require.resolve('prosemirror-view'),
      'uuid': require.resolve('uuid'),
    }),
  ],
  inject: ['process-shim.js'],
  define: {},
  mainFields: ['module', 'browser', 'main'],
  minify: devBuild ? false : true,
  format: 'esm',
  bundle: true,
  sourcemap: true,
  metafile: true,
  logLevel: devBuild ? 'error' : 'warning',
  incremental: devBuild,
  watch: devBuild
})

async function buildAndWatch() {
  const builder = await build(buildParams())
  // await fs.writeFile('./meta.json', JSON.stringify(builder, null, 2))
  start(serverParams)
}

if (arg === 'build') {
  build(buildParams(false))
} else if (arg === 'watch') {
  buildAndWatch()
} else {
  throw Error(`Unknown command '${arg}' for build.js, available commands: build | watch`)
}
