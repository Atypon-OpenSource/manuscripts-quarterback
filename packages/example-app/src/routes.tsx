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
import * as React from 'react'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'

import { WrappedRoute } from './components/WrappedRoute'
import { FrontPage } from './pages/FrontPage'
import LoginPage from './pages/LoginPage'
import { ManuscriptsPage } from './pages/ManuscriptsPage'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <WrappedRoute exact path="/" component={FrontPage} />
      <WrappedRoute exact path="/login" component={LoginPage} />
      <WrappedRoute exact path="/manuscripts/:documentId" component={ManuscriptsPage} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)
