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
import './index.css'

import { Provider } from 'mobx-react'
import * as React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { Routes } from './routes'
import { confMobx } from './stores/mobxConf'
import { theme } from './theme/theme'
import { stores } from './stores'

confMobx()

render(
  <Provider {...stores}>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
