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
import type { Event } from '@manuscripts/examples-track-types'
import type { Decoder } from 'lib0/decoding'
import { createDecoder, readVarUint, readVarUint8Array } from 'lib0/decoding'
import {
  createEncoder,
  Encoder,
  length as getEncoderLength,
  toUint8Array,
  writeVarUint,
  writeVarUint8Array,
} from 'lib0/encoding'
import type { Awareness } from 'y-protocols/awareness'
import { applyAwarenessUpdate, encodeAwarenessUpdate } from 'y-protocols/awareness'
import {
  readSyncMessage as yjsReadSyncMessage,
  readSyncStep1,
  readSyncStep2,
  readUpdate,
  writeSyncStep1 as yjsWriteSyncStep1,
  writeUpdate,
} from 'y-protocols/sync'
import type * as Y from 'yjs'

import { log } from '$common/logger'

import { Document } from './Document'
import { Connection, SyncMessageType, YjsMessageType } from './types'

/**
 * Explained to some extent https://discuss.yjs.dev/t/read-only-or-one-way-only-sync/135/4
 * [0, 0] is a SyncStep1. It is request to receive the missing state (it contains a state-vector that the server uses to compute the missing updates)
 * [0, 1] is SyncStep2, which is the reply to a SyncStep1. It contains the missing updates.
 * [0, 2] is a regular document update message.
 * [1, x] Awareness message. This information is only used to represent shared cursors and the name of each user.
 */

export function readMessageYjs(
  data: ArrayBuffer,
  doc: Document,
  conn: Connection
): Event<ArrayBuffer | undefined> {
  const encoder = createEncoder()
  const decoder = createDecoder(data instanceof Uint8Array ? data : new Uint8Array(data))
  const messageType = readVarUint(decoder)
  switch (messageType) {
    case YjsMessageType.sync:
      log.debug('Read sync message')
      // writeVarUint(encoder, YjsMessageType.sync)
      const read = readSyncMessage(encoder, decoder, doc.yDoc, conn)
      if (!read.ok) {
        return read
      } else if (read.data?.byteLength === 0) {
        return { ok: false, error: 'Applied zero sized update', status: 400 }
      }
      return read
    case YjsMessageType.awareness:
      log.debug('Read awareness message')
      applyAwarenessUpdate(doc.awareness, readVarUint8Array(decoder), conn)
      break
    default:
      return {
        ok: false,
        error: `Unknown yjs message type: ${messageType}`,
        status: 500,
      }
  }
  return { ok: true, data: undefined }
}

export function readSyncMessage(
  encoder: Encoder,
  decoder: Decoder,
  yDoc: Y.Doc,
  conn: Connection
): Event<ArrayBuffer | undefined> {
  writeVarUint(encoder, YjsMessageType.sync)
  const messageType = readVarUint(decoder)
  switch (messageType) {
    case SyncMessageType.sync_step_1:
      log.debug('Read sync step 1')
      readSyncStep1(decoder, encoder, yDoc)
      // writeVarUint(encoder, SyncMessageType.sync_step_1)
      return { ok: true, data: toUint8Array(encoder) }
    case SyncMessageType.sync_step_2:
      log.debug('Read sync step 2')
      // TODO clientID == origin/connection?
      readSyncStep2(decoder, yDoc, conn)
      break
    case SyncMessageType.yjs_update:
      log.debug('Read sync update')
      readUpdate(decoder, yDoc, conn)
      break
    default:
      return {
        ok: false,
        error: `Unknown sync message type: ${messageType}`,
        status: 500,
      }
  }
  return { ok: true, data: undefined }
}

// Connection.sendFirstSyncStep
export function writeSyncStep1(yDoc: Y.Doc) {
  const encoder = createEncoder()
  writeVarUint(encoder, YjsMessageType.sync)
  yjsWriteSyncStep1(encoder, yDoc)
  return toUint8Array(encoder)
}

export function writeSyncUpdate(update: Uint8Array) {
  const encoder = createEncoder()
  writeVarUint(encoder, YjsMessageType.sync)
  writeUpdate(encoder, update)
  return toUint8Array(encoder)
}

// Connection.sendCurrentAwareness ->
// OutgoingMessage.createAwarenessUpdateMessage(this.document.awareness)
export function writeAwarenessUpdate(awareness: Awareness, changedClientIDs: number[]) {
  const encoder = createEncoder()
  const message = encodeAwarenessUpdate(awareness, changedClientIDs)
  writeVarUint(encoder, YjsMessageType.awareness)
  writeVarUint8Array(encoder, message)
  return toUint8Array(encoder)
}
