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

import docs from './__fixtures__/docs'
import { insertText } from './utils/commands'
import { setupEditor } from './utils/setupEditor'
// import { promises as fs } from 'fs'

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
  test('should track basic text inserts', async () => {
    const tester = setupEditor({
      doc: docs.defaultDoc.doc,
    }).cmd(insertText('inserted text'))

    // await fs.writeFile('test.json', JSON.stringify(tester.toJSON()))

    expect(tester.toJSON()).toEqual(docs.basicInsert)
    expect(uuidv4Mock.mock.calls.length).toBe(2)
  })

  test('should track basic text inserts and deletes', async () => {
    counter = 0
    uuidv4Mock.mockClear()

    const tester = setupEditor({
      doc: docs.defaultDoc.doc,
    })
      .cmd(insertText('inserted text'))
      .backspace(4)
      .moveCursor(5)
      .backspace(4)

    expect(tester.toJSON()).toEqual(docs.basicDelete)
    expect(uuidv4Mock.mock.calls.length).toBe(3)
  })
})
