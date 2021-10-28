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
import { ILoginParams } from '@manuscripts/quarterback-shared'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { useHistory } from 'react-router'

import { LoginForm } from '../components/login-page/LoginForm'
import { Stores } from '../stores/Stores'

interface Props {
  login?: (data: ILoginParams) => Promise<boolean>
}

const LoginPage = inject((stores: Stores) => ({
  login: stores.authStore?.login,
}))(
  observer((props: Props) => {
    const { login } = props
    const history = useHistory()

    async function handleSubmit(data: any) {
      const success = await login!(data)
      if (success) {
        history.push('/')
      }
    }
    return (
      <div className="absolute inset-0 flex items-center main-bg">
        <section
          className={`p-16 mx-auto inline-block bg-white text-container border
        rounded-2xl`}
        >
          <h1 className="mb-8 text-5xl font-bold cursive">login</h1>
          <div>
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </section>
      </div>
    )
  })
)

export default LoginPage
