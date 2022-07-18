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
import type { CreateExtension, EditorProviders } from '@manuscripts/examples-track-editor'

import { equation } from './equation'
import { equationElement } from './equation_element'
import { EquationView } from './EquationView'
import { EquationElementView } from './EquationElementView'

import { equationExtensionName, ExtensionProps } from './types'

export const equationExtension = (_props: ExtensionProps) => (_ctx: EditorProviders) => {
  return {
    name: equationExtensionName,
    nodes: {
      equation,
      equation_element: equationElement,
    },
    nodeViews: {
      equation: EquationView,
      equation_element: EquationElementView,
    },
  }
}

function typeCheck(): CreateExtension {
  return equationExtension
}
