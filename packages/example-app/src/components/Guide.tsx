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
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
}

const STORAGE_KEY = 'guide'

export function Guide(props: Props) {
  const { className = '' } = props
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      let persisted
      try {
        persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) || '')
      } catch (err) {
        console.error(err)
      }
      if (persisted) {
        return persisted
      }
    }
    return false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visible))
    }
  }, [visible])
  return (
    <Wrapper className={className}>
      <Container visible={visible}>
        <p>
          This editor implements track changes and Yjs-based collaboration. All changes to the
          document are persisted to Redis and they should, once implemented, be saved as regular
          ProseMirror or Manuscript JSON doc to Postgres after a certain cache duration has passed.
        </p>
        <p>
          Changes are tracked by intercepting transactions and adding insert/delete marks to text or
          adding attributes to nodes which contain the change data currently categorized as
          inserts/deletes/updates. This encompasses changes caused by{' '}
          <a
            href="https://prosemirror.net/docs/ref/#transform.ReplaceStep"
            target="_blank"
            rel="noreferrer"
          >
            ReplaceSteps
          </a>{' '}
          but not ReplaceAroundSteps as they need additional work to implement. Formatting changes
          are not tracked at the moment.
        </p>
        <p>
          Tracking simple text changes with this method is relatively straightforward. Of course
          handling the copy/pasting of content + ReplaceAroundSteps is a lot of work given the
          various edge-cases. What adds even more complexity are context-dependent changes. For
          example, inserting a table contains multiple nodes that are created in the same
          transaction but which all depend on the <code>table_element</code> being accepted. If it's
          rejected, all the changes within the <code>table_element</code> should be as well deleted.
          In some cases, however, such as deleting paragraphs the contents should be merged into the
          previous paragraph which again needs to be handled separately.
        </p>
        <p>
          As of now, only deletions of basic nodes (only paragraphs at the moment) merge content.
          Deleting all the other, more complex nodes (tables, figures etc), will always delete
          everything within them unless somehow prevented.
        </p>
      </Container>
      <div>
        <button onClick={() => setVisible((val) => !val)}>{visible ? 'Hide' : 'Show'}</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`
const Container = styled.div<{ visible?: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`
