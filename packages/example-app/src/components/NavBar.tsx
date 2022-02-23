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
import { RouteComponentProps } from 'react-router'
import { NavLink } from 'react-router-dom'
import { stores } from 'stores'
import styled, { css } from 'styled-components'

interface IProps extends RouteComponentProps {
  className?: string
}

export const NavBar = observer((props: IProps) => {
  const { className } = props
  const {
    authStore: { user, logout },
  } = stores
  return (
    <Container className={className}>
      <Nav>
        <div>
          <Link to="/" exact activeClassName="current">
            Front page
          </Link>
          <Link to="/manuscripts/doc1" exact activeClassName="current">
            Manuscripts
          </Link>
          <Link to="/manuscripts-no-yjs/noyjs1" exact activeClassName="current">
            Manuscripts no Yjs
          </Link>
          <Link to="/docs" exact activeClassName="current">
            Documents
          </Link>
          {user && (
            <Link to="/account" exact activeClassName="current">
              {user.firstname}
            </Link>
          )}
        </div>
        {user ? (
          <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <Link to="/login" exact activeClassName="current">
            Login
          </Link>
        )}
      </Nav>
    </Container>
  )
})

const Container = styled.div`
  background: var(--color-primary);
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.18);
  padding: 1rem;
`
const Nav = styled.nav`
  align-items: center;
  color: #fff;
  display: flex;
  justify-content: space-between;
`
const linkStyles = css`
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: serif;
  font-size: 1rem;
  font-weight: 100;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: 0.2s hover;
  &:hover {
    text-decoration: underline;
  }
  &.current {
    font-weight: 600;
  }
`
const Link = styled(NavLink)`
  ${linkStyles}
`
const Button = styled.button`
  ${linkStyles}
  background: transparent;
  border: 0;
`
