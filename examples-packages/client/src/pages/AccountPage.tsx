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
import { observer } from 'mobx-react'
import React from 'react'
import { stores } from 'stores'
import styled from 'styled-components'

export const AccountPage = observer(() => {
  const {
    authStore: { user },
  } = stores
  return (
    <Container>
      <header>
        <h1>Account</h1>
      </header>
      <div>
        <p>
          First name: <b>{user?.firstname}</b>
        </p>
        <p>
          Last name: <b>{user?.lastname}</b>
        </p>
        <p>
          Role: <b>{user?.role}</b>
        </p>
      </div>
    </Container>
  )
})

const Container = styled.div``
