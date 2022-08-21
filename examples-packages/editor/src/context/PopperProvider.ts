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
import { createPopper } from '@popperjs/core'
import type { Instance, OptionsGeneric, Modifier } from '@popperjs/core'

export class PopperProvider {
  #openPopper?: Instance
  #el: HTMLElement

  constructor() {
    this.#el = document.createElement('div')
    this.#el.classList.add('popup')
    document.body.appendChild(this.#el)
  }

  open(
    target: HTMLElement,
    content: HTMLElement,
    opts?: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>
  ) {
    this.close()
    this.#el.appendChild(content)
    this.#el.setAttribute('data-show', '')
    this.#openPopper = createPopper(target, this.#el, opts)
  }

  update() {
    if (this.#openPopper) {
      this.#openPopper.update()
    }
  }

  close() {
    if (this.#openPopper) {
      while (this.#el.hasChildNodes()) {
        this.#el.removeChild(this.#el.firstChild as ChildNode)
      }
      this.#el.removeAttribute('data-show')
      this.#openPopper.destroy()
      this.#openPopper = undefined
    }
  }
}
