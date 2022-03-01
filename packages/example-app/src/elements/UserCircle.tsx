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
import styled from 'styled-components'

export const UserCircle = styled.div<{ color: string; currentUser?: boolean }>`
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
