import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'

import path from 'path'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    alias({
      entries: [
        {
          find: '$context',
          replacement: path.resolve(__dirname, 'src/context'),
        },
        {
          find: '$extensions',
          replacement: path.resolve(__dirname, 'src/extensions'),
        },
        { find: '$react', replacement: path.resolve(__dirname, 'src/react') },
        { find: '$schema', replacement: path.resolve(__dirname, 'src/schema') },
        {
          find: '$typings',
          replacement: path.resolve(__dirname, 'src/typings'),
        },
      ],
    }),
    nodeResolve({
      browser: true,
    }),
    typescript(),
    commonjs(),
    postcss(),
  ],
}
