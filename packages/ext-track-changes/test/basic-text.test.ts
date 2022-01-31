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

import { promises as fs } from 'fs'

import { setAction, TrackChangesAction, trackCommands } from '../src'
import docs from './__fixtures__/docs'
import { SECOND_USER } from './__fixtures__/users'
import { setupEditor } from './utils/setupEditor'

let counter = 0
// https://stackoverflow.com/questions/65554910/jest-referenceerror-cannot-access-before-initialization
// eslint-disable-next-line
var uuidv4Mock: jest.Mock

jest.mock('@manuscripts/quarterback-shared', () => {
  const mockOriginal = jest.requireActual('@manuscripts/quarterback-shared')
  uuidv4Mock = jest.fn(() => `MOCK-ID-${counter++}`)
  return {
    __esModule: true,
    ...mockOriginal,
    uuidv4: uuidv4Mock,
  }
})

jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime())

describe('track changes', () => {
  afterEach(() => {
    counter = 0
    uuidv4Mock.mockClear()
  })

  test('should track basic text inserts', async () => {
    const tester = setupEditor({
      doc: docs.defaultDoc.doc,
    }).insertText('inserted text')

    // await fs.writeFile('test.json', JSON.stringify(tester.toJSON()))

    expect(tester.toJSON()).toEqual(docs.basicTextInsert)
    expect(uuidv4Mock.mock.calls.length).toBe(2)
  })

  test('should track basic text inserts and deletes', async () => {
    const tester = setupEditor({
      doc: docs.defaultDoc.doc,
    })
      .insertText('inserted text')
      .backspace(4)
      .moveCursor(5)
      .backspace(4)

    expect(tester.toJSON()).toEqual(docs.basicTextDelete)
    expect(uuidv4Mock.mock.calls.length).toBe(3)
  })

  test('should join adjacent text inserts and deletes by same user', async () => {
    // delete first user inserts
    // delete at first user deletes -> should not replace marks
    // check inserts joined, deletes still separate
    // MISSING: check timestamps merged correctly
    const tester = setupEditor({
      doc: docs.defaultDoc.doc,
    })
      .insertText('a')
      .insertText('b')
      .moveCursor('end')
      .backspace(1)
      .backspace(1)
      .insertText('c')

    expect(tester.toJSON()).toEqual(docs.basicTextJoin[0])
    expect(uuidv4Mock.mock.calls.length).toBe(8)

    tester
      .cmd(trackCommands.setUser(SECOND_USER))
      .moveCursor('start')
      .insertText('d')
      .insertText('e')
      .moveCursor(2)
      .insertText('f')
      .insertText('g')
      .moveCursor(-2)
      .backspace(2) // Delete Mike's insertions to see that Rebecca's insertions are joined
      .insertText('f')
      .moveCursor('end')
      .insertText('h')
      .moveCursor(-2)
      .backspace(1) // Overwrites Mike's deletion of 'l' TODO -> disallow? keep original deleter
      .backspace(1) // Deletes Mike's inserted 'c'
      .backspace(1) // Regular deletion of 'r'

    // await fs.writeFile('test.json', JSON.stringify(tester.toJSON()))
    expect(tester.toJSON()).toEqual(docs.basicTextJoin[1])
    expect(uuidv4Mock.mock.calls.length).toBe(20)
  })

  test('should fix inconsistent text inserts and deletes', async () => {
    const tester = setupEditor({
      doc: docs.defaultDoc.doc,
    })
      .insertText('abcd')
      .cmd((state, dispatch) => {
        const tr = state.tr
        tr.addMark(
          1,
          4,
          state.schema.marks.tracked_insert.create({
            dataTracked: {},
            pending_bg: 'yellow',
          })
        )
        setAction(tr, TrackChangesAction.skipTrack, true)
        dispatch && dispatch(tr)
        return true
      })

    // Check the insert mark was overwritten and the data is now inconsistent
    expect(tester.toJSON()).toEqual(docs.basicTextInconsistent[0])
    expect(uuidv4Mock.mock.calls.length).toBe(2)

    // TODO should join with the inconsistent inserted text?
    tester.insertText('e').backspace(1)

    // await fs.writeFile('test.json', JSON.stringify(tester.toJSON()))
    expect(tester.toJSON()).toEqual(docs.basicTextInconsistent[1])
    expect(uuidv4Mock.mock.calls.length).toBe(5)
  })
})
