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
import React, { useEffect } from 'react'
import { stores } from 'stores'
import styled from 'styled-components'

import { DocumentForm } from 'components/document-list-page/DocumentForm'
import { DocumentList } from 'components/document-list-page/DocumentList'

export function DocumentListPage() {
  const { documentStore } = stores

  useEffect(async () => {
    await documentStore.listDocuments()
  }, [])

  function handleSubmit({ name }: { name: string }) {
    documentStore.createDocument(name)
  }

  return (
    <Container>
      <header>
        <h1>Documents in the database</h1>
      </header>
      <DocumentForm onSubmit={handleSubmit} />
      <DocumentList />
    </Container>
  )
}

const Container = styled.div`
  & > header {
    margin-bottom: 1rem;
  }
`
