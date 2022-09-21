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
import React from 'react'
import { useNavigate } from 'react-router'
import { stores } from 'stores'
import styled from 'styled-components'

import { LoginForm } from '../components/login-page/LoginForm'

function LoginPage() {
  const navigateTo = useNavigate()
  const {
    authStore: { login },
  } = stores

  async function handleSubmit(data: any) {
    const success = await login!(data)
    if (success) {
      navigateTo('/')
    }
  }
  return (
    <Container>
      <Body>
        <h1>Login</h1>
        <div>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </Body>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`
const Body = styled.div`
  margin-top: 6rem;
  & > h1 {
    margin: 0;
  }
`

export default LoginPage
