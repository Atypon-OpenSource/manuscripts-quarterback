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
import {
  trackCommands,
  useEditorContext,
  useYjsExtension,
} from '@manuscripts/quarterback-editor'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  className?: string
}

export function SelectUser(props: IProps) {
  const { className } = props
  const { viewProvider } = useEditorContext()
  const [yjsState, yjsStore] = useYjsExtension()

  function handleSelectUser() {
    const user = yjsStore?.generateGuestUser()
    yjsStore?.updateYjsUser()
    viewProvider?.execCommand(trackCommands.setUser(user))
  }

  return (
    <Container className={className}>
      <div className="current-user">
        Current user: {yjsState?.currentUser.id.slice(0, 5)}
      </div>
      <div>
        <Button onClick={handleSelectUser}>New user</Button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  .current-user {
    margin: 0.25rem 1rem 0.25rem 0;
  }
`
const Button = styled.button`
  cursor: pointer;
  & + & {
    margin-left: 0.5rem;
  }
`
