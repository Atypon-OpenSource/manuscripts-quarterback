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
import { Input } from 'elements/Input'
import { useState } from 'react'
import { MdEmail, MdLock } from 'react-icons/md'

interface Props {
  className?: string
  onSubmit: (formValues: any) => void
}

export function LoginForm(props: Props) {
  const { className = '', onSubmit } = props

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    const values = {
      email,
      password,
    }
    onSubmit(values)
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className} flex items-center flex-col justify-center`}
    >
      <div className="mt-2">
        <label htmlFor="login-email">Email</label>
        <Input
          required
          id="login-email"
          type="email"
          name="email"
          autoComplete="on"
          placeholder={'Email'}
          value={email}
          icon={<MdEmail size={24} />}
          onChange={(val) => setEmail(val)}
        />
      </div>
      <div className="mt-2">
        <label htmlFor="login-password">Password</label>
        <Input
          required
          id="login-password"
          type="password"
          name="password"
          autoComplete="on"
          placeholder="********"
          value={password}
          icon={<MdLock size={24} />}
          onChange={(val) => setPassword(val)}
        />
      </div>
      <button
        className="w-full px-4 py-2 mt-5 leading-tight text-white bg-red-500 rounded"
        type="submit"
      >
        Submit
      </button>
      <button className="px-4 py-2 mt-5 leading-tight text-center rounded hover:underline">
        Sign up
      </button>
    </form>
  )
}
