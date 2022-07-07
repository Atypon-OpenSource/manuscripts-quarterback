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
  IGetSnapshotLabelsResponse,
  IGetSnapshotResponse,
  ISaveSnapshotRequest,
  ISaveSnapshotResponse,
  IUpdateSnapshotRequest,
} from '@manuscripts/examples-track-types'

import { get, post, put, del } from './methods'

export const listSnapshotLabels = (docId: string) =>
  get<IGetSnapshotLabelsResponse>(`doc/${docId}/snapshot/labels`, 'Fetching snapshots failed')

export const getSnapshot = (snapshotId: string) =>
  get<IGetSnapshotResponse>(`snapshot/${snapshotId}`, 'Fetching a snapshot failed')

export const saveSnapshot = (payload: ISaveSnapshotRequest) =>
  post<ISaveSnapshotResponse>('snapshot', payload, 'Saving snapshot failed')

export const updateSnapshot = (snapId: string, payload: IUpdateSnapshotRequest) =>
  put<boolean>(`snapshot/${snapId}`, payload, 'Updating snapshot failed')

export const deleteSnapshot = (snapId: string) =>
  del<boolean>(`snapshot/${snapId}`, 'Deleting snapshot failed')
