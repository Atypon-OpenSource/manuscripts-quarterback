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
/**
 * So these shenanigans are due to manuscripts-transform using window and other
 * browser-specific globals without any polyfills. Hence we need to declare them
 * before loading the module. ESM module resolution normally starts bottom-up
 * (meaning the entry point will always be evaluated last) so any attempts to declare
 * globals there will fail.
 *
 * Using dynamic imports we can prevent that and set the globals without having
 * to worry how the subsequent imports order up. Everything here will always be
 * evaluated first.
 */
import { JSDOM } from 'jsdom'

const { window } = new JSDOM()

global.window = window
global.document = window.document
global.DOMParser = window.DOMParser
global.Element = window.Element
global.Node = window.Node
global.XMLSerializer = window.XMLSerializer
global.XPathResult = window.XPathResult

// Has to be dynamic import
import('./dist/index.js')
