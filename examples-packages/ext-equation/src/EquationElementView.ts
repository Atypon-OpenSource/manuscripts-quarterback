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
import { BaseNodeView } from '@manuscripts/examples-track-editor'

export class EquationElementView extends BaseNodeView {
  override init = () => {
    this._dom = document.createElement('figure')
    this.updateContents()
    return this
  }

  override updateContents = () => {
    const { suppressCaption, suppressTitle } = this.node.attrs
    this.dom.classList.toggle('suppress-caption', suppressCaption)
    this.dom.classList.toggle('suppress-title', suppressTitle === undefined ? true : suppressTitle)
  }
}
