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
import { NodeSelection } from 'prosemirror-state'
import { EditorView, lineNumbers, placeholder, ViewUpdate } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import katex from 'katex'

import 'katex/dist/katex.min.css'

export class EquationView extends BaseNodeView {
  codemirror?: EditorView

  override init = () => {
    this._dom = document.createElement('div')
    this._dom.classList.add('equation')
    this._dom.setAttribute('id', this.node.attrs.id)
    this.updateContents()
    return this
  }

  override updateContents = () => {
    const { TeXRepresentation } = this.node.attrs

    while (this.dom.hasChildNodes()) {
      this.dom.removeChild(this.dom.firstChild as ChildNode)
    }

    if (TeXRepresentation) {
      katex.render(TeXRepresentation, this.dom, {
        throwOnError: false,
      })
    } else {
      const placeholder = document.createElement('div')
      placeholder.className = 'equation-placeholder'
      placeholder.textContent = '<Equation>'
      this.dom.appendChild(placeholder)
    }
  }

  handleCodeMirrorChange = (v: ViewUpdate) => {
    if (!v.docChanged) {
      return
    }
    const TeXRepresentation = v.view.state.doc.toJSON().join('\n')
    const { tr } = this.view.state
    const pos = this.getPos()

    tr.setNodeMarkup(pos, undefined, {
      ...this.node.attrs,
      TeXRepresentation,
    }).setSelection(NodeSelection.create(tr.doc, pos))
    this.view.dispatch(tr)
  }

  selectNode = () => {
    if (!this.codemirror) {
      this.codemirror = new EditorView({
        state: EditorState.create({
          doc: this.node.attrs.TeXRepresentation,
          extensions: [
            placeholder('Enter LaTeX equation, e.g. "a^2 = \\sqrt{b^2 + c^2}"'),
            lineNumbers(),
            EditorView.lineWrapping,
            EditorView.updateListener.of(this.handleCodeMirrorChange),
          ],
        }),
      })
      const wrapper = document.createElement('div')
      wrapper.appendChild(this.codemirror.dom)
      wrapper.className = 'equation-editor'

      const infoLink = document.createElement('a')
      infoLink.target = '_blank'
      infoLink.textContent = '?'
      infoLink.title = ''
      infoLink.href = 'https://en.wikibooks.org/wiki/LaTeX/Mathematics#Symbols'
      infoLink.className = 'equation-editor-info'

      wrapper.appendChild(infoLink)

      this.ctx.popperProvider.open(this.dom, wrapper, {
        placement: 'bottom',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      })

      window.requestAnimationFrame(() => {
        this.codemirror?.focus()
      })
    } else {
    }
    this.dom.classList.add('ProseMirror-selectednode')
  }

  deselectNode = () => {
    this.dom.classList.remove('ProseMirror-selectednode')
    this.ctx.popperProvider.close()
    this.codemirror?.destroy()
    this.codemirror = undefined
  }

  destroy = () => {
    this.ctx.popperProvider.close()
    this.codemirror?.destroy()
    this.codemirror = undefined
  }

  ignoreMutation = () => true
}
