/*!
 * © 2019 Atypon Systems LLC
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
import { NodeSpec } from 'prosemirror-model'
import { bulletList, listItem, orderedList } from 'prosemirror-schema-list'

function add(obj: Record<string, any>, props: Record<string, any>) {
  const copy: Record<string, any> = {}
  for (const prop in obj) {
    copy[prop] = obj[prop]
  }
  for (const prop in props) {
    copy[prop] = props[prop]
  }
  return copy
}

export const ordered_list: NodeSpec = add(orderedList, {
  content: 'list_item+',
  group: 'block',
  attrs: { dataTracked: { default: null } },
})

export const bullet_list: NodeSpec = add(bulletList, {
  content: 'list_item+',
  group: 'block',
  attrs: { dataTracked: { default: null } },
})

export const list_item: NodeSpec = add(listItem, {
  content: 'paragraph block*',
  attrs: { dataTracked: { default: null } },
})
