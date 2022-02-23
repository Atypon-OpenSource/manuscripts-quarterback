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
  IListDocumentsResponse,
  IGetDocumentResponse,
  IOpenDocumentResponse,
  ICreateDocRequest,
  ISaveDocResponse,
} from '@manuscripts/quarterback-shared'

import { get, post } from './methods'

export const listDocuments = () => get<IListDocumentsResponse>('docs', 'Listing documents failed')

export const getDocument = (id: string) =>
  get<IGetDocumentResponse>(`doc/${id}`, 'Fetching document failed')

export const openDocument = (documentId: string) =>
  get<IOpenDocumentResponse>(`doc/${documentId}/open`, 'Opening document failed', {
    Accept: 'application/octet-stream',
  })

export const createDocument = (payload: ICreateDocRequest) =>
  post<ISaveDocResponse>('doc', payload, 'Creating document failed')
