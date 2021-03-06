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
import { YjsExtensionState, YjsUser } from '@manuscripts/ext-yjs'
import React, { memo } from 'react'
import styled from 'styled-components'

interface IProps {
  className?: string
  yjsState?: YjsExtensionState
}

export const UsersList = memo((props: IProps) => {
  const { className, yjsState } = props
  // TODO yjs keeps creating same users with different clientIDs as I cant reuse them
  const users = Array.from(yjsState?.usersMap.values() || []).reduce((acc, cur) => {
    if (!acc.find((u) => u.id === cur.id)) {
      acc.push(cur)
    }
    return acc
  }, [] as YjsUser[])
  return (
    <div className={className}>
      <Header>
        <h2>Your name: {yjsState?.currentUser.name}</h2>
      </Header>
      <List>
        {users.map((user: YjsUser, i: number) => (
          <ListItem key={`${user.id}`}>
            <UserCircle
              title={user.name}
              color={user.color}
              currentUser={user.id === yjsState?.currentUser.id}
            >
              {user.name.charAt(0)}
            </UserCircle>
          </ListItem>
        ))}
      </List>
    </div>
  )
})

const Header = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 0.5rem 0;
  padding: 0;
  > * {
    align-items: center;
    display: flex;
  }
  & > h2 {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
  }
`
const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  & > li + li {
    margin-left: 1rem;
  }
  &.hidden {
    display: none;
    visibility: hidden;
  }
`
const ListItem = styled.li``
const UserCircle = styled.div<{ color: string; currentUser: boolean }>`
  align-items: center;
  background: ${({ color }) => color};
  border: ${({ currentUser }) => currentUser && '2px solid #1d0a16'};
  border-radius: 50%;
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  user-select: none;
`
