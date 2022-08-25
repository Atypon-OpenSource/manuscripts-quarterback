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
export declare type Subscriber<T> = (value: T) => void
/** Unsubscribes from value updates. */
export declare type Unsubscriber = () => void
/** Callback to update a value. */
export declare type Updater<T> = (value: T) => T
/** Cleanup logic callback. */
declare type Invalidator<T> = (value?: T) => void
/** Start and stop notification callbacks. */
export declare type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void
export interface Readable<T> {
  /**
   * Subscribe on value changes.
   * @param run subscription callback
   * @param invalidate cleanup callback
   */
  subscribe(this: void, run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber
}
export interface Writable<T> extends Readable<T> {
  /**
   * Set value and inform subscribers.
   * @param value to set
   */
  set(this: void, value: T): void
  /**
   * Update value using callback and inform subscribers.
   * @param updater callback
   */
  update(this: void, updater: Updater<T>): void
}

export function writable<T>(value?: T, start?: StartStopNotifier<T>): Writable<T> {
  let _observers = new Set<(...args: any[]) => void>()

  return {
    set(value: T) {
      Array.from(_observers.values()).forEach((cb) => cb(value))
    },
    update(updater: (value: T) => T) {
      Array.from(_observers.values()).forEach((cb) => cb(value))
    },
    on(cb: (...args: any[]) => void) {
      _observers.add(cb)
      return () => {
        _observers.delete(cb)
      }
    },
    off(cb: (...args: any[]) => void) {
      _observers.delete(cb)
    },
    destroy() {
      _observers = new Set()
    },
  }
}
