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
import { CHANGE_OPERATION } from '../types/change'
import { NewDeleteAttrs, NewEmptyAttrs, NewInsertAttrs, NewUpdateAttrs } from '../types/track'

export function createNewInsertAttrs(attrs: NewEmptyAttrs): NewInsertAttrs {
  return {
    ...attrs,
    operation: CHANGE_OPERATION.insert,
  }
}

export function createNewDeleteAttrs(attrs: NewEmptyAttrs): NewDeleteAttrs {
  return {
    ...attrs,
    operation: CHANGE_OPERATION.delete,
  }
}

export function createNewUpdateAttrs(
  attrs: NewEmptyAttrs,
  oldAttrs: Record<string, any>
): NewUpdateAttrs {
  // Omit dataTracked
  const { dataTracked, ...restAttrs } = oldAttrs
  return {
    ...attrs,
    operation: CHANGE_OPERATION.set_node_attributes,
    oldAttrs: JSON.parse(JSON.stringify(restAttrs)),
  }
}
