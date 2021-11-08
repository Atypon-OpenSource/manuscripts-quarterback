import pkg from 'live-server'
const { start } = pkg

import { watch } from 'chokidar'
import { build } from 'esbuild'
import alias from 'esbuild-plugin-alias'
import { createRequire } from 'module'
import path from 'path'

const require = createRequire(import.meta.url)

/**
 * Live Server Params
 * @link https://www.npmjs.com/package/live-server#usage-from-node
 */
const serverParams = {
  port: 8181, // Set the server port. Defaults to 8080.
  root: 'public', // Set root directory that's being served. Defaults to cwd.
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
 * ESBuild Params
 * @link https://esbuild.github.io/api/#build-api
 */
const buildParams = {
  color: true,
  entryPoints: ['src/index.tsx'],
  loader: { '.ts': 'tsx' },
  external: ['crypto', 'domain'],
  outdir: 'public',
  plugins: [
    alias({
      'react': require.resolve('react'),
      'react-popper': require.resolve('react-popper'),
      'react-router-dom': require.resolve('react-router-dom'),
      'prosemirror-model': require.resolve('prosemirror-model'),
      'uuid': require.resolve('uuid'),
    }),
  ],
  inject: ['process-shim.js'],
  define: {},
  mainFields: ['module', 'browser', 'main'],
  // minify: true,
  format: 'esm',
  bundle: true,
  sourcemap: true,
  logLevel: 'error',
  incremental: true
}

async function main() {
  const builder = await build(buildParams)

  let timeout
  watch('src/**/*.{ts,tsx}').on('all', (list) => {
    if (timeout) return
    timeout = setTimeout(() => {
      builder.rebuild()
      timeout = null
    }, 500)
  })

  start(serverParams)
}

main()