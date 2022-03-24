/*!
 * © 2022 Atypon Systems LLC
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
import { schema as defaultSchema } from '@manuscripts/examples-track-schema'

import { promises as fs } from 'fs'

import { setAction, TrackChangesAction, trackCommands } from '../src'
import docs from './__fixtures__/docs'
import { SECOND_USER } from './__fixtures__/users'
import * as utils from './utils/nodeUtils'
import { setupEditor } from './utils/setupEditor'
import { Fragment, Slice } from 'prosemirror-model'

import { log } from '../src/utils/logger'

let counter = 0
// https://stackoverflow.com/questions/65554910/jest-referenceerror-cannot-access-before-initialization
// eslint-disable-next-line
var uuidv4Mock: jest.Mock

jest.mock('../src/utils/uuidv4', () => {
  const mockOriginal = jest.requireActual('../src/utils/uuidv4')
  uuidv4Mock = jest.fn(() => `MOCK-ID-${counter++}`)
  return {
    __esModule: true,
    ...mockOriginal,
    uuidv4: uuidv4Mock,
  }
})
jest.mock('../src/utils/logger')
jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime())

describe('track changes', () => {
  afterEach(() => {
    counter = 0
    jest.clearAllMocks()
  })

  test('should correctly wrap copy-pasted slice with track markup', async () => {
    const tester = setupEditor({
      doc: docs.defaultDocs[2],
    })
      .paste(new Slice(Fragment.from(defaultSchema.text('inserted')), 0, 0), 18, 18)
      .paste(new Slice(Fragment.from(defaultSchema.text('replaced')), 0, 0), 5, 14)

    expect(tester.toJSON()).toEqual(docs.variousOpenEndedSlices[0])
    expect(tester.trackState()?.changeSet.hasDuplicateIds).toEqual(false)
    expect(uuidv4Mock.mock.calls.length).toBe(3)
    expect(log.warn).toHaveBeenCalledTimes(0)
    expect(log.error).toHaveBeenCalledTimes(0)
  })

  test('should prevent replacing of blockquotes and break the slice into parts instead', async () => {
    const tester = setupEditor({
      doc: docs.defaultDocs[2],
    })
      .paste(
        new Slice(
          Fragment.from(utils.createBlockquote(defaultSchema, 'open-end blockquote')),
          0,
          2
        ),
        0,
        17
      )
      .paste(
        new Slice(
          Fragment.from(utils.createBlockquote(defaultSchema, 'open-start blockquote')),
          2,
          1
        ),
        55,
        74
      )

    expect(tester.toJSON()).toEqual(docs.variousOpenEndedSlices[1])
    expect(tester.trackState()?.changeSet.hasInconsistentData).toEqual(false)
    expect(uuidv4Mock.mock.calls.length).toBe(7)
    expect(log.warn).toHaveBeenCalledTimes(0)
    expect(log.error).toHaveBeenCalledTimes(0)
  })

  test('should track pasted slices and prevent deletion of non-inserted content', async () => {
    const tester = setupEditor({
      doc: docs.defaultDocs[2],
    })
      // Pastes a paragraph and a blockquote from the end of the 1st paragraph all the way to the start of
      // the 4th paragraph. This should delete all except the 1st paragraph node, and insert the content
      // just below the 3rd paragraph.
      .paste(
        new Slice(
          Fragment.from([
            utils.createParagraph(defaultSchema, 'inserted paragraph'),
            utils.createBlockquote(defaultSchema, 'inserted blockquote'),
          ]),
          1,
          1
        ),
        14,
        50
      )
      // This pastes a blockquote that is completely open on both sides, meaning that it is basically a text insert.
      // It should delete part of the 1st paragraph's text and not do anything to 2nd paragraph since it's already
      // deleted.
      .paste(
        new Slice(
          Fragment.from([utils.createBlockquote(defaultSchema, 'pasted open blockquote')]),
          2,
          2
        ),
        11,
        31
      )
      // Pastes blockquote inside the 'inserted paragraph' to the end of 'inserted blockquote' text content:
      // |<p 49><t 50>inserted paragraph</t 68></p 69><bq 69><p 70><t 71>inserted blockquote</t 90>|</p 91><bq 92>
      // What it kinda awkwardly does, is deletes the 'inserted paragraph' text as well as the blockquote.
      // However, since 'inserted paragraph' paragraph itself was deleted by the first paste, it's not modified
      // except for its id which is regenerated. 4th paragraph remains unchanged.
      .paste(
        new Slice(
          Fragment.from(utils.createBlockquote(defaultSchema, '2nd inserted blockquote')),
          0,
          2
        ),
        71,
        112
      )

    // await fs.writeFile('test.json', JSON.stringify(tester.toJSON()))

    expect(tester.toJSON()).toEqual(docs.variousOpenEndedSlices[2])
    expect(tester.trackState()?.changeSet.hasInconsistentData).toEqual(false)
    expect(uuidv4Mock.mock.calls.length).toBe(20)
    expect(log.warn).toHaveBeenCalledTimes(0)
    expect(log.error).toHaveBeenCalledTimes(0)
  })

  test.skip('todo bugs', async () => {
    const tester = setupEditor({
      doc: docs.defaultDocs[2],
    })
      // Should delete 2nd and 3rd paragraph and replace the inner blockquote with this
      .paste(
        new Slice(
          Fragment.from(utils.createBlockquote(defaultSchema, 'delete inside blockquote')),
          1,
          1
        ),
        16,
        50
      )

    await fs.writeFile('test.json', JSON.stringify(tester.toJSON()))

    // expect(tester.toJSON()).toEqual(docs.variousOpenEndedSlices[2])
    expect(tester.trackState()?.changeSet.hasInconsistentData).toEqual(false)
    expect(uuidv4Mock.mock.calls.length).toBe(7)
    expect(log.warn).toHaveBeenCalledTimes(0)
    expect(log.error).toHaveBeenCalledTimes(0)
  })
})
