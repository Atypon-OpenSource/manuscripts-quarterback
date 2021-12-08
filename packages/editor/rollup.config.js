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
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

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
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
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
