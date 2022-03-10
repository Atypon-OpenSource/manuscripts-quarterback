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
import { Route, RouteComponentProps, RouteProps } from 'react-router'
import styled from 'styled-components'

import { NavBar } from './NavBar'

type ReactComponent = React.ComponentClass<any> | React.StatelessComponent<any>

interface IWrappedRoute extends RouteProps {
  component: ReactComponent
}

const renderNoMainContainerWrapper =
  (Component: ReactComponent) => (props: RouteComponentProps<any>) =>
    (
      <MainWrapper>
        <NavBar {...props} />
        <Component {...props} />
      </MainWrapper>
    )

const renderWrapper = (Component: ReactComponent) => (props: RouteComponentProps<any>) =>
  (
    <MainWrapper>
      <NavBar {...props} />
      <MainContainer>
        <Component {...props} />
      </MainContainer>
    </MainWrapper>
  )

export const NoMainContainerRoute = ({ component, ...rest }: IWrappedRoute) => (
  <Route {...rest} render={renderNoMainContainerWrapper(component)} />
)

export const WrappedRoute = ({ component, ...rest }: IWrappedRoute) => (
  <Route {...rest} render={renderWrapper(component)} />
)

const MainWrapper = styled.div`
  min-height: 100vh;
`
const MainContainer = styled.main`
  margin: 40px auto 0 auto;
  max-width: 750px;
  padding-bottom: 20px;
  @media only screen and (max-width: 800px) {
    margin: 40px 20px 0 20px;
    padding-bottom: 20px;
  }
`
