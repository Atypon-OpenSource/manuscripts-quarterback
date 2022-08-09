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
import { DOMSerializer, Node as PMNode } from 'prosemirror-model'
import { Decoration, DecorationSource, EditorView, NodeView } from 'prosemirror-view'

import type { EditorContext } from './context'

export class BaseNodeView<P extends any = {}> implements NodeView {
  protected _dom?: HTMLElement
  contentDOM?: HTMLElement

  node: PMNode
  ctx: EditorContext
  props?: P
  component?: React.ComponentType<any>

  constructor(
    node: PMNode,
    readonly view: EditorView,
    readonly getPos: () => number,
    _decorations: readonly Decoration[],
    _innerDecorations: DecorationSource,
    ctx: EditorContext,
    readonly _props?: P,
    component?: React.ComponentType<any>
  ) {
    this.node = node
    this.ctx = ctx
    this.props = _props
    this.component = component
  }

  get dom() {
    if (!this._dom) {
      throw Error('Accessing uninitialized dom inside BaseNodeView! Check your "init" method')
    }
    return this._dom
  }

  /**
   * Override this
   */
  init = (): this => {
    const toDOM = this.node.type.spec.toDOM
    if (toDOM) {
      const { dom, contentDOM } = DOMSerializer.renderSpec(document, toDOM(this.node))
      this._dom = dom as HTMLElement
      this.contentDOM = contentDOM
    }
    return this
  }
  /**
   * Override this
   */
  updateContents = (): void => {}

  update = (
    newNode: PMNode,
    _decorations: readonly Decoration[],
    _innerDecorations: DecorationSource
  ): boolean => {
    // if (!newNode.sameMarkup(this.node)) return false
    if (newNode.attrs.id !== this.node.attrs.id) {
      return false
    }
    if (newNode.type.name !== this.node.type.name) {
      return false
    }
    this.node = newNode
    this.updateContents()
    // this.props.popper.update()
    return true
  }

  setDomAttrs(node: PMNode, element: HTMLElement, omit: string[] = []) {
    Object.keys(node.attrs || {}).forEach((attr) => {
      if (!omit.includes(attr)) {
        element.setAttribute(attr, node.attrs[attr])
      }
    })
  }

  selectNode = () => {
    this.dom.classList.add('ProseMirror-selectednode')
  }

  deselectNode = () => {
    this.dom.classList.remove('ProseMirror-selectednode')
    // this.props.popper.destroy()
  }

  destroy = () => {
    // this.props.popper.destroy()
  }

  static fromComponent<P>(ctx: EditorContext, props?: P, component?: React.ComponentType<any>) {
    return (
      node: PMNode,
      view: EditorView,
      getPos: () => number,
      decorations: readonly Decoration[],
      innerDecorations: DecorationSource
    ) =>
      new BaseNodeView(
        node,
        view,
        getPos,
        decorations,
        innerDecorations,
        ctx,
        props,
        component
      ).init()
  }
}
