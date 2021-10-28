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

import { Editor } from '../components/editor/Editor'

export function FrontPage() {
  return (
    <Container>
      <header>
        <h1>
          <a href="https://teemukoivisto.github.io/prosemirror-track-and-collab/">
            Track changes with collab
          </a>
        </h1>
        <p>Using marks and attributes, similar to Fiduswriter</p>
        {/* <p><a href="https://github.com/TeemuKoivisto/prosemirror-track-and-collab">Github repo</a></p> */}
      </header>
      <Editor />
    </Container>
  )
}

const Container = styled.div``
