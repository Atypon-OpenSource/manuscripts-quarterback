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
import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from 'react-router-dom'

import { DefaultLayout } from './components/Layout'

import { AccountPage } from './pages/AccountPage'
import { FrontPage } from './pages/FrontPage'
import LoginPage from './pages/LoginPage'
import { DocumentListPage } from './pages/DocumentListPage'
import { ManuscriptsPage } from './pages/ManuscriptsPage'
import { ManuscriptsNoYjsPage } from './pages/ManuscriptsNoYjsPage'

export const Routes = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <RouterRoutes>
      <Route
        path="/example/:documentId"
        element={
          <DefaultLayout>
            <FrontPage />
          </DefaultLayout>
        }
      />
      <Route
        path="/login"
        element={
          <DefaultLayout>
            <LoginPage />
          </DefaultLayout>
        }
      />
      <Route
        path="/account"
        element={
          <DefaultLayout>
            <AccountPage />
          </DefaultLayout>
        }
      />
      <Route
        path="/docs"
        element={
          <DefaultLayout>
            <DocumentListPage />
          </DefaultLayout>
        }
      />
      <Route
        path="/manuscripts/:documentId"
        element={
          <DefaultLayout>
            <ManuscriptsPage />
          </DefaultLayout>
        }
      />
      <Route
        path="/manuscripts-no-yjs/:documentId"
        element={
          <DefaultLayout>
            <ManuscriptsNoYjsPage />
          </DefaultLayout>
        }
      />
      <Route path="*" element={<Navigate replace to="/example/abc123" />} />
    </RouterRoutes>
  </BrowserRouter>
)
