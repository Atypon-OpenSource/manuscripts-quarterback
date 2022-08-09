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

import DOMpurify from 'dompurify'

export class EquationView extends BaseNodeView {
  override init = () => {
    this._dom = document.createElement('div')
    this._dom.classList.add('equation')
    this._dom.setAttribute('id', this.node.attrs.id)
    this.updateContents()
    return this
  }

  override updateContents = () => {
    const { SVGStringRepresentation } = this.node.attrs

    while (this.dom.hasChildNodes()) {
      this.dom.removeChild(this.dom.firstChild as ChildNode)
    }

    if (SVGStringRepresentation) {
      const fragment = DOMpurify.sanitize(SVGStringRepresentation, {
        USE_PROFILES: { svg: true },
      })
      this.dom.append(fragment)
    } else {
      const placeholder = document.createElement('div')
      placeholder.className = 'equation-placeholder'
      placeholder.textContent = '<Equation>'
      this.dom.appendChild(placeholder)
    }
  }

  ignoreMutation = () => true
}
